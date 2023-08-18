use super::deploy_params::{
    deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
    session_str_params::SessionStrParams,
};
use crate::{
    debug::error,
    helpers::{
        get_current_timestamp, get_ttl, insert_arg, parse_timestamp, parse_ttl, secret_key_from_pem,
    },
    make_deploy, make_transfer,
};
use casper_client::MAX_SERIALIZED_SIZE_OF_DEPLOY;
use casper_types::{
    ContractIdentifier, Deploy as _Deploy, DeployBuilder, ExecutableDeployItem, PublicKey,
    RuntimeArgs, SecretKey, TimeDiff, Timestamp,
};
use chrono::{DateTime, Utc};
use gloo_utils::format::JsValueSerdeExt;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone)]
#[wasm_bindgen]
pub struct Deploy(_Deploy);

struct BuildParams {
    secret_key: Option<String>,
    chain_name: Option<String>,
    ttl: Option<TimeDiff>,
    timestamp: Option<Timestamp>,
    session: Option<ExecutableDeployItem>,
    payment: Option<ExecutableDeployItem>,
    account: Option<PublicKey>,
}

#[wasm_bindgen]
impl Deploy {
    fn build(&self, deploy_params: BuildParams) -> Deploy {
        let BuildParams {
            secret_key,
            chain_name,
            ttl,
            timestamp,
            session,
            payment,
            account,
        } = deploy_params;
        let deploy: _Deploy = self.0.clone();
        let chain_name = if let Some(chain_name) = chain_name {
            chain_name
        } else {
            deploy.chain_name().into()
        };
        let ttl = if let Some(ttl) = ttl {
            ttl
        } else {
            deploy.ttl()
        };
        let timestamp = if let Some(timestamp) = timestamp {
            timestamp
        } else {
            deploy.timestamp()
        };
        let session = if let Some(session) = session {
            session
        } else {
            deploy.session().clone()
        };
        let payment = if let Some(payment) = payment {
            payment
        } else {
            deploy.payment().clone()
        };
        let account = if let Some(account) = account {
            account
        } else {
            deploy.account().clone()
        };
        let mut deploy_builder = DeployBuilder::new(chain_name, session)
            .with_account(account)
            .with_payment(payment)
            .with_ttl(ttl)
            .with_timestamp(timestamp);

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
    ) -> Deploy {
        make_deploy(deploy_params, session_params, payment_params)
            .map(Into::into)
            .unwrap_or_else(|err| {
                error(&format!("Error creating session deploy: {}", err));
                Deploy::new(JsValue::null())
            })
    }

    // static context
    #[wasm_bindgen(js_name = "withTransfer")]
    pub fn new_transfer(
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
    ) -> Deploy {
        make_transfer(
            amount,
            target_account,
            transfer_id,
            deploy_params,
            payment_params,
        )
        .map(Into::into)
        .unwrap_or_else(|err| {
            error(&format!("Error creating transfer deploy: {}", err));
            Deploy::new(JsValue::null())
        })
    }

    #[wasm_bindgen(js_name = "withTTL")]
    pub fn with_ttl(&self, ttl: &str, secret_key: Option<String>) -> Deploy {
        let mut ttl = parse_ttl(ttl);
        if let Err(err) = &ttl {
            error(&format!("Error parsing TTL: {}", err));
            ttl = parse_ttl(&get_ttl(None));
        }
        self.build(BuildParams {
            secret_key,
            chain_name: None,
            ttl: Some(ttl.unwrap()),
            timestamp: None,
            session: None,
            payment: None,
            account: None,
        })
    }

    #[wasm_bindgen(js_name = "withTimestamp")]
    pub fn with_timestamp(&self, timestamp: &str, secret_key: Option<String>) -> Deploy {
        let mut timestamp = parse_timestamp(timestamp);
        if let Err(err) = &timestamp {
            error(&format!("Error parsing Timestamp: {}", err));
            timestamp = parse_timestamp(&get_current_timestamp(&None));
        }
        self.build(BuildParams {
            secret_key,
            chain_name: None,
            ttl: None,
            timestamp: Some(timestamp.unwrap()),
            session: None,
            payment: None,
            account: None,
        })
    }

    #[wasm_bindgen(js_name = "withChainName")]
    pub fn with_chain_name(&self, chain_name: String, secret_key: Option<String>) -> Deploy {
        self.build(BuildParams {
            secret_key,
            chain_name: Some(chain_name),
            ttl: None,
            timestamp: None,
            session: None,
            payment: None,
            account: None,
        })
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

        self.build(BuildParams {
            secret_key,
            chain_name: None,
            ttl: None,
            timestamp: None,
            session: Some(new_session),
            payment: None,
            account: None,
        })
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
