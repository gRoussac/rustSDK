use crate::{helpers::secret_key_from_pem, js::externs::error};
use casper_client::{cli::insert_arg as insert_simple_arg, MAX_SERIALIZED_SIZE_OF_DEPLOY};
use casper_types::{
    ContractIdentifier, Deploy as _Deploy, DeployBuilder, ExecutableDeployItem, SecretKey,
    Timestamp,
};
use chrono::{DateTime, Utc};
use gloo_utils::format::JsValueSerdeExt;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone)]
#[wasm_bindgen]
pub struct Deploy(_Deploy);

#[wasm_bindgen]
impl Deploy {
    #[wasm_bindgen(constructor)]
    pub fn new(deploy: JsValue) -> Deploy {
        let deploy: _Deploy = deploy
            .into_serde()
            .map_err(|err| error(&format!("Failed to deserialize Deploy: {:?}", err)))
            .unwrap();
        let deploy = match deploy.is_valid_size(MAX_SERIALIZED_SIZE_OF_DEPLOY) {
            Ok(()) => deploy,
            Err(err) => {
                error(&format!("Deploy has not a valid size: {:?}", err));
                deploy
            }
        };

        deploy.into()
    }

    #[wasm_bindgen(js_name = "FromJson")]
    pub fn from_json(&self, deploy: JsValue) -> Deploy {
        Self::new(deploy)
    }

    #[wasm_bindgen(js_name = "ToJson")]
    pub fn to_json(&self) -> JsValue {
        match JsValue::from_serde(&self.0) {
            Ok(json) => json,
            Err(err) => {
                error(&format!("Error serializing data to JSON: {:?}", err));
                JsValue::null()
            }
        }
    }

    #[wasm_bindgen(js_name = "validateDeploySize")]
    pub fn validate_deploy_size(&self) -> bool {
        let deploy: _Deploy = self.0.clone();
        match deploy.is_valid_size(MAX_SERIALIZED_SIZE_OF_DEPLOY) {
            Ok(()) => true,
            Err(err) => {
                error(&format!("Deploy has not a valid size: {:?}", err));
                false
            }
        }
    }

    #[wasm_bindgen(js_name = "isValid")]
    pub fn is_valid(&self) -> bool {
        let deploy: _Deploy = self.0.clone();
        match deploy.is_valid() {
            Ok(()) => true,
            Err(err) => {
                error(&format!("Deploy is not valid: {:?}", err));
                false
            }
        }
    }

    #[wasm_bindgen(js_name = "hasValidHash")]
    pub fn has_valid_hash(&self) -> bool {
        let deploy: _Deploy = self.0.clone();
        match deploy.has_valid_hash() {
            Ok(()) => true,
            Err(err) => {
                error(&format!("Deploy has not a valid hash: {:?}", err));
                false
            }
        }
    }

    #[wasm_bindgen(js_name = "isExpired")]
    pub fn expired(&self) -> bool {
        let deploy: _Deploy = self.0.clone();
        let now: DateTime<Utc> = Utc::now();

        match deploy.expired(Timestamp::from(now.timestamp() as u64)) {
            true => true,
            false => {
                error("Deploy has expired");
                false
            }
        }
    }

    #[wasm_bindgen(js_name = "sign")]
    pub fn sign(&mut self, secret_key: &str) -> Deploy {
        let mut deploy: _Deploy = self.0.clone();
        deploy.sign(&secret_key_from_pem(secret_key).unwrap());
        if let Err(err) = deploy.is_valid_size(MAX_SERIALIZED_SIZE_OF_DEPLOY) {
            error(&format!("Deploy has not a valid size: {:?}", err));
        }
        deploy.into()
    }

    #[wasm_bindgen(js_name = "addArg")]
    pub fn add_arg(&mut self, simple_arg: JsValue, secret_key: Option<String>) -> Deploy {
        let deploy = self.0.clone();
        let session = deploy.session();

        let simple_arg = simple_arg.as_string().unwrap_or_default();

        let mut new_args = session.args().clone();
        //new_args.insert_cl_value(key, cl_value);
        let _ = insert_simple_arg(&simple_arg, &mut new_args);

        let new_session = match session.contract_identifier() {
            Some(ContractIdentifier::Hash(hash)) => ExecutableDeployItem::StoredContractByHash {
                hash,
                entry_point: session.entry_point_name().to_string(),
                args: new_args,
            },
            Some(ContractIdentifier::Name(name)) => ExecutableDeployItem::StoredContractByName {
                name: name.clone(),
                entry_point: session.entry_point_name().to_string(),
                args: new_args,
            },
            None => match session {
                ExecutableDeployItem::ModuleBytes { module_bytes, .. } => {
                    ExecutableDeployItem::ModuleBytes {
                        module_bytes: module_bytes.clone(),
                        args: new_args,
                    }
                }
                ExecutableDeployItem::StoredContractByHash {
                    hash,
                    entry_point,
                    args: _,
                } => ExecutableDeployItem::StoredContractByHash {
                    hash: *hash,
                    entry_point: entry_point.clone(),
                    args: new_args,
                },
                ExecutableDeployItem::StoredContractByName {
                    name,
                    entry_point,
                    args: _,
                } => ExecutableDeployItem::StoredContractByName {
                    name: name.clone(),
                    entry_point: entry_point.clone(),
                    args: new_args,
                },
                ExecutableDeployItem::StoredVersionedContractByHash {
                    hash,
                    version,
                    entry_point,
                    args: _,
                } => ExecutableDeployItem::StoredVersionedContractByHash {
                    hash: *hash,
                    version: *version,
                    entry_point: entry_point.clone(),
                    args: new_args,
                },
                ExecutableDeployItem::StoredVersionedContractByName {
                    name,
                    version,
                    entry_point,
                    args: _,
                } => ExecutableDeployItem::StoredVersionedContractByName {
                    name: name.clone(),
                    version: *version,
                    entry_point: entry_point.clone(),
                    args: new_args,
                },
                ExecutableDeployItem::Transfer { .. } => {
                    ExecutableDeployItem::Transfer { args: new_args }
                }
            },
        };

        let mut deploy_builder = DeployBuilder::new(deploy.chain_name(), new_session)
            .with_account(deploy.account().clone())
            .with_payment(deploy.payment().clone())
            .with_ttl(deploy.ttl())
            .with_timestamp(deploy.timestamp());

        let secret_key_result = secret_key
            .clone()
            .map(|key| secret_key_from_pem(&key).unwrap())
            .unwrap_or_else(|| {
                if secret_key.is_some() {
                    error("Error loading secret key");
                }
                // Default will never be used in next if secret_key.is_some()
                SecretKey::generate_ed25519().unwrap()
            });
        if secret_key.is_some() {
            deploy_builder = deploy_builder.with_secret_key(&secret_key_result);
        }

        let deploy = deploy_builder
            .build()
            .map_err(|err| error(&format!("Failed to build deploy: {:?}", err)))
            .unwrap();

        let deploy: Deploy = deploy.into();
        let _ = deploy.validate_deploy_size();
        deploy
    }
}

impl From<Deploy> for _Deploy {
    fn from(deploy: Deploy) -> Self {
        deploy.0
    }
}

impl From<_Deploy> for Deploy {
    fn from(deploy: _Deploy) -> Self {
        Deploy(deploy)
    }
}

// TODO CLEAN UP REMOVE CONVERSION TO BIGINT
// // Unfortunately a runtime argument in session Deploy (as ExecutableDeployItem::Transfer)
// // does not serialize from u64 as JS Number so we need to stringify the value
// impl Serialize for Deploy {
//     fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
//     where
//         S: Serializer,
//     {
//         let mut obj = serializer.serialize_struct("Deploy", 6)?;
//         obj.serialize_field("hash", &self.0.hash())?;
//         obj.serialize_field("header", &self.0.header())?;
//         obj.serialize_field("payment", &self.0.payment())?;
//         obj.serialize_field("approvals", &self.0.approvals())?;
//         obj.serialize_field("is_valid", &self.0.is_valid())?;

//         let binding = self.0.session();
//         let session = match binding {
//             // ExecutableDeployItem::Transfer { args } => {
//             //     let mut args_array = RuntimeArgs::new();

//             //     for named_arg in args.named_args() {
//             //         let key = named_arg.name();
//             //         let value = named_arg.cl_value();
//             //         if key == "id" {
//             //             let id_value = value
//             //                 .clone()
//             //                 .into_t::<Option<u64>>()
//             //                 .map(|u64_value| {
//             //                     u64_value
//             //                         .map(|u64_inner| u64_inner.to_string())
//             //                         .unwrap_or_else(|| {
//             //                             "Serialize error on named arg \"id\" u64 to String"
//             //                                 .to_owned()
//             //                         })
//             //                 })
//             //                 .unwrap_or_else(|err| {
//             //                     log(&format!(
//             //                         "Error converting named arg \"id\" value to String: {:?}",
//             //                         err
//             //                     ));
//             //                     "Serialize error on named arg \"id\"".to_owned()
//             //                 });

//             //             args_array.insert(key, id_value).expect("Insertion failed");
//             //         } else {
//             //             args_array.insert_cl_value(key, value.clone());
//             //         }
//             //     }

//             //     ExecutableDeployItem::Transfer { args: args_array }
//             // }
//             _ => binding.clone(),
//         };

//         obj.serialize_field("session", &session)?;
//         obj.end()
//     }
// }
