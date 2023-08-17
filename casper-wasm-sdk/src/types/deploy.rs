use crate::{
    debug::error,
    helpers::{insert_arg, secret_key_from_pem},
    sdk::deploy_utils::{make_deploy::make_deploy, make_transfer::make_transfer},
};
use casper_client::MAX_SERIALIZED_SIZE_OF_DEPLOY;
use casper_types::{
    ContractIdentifier, Deploy as _Deploy, DeployBuilder, ExecutableDeployItem, RuntimeArgs,
    SecretKey, Timestamp,
};
use chrono::{DateTime, Utc};
use gloo_utils::format::JsValueSerdeExt;
use wasm_bindgen::prelude::*;

use super::deploy_params::{
    deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
    session_str_params::SessionStrParams,
};

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

    // #[wasm_bindgen(js_name = "fromJson")] // Do not expose that for now, use new
    // fn from_json(&self, deploy: JsValue) -> Deploy {
    //     Self::new(deploy)
    // }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        match JsValue::from_serde(&self.0) {
            Ok(json) => json,
            Err(err) => {
                error(&format!("Error serializing data to JSON: {:?}", err));
                JsValue::null()
            }
        }
    }

    // static context
    #[wasm_bindgen(js_name = "withSession")]
    pub fn with_payment_and_session(
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
    ) -> Option<Deploy> {
        make_deploy(deploy_params, session_params, payment_params)
            .map(Into::into)
            .ok()
    }

    // static context
    #[wasm_bindgen(js_name = "withTransfer")]
    pub fn new_transfer(
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
    ) -> Option<Deploy> {
        make_transfer(
            amount,
            target_account,
            transfer_id,
            deploy_params,
            payment_params,
        )
        .map(Into::into)
        .ok()
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
        let secret_key_from_pem = secret_key_from_pem(secret_key);
        if let Err(err) = secret_key_from_pem {
            error(&format!("Error loading secret key: {:?}", err));
            return deploy.into();
        }
        deploy.sign(&secret_key_from_pem.unwrap());
        if let Err(err) = deploy.is_valid_size(MAX_SERIALIZED_SIZE_OF_DEPLOY) {
            error(&format!("Deploy has not a valid size: {:?}", err));
        }
        deploy.into()
    }

    #[wasm_bindgen(js_name = "footprint")]
    pub fn footprint(&self) -> JsValue {
        let deploy: _Deploy = self.0.clone();
        let footprint = match deploy.footprint() {
            Ok(footprint) => footprint,
            Err(err) => {
                error(&format!("Error getting footprint: {:?}", err));
                return JsValue::null();
            }
        };

        match JsValue::from_serde(&footprint) {
            Ok(json) => json,
            Err(err) => {
                error(&format!("Error serializing footprint to JSON: {:?}", err));
                JsValue::null()
            }
        }
    }

    #[wasm_bindgen(js_name = "approvalsHash")]
    pub fn compute_approvals_hash(&self) -> JsValue {
        let deploy: _Deploy = self.0.clone();
        let compute_approvals_hash = match deploy.compute_approvals_hash() {
            Ok(approvals_hash) => approvals_hash,
            Err(err) => {
                error(&format!("Error computing approvals hash: {:?}", err));
                return JsValue::null();
            }
        };

        match JsValue::from_serde(&compute_approvals_hash) {
            Ok(json) => json,
            Err(err) => {
                error(&format!(
                    "Error serializing compute_approvals_hash to JSON: {:?}",
                    err
                ));
                JsValue::null()
            }
        }
    }

    #[wasm_bindgen(js_name = "addArg")]
    pub fn add_arg(&mut self, js_value_arg: JsValue, secret_key: Option<String>) -> Deploy {
        let deploy = self.0.clone();
        let session = deploy.session();

        let mut args = session.args().clone();
        let new_args = insert_arg(&mut args, js_value_arg);
        let new_session = create_new_session(new_args, session);

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

fn create_new_session(
    new_args: &RuntimeArgs,
    session: &ExecutableDeployItem,
) -> ExecutableDeployItem {
    match session.contract_identifier() {
        Some(ContractIdentifier::Hash(hash)) => ExecutableDeployItem::StoredContractByHash {
            hash,
            entry_point: session.entry_point_name().to_string(),
            args: new_args.clone(),
        },
        Some(ContractIdentifier::Name(name)) => ExecutableDeployItem::StoredContractByName {
            name: name.clone(),
            entry_point: session.entry_point_name().to_string(),
            args: new_args.clone(),
        },
        None => match session {
            ExecutableDeployItem::ModuleBytes { module_bytes, .. } => {
                ExecutableDeployItem::ModuleBytes {
                    module_bytes: module_bytes.clone(),
                    args: new_args.clone(),
                }
            }
            ExecutableDeployItem::StoredContractByHash {
                hash,
                entry_point,
                args: _,
            } => ExecutableDeployItem::StoredContractByHash {
                hash: *hash,
                entry_point: entry_point.clone(),
                args: new_args.clone(),
            },
            ExecutableDeployItem::StoredContractByName {
                name,
                entry_point,
                args: _,
            } => ExecutableDeployItem::StoredContractByName {
                name: name.clone(),
                entry_point: entry_point.clone(),
                args: new_args.clone(),
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
                args: new_args.clone(),
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
                args: new_args.clone(),
            },
            ExecutableDeployItem::Transfer { .. } => ExecutableDeployItem::Transfer {
                args: new_args.clone(),
            },
        },
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
//             //                                 .clone()
//             //                         })
//             //                 })
//             //                 .unwrap_or_else(|err| {
//             //                     log(&format!(
//             //                         "Error converting named arg \"id\" value to String: {:?}",
//             //                         err
//             //                     ));
//             //                     "Serialize error on named arg \"id\"".clone()
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
