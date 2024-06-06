use super::{
    account_hash::AccountHash,
    addressable_entity_hash::AddressableEntityHash,
    cl::bytes::Bytes,
    package_hash::PackageHash,
    public_key::PublicKey,
    transaction_params::{
        transaction_builder_params::TransactionBuilderParams,
        transaction_str_params::TransactionStrParams,
    },
    uref::URef,
};
#[cfg(target_arch = "wasm32")]
use crate::helpers::insert_js_value_arg;
use crate::{
    debug::{error, log},
    helpers::{
        get_current_timestamp, get_ttl_or_default, insert_arg, parse_timestamp, parse_ttl,
        secret_key_from_pem,
    },
    make_transaction,
    make_transfer_transaction::make_transfer_transaction,
    types::transaction_hash::TransactionHash,
};
use casper_types::{
    bytesrepr::{self, Bytes as _Bytes},
    transaction::Transaction as _Transaction,
    ApprovalsHash, AsymmetricType, Deploy, InitiatorAddr, PricingMode, RuntimeArgs, SecretKey,
    TimeDiff, Timestamp, TransactionHeader, TransactionSessionKind, TransactionV1,
    TransactionV1Body, TransactionV1Builder,
};
use chrono::{DateTime, Utc};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct Transaction(_Transaction);

#[derive(Default)]
struct BuildParams {
    chain_name: Option<String>,
    timestamp: Option<Timestamp>,
    ttl: Option<TimeDiff>,
    body: Option<TransactionV1Body>,
    pricing_mode: Option<PricingMode>,
    initiator_addr: Option<InitiatorAddr>,
    secret_key: Option<String>,
}

#[wasm_bindgen]
impl Transaction {
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(constructor)]
    pub fn new(transaction: JsValue) -> Self {
        let transaction: _Transaction = transaction
            .into_serde()
            .map_err(|err| error(&format!("Failed to deserialize Transaction: {:?}", err)))
            .unwrap();
        transaction.into()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json_js_alias(&self) -> JsValue {
        match JsValue::from_serde(&self.0) {
            Ok(json) => json,
            Err(err) => {
                error(&format!("Error serializing data to JSON: {:?}", err));
                JsValue::null()
            }
        }
    }

    // static context
    #[wasm_bindgen(js_name = "newSession")]
    pub fn new_session(
        builder_params: TransactionBuilderParams,
        transaction_params: TransactionStrParams,
    ) -> Result<Transaction, String> {
        make_transaction(builder_params, transaction_params)
            .map(Into::into)
            .map_err(|err| {
                let err_msg = format!("Error creating body transaction: {}", err);
                err_msg
            })
    }

    // static context
    #[wasm_bindgen(js_name = "newTransfer")]
    pub fn new_transfer(
        maybe_source: Option<URef>,
        target_account: &str,
        amount: &str,
        maybe_id: Option<String>,
        transaction_params: TransactionStrParams,
    ) -> Result<Transaction, String> {
        make_transfer_transaction(
            maybe_source,
            target_account,
            amount,
            transaction_params,
            maybe_id,
        )
        .map(Into::into)
        .map_err(|err| format!("Error creating transfer transaction: {}", err))
    }

    #[wasm_bindgen(js_name = "withTTL")]
    pub fn with_ttl(&self, ttl: &str, secret_key: Option<String>) -> Transaction {
        let mut ttl = parse_ttl(ttl);
        if let Err(err) = &ttl {
            error(&format!("Error parsing TTL: {}", err));
            ttl = parse_ttl(&get_ttl_or_default(None));
        }
        self.build(BuildParams {
            secret_key,
            ttl: Some(ttl.unwrap()),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withTimestamp")]
    pub fn with_timestamp(&self, timestamp: &str, secret_key: Option<String>) -> Transaction {
        let mut timestamp = parse_timestamp(timestamp);
        if let Err(err) = &timestamp {
            error(&format!("Error parsing Timestamp: {}", err));
            timestamp = parse_timestamp(&get_current_timestamp(None));
        }
        self.build(BuildParams {
            secret_key,
            timestamp: Some(timestamp.unwrap()),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withChainName")]
    pub fn with_chain_name(&self, chain_name: &str, secret_key: Option<String>) -> Transaction {
        self.build(BuildParams {
            secret_key,
            chain_name: Some(chain_name.to_string()),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withPublicKey")]
    pub fn with_public_key(
        &self,
        public_key: PublicKey,
        secret_key: Option<String>,
    ) -> Transaction {
        self.build(BuildParams {
            secret_key,
            initiator_addr: Some(InitiatorAddr::PublicKey(public_key.into())),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withAccountHash")]
    pub fn with_account_hash(
        &self,
        account_hash: AccountHash,
        secret_key: Option<String>,
    ) -> Transaction {
        self.build(BuildParams {
            secret_key,
            initiator_addr: Some(InitiatorAddr::AccountHash(account_hash.into())),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withEntryPoint")]
    pub fn with_entry_point(&self, entry_point: &str, secret_key: Option<String>) -> Transaction {
        let transaction = self.0.clone();
        let body = match transaction {
            _Transaction::Deploy(_deploy) => todo!("deploy with_entry_point in transaction"),
            _Transaction::V1(ref transaction_v1) => transaction_v1.body().clone(),
        };

        self.build(BuildParams {
            secret_key,
            body: Some(modify_body(
                &body,
                NewBodyParams {
                    new_entry_point: Some(entry_point.to_string()),
                    ..Default::default()
                },
            )),
            ..Default::default()
        })
    }

    // #[wasm_bindgen(js_name = "withHash")]
    // pub fn with_hash(&self, hash: ContractHash, secret_key: Option<String>) -> Transaction {
    //     let transaction = self.0.clone();
    //     let body = transaction.body();

    //     self.build(BuildParams {
    //         secret_key,
    //         body: Some(modify_body(
    //             body,
    //             NewBodyParams {
    //                 new_hash: Some(hash),
    //                 ..Default::default()
    //             },
    //         )),
    //         ..Default::default()
    //     })
    // }

    // #[wasm_bindgen(js_name = "withPackageHash")]
    // pub fn with_package_hash(
    //     &self,
    //     package_hash: ContractPackageHash,
    //     secret_key: Option<String>,
    // ) -> Transaction {
    //     let transaction = self.0.clone();
    //     let body = transaction.body();

    //     self.build(BuildParams {
    //         secret_key,
    //         body: Some(modify_body(
    //             body,
    //             NewBodyParams {
    //                 new_package_hash: Some(package_hash),
    //                 ..Default::default()
    //             },
    //         )),
    //         ..Default::default()
    //     })
    // }

    // #[wasm_bindgen(js_name = "withModuleBytes")]
    // pub fn with_module_bytes(
    //     &self,
    //     module_bytes: Bytes,
    //     secret_key: Option<String>,
    // ) -> Transaction {
    //     let transaction = self.0.clone();
    //     let body = transaction.body();

    //     self.build(BuildParams {
    //         secret_key,
    //         body: Some(modify_body(
    //             body,
    //             NewBodyParams {
    //                 new_module_bytes: Some(&module_bytes),
    //                 ..Default::default()
    //             },
    //         )),
    //         ..Default::default()
    //     })
    // }

    #[wasm_bindgen(js_name = "withSecretKey")]
    pub fn with_secret_key(&self, secret_key: Option<String>) -> Transaction {
        self.build(BuildParams {
            secret_key,
            ..Default::default()
        })
    }

    // #[wasm_bindgen(js_name = "withStandardPayment")]
    // pub fn with_standard_payment(&self, amount: &str, secret_key: Option<String>) -> Transaction {
    //     let cloned_amount = amount.to_string();
    //     let amount = U512::from_dec_str(&cloned_amount);
    //     if let Err(err) = amount {
    //         error(&format!("Error converting amount: {:?}", err));
    //         return self.0.clone().into();
    //     }
    //     self.build(BuildParams {
    //         secret_key,
    //         payment: Some(TransactionV1Body::new_standard_payment(
    //             amount.unwrap(),
    //         )),
    //         ..Default::default()
    //     })
    // }

    // // Load payment from json
    // #[cfg(target_arch = "wasm32")]
    // #[wasm_bindgen(js_name = "withPayment")]
    // pub fn with_payment(&self, payment: JsValue, secret_key: Option<String>) -> Transaction {
    //     let payment_item_result = payment.into_serde();

    //     match payment_item_result {
    //         Ok(payment_item) => self.build(BuildParams {
    //             secret_key,
    //             payment: Some(payment_item),
    //             ..Default::default()
    //         }),
    //         Err(err) => {
    //             error(&format!("Error parsing payment: {}", err));
    //             self.0.clone().into()
    //         }
    //     }
    // }

    // Load body from json
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "withBody")]
    pub fn with_body(&self, body: JsValue, secret_key: Option<String>) -> Transaction {
        let body_item_result = body.into_serde();

        match body_item_result {
            Ok(body_item) => self.build(BuildParams {
                secret_key,
                body: Some(body_item),
                ..Default::default()
            }),
            Err(err) => {
                error(&format!("Error parsing body: {}", err));
                self.0.clone().into()
            }
        }
    }

    // #[wasm_bindgen(js_name = "validateTransactionSize")]
    // pub fn validate_transaction_size(&self) -> bool {
    //     let transaction: Transaction = self.0.clone();
    //     match transaction.is_valid_size(MAX_SERIALIZED_SIZE_OF_DEPLOY) {
    //         Ok(()) => true,
    //         Err(err) => {
    //             error(&format!("Transaction has not a valid size: {:?}", err));
    //             false
    //         }
    //     }
    // }

    #[wasm_bindgen(js_name = "verify")]
    pub fn verify(&self) -> bool {
        let transaction: _Transaction = self.0.clone();
        match transaction.verify() {
            Ok(()) => true,
            Err(err) => {
                log(&format!("Warning Transaction is not valid: {:?}", err));
                false
            }
        }
    }

    #[wasm_bindgen(getter)]
    pub fn hash(&self) -> TransactionHash {
        let transaction: _Transaction = self.0.clone();
        // TODO check why fmt is giving a short version and not debug
        // dbg!(format!("{:?}", (*transaction.hash().inner()).clone()));
        let transaction_hash = transaction.hash();

        match TransactionHash::new(&transaction_hash.to_string()) {
            Ok(transaction_hash) => transaction_hash,
            Err(err) => {
                error(&format!("Transaction has not a valid hash: {:?}", err));
                TransactionHash::new("").unwrap()
            }
        }
    }

    // #[wasm_bindgen(js_name = "hasValidHash")]
    // pub fn has_valid_hash(&self) -> bool {
    //     let transaction: _Transaction = self.0.clone();
    //     match transaction.has_valid_hash() {
    //         Ok(()) => true,
    //         Err(err) => {
    //             error(&format!("Transaction has not a valid hash: {:?}", err));
    //             false
    //         }
    //     }
    // }

    #[wasm_bindgen(js_name = "isExpired")]
    pub fn expired(&self) -> bool {
        let transaction: _Transaction = self.0.clone();
        let now: DateTime<Utc> = Utc::now();
        let now_millis = now.timestamp_millis() as u64;
        let timestamp = Timestamp::from(now_millis);
        match transaction.expired(timestamp) {
            false => false,
            true => {
                error("Transaction has expired");
                true
            }
        }
    }

    #[wasm_bindgen(js_name = "sign")]
    pub fn sign(&mut self, secret_key: &str) -> Transaction {
        let mut transaction: _Transaction = self.0.clone();
        let secret_key_from_pem = secret_key_from_pem(secret_key);
        if let Err(err) = secret_key_from_pem {
            error(&format!("Error loading secret key: {:?}", err));
            return transaction.into();
        }
        transaction.sign(&secret_key_from_pem.unwrap());
        if let Err(err) = transaction.verify() {
            error(&format!("Transaction has not a valid: {:?}", err));
        }
        transaction.into()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "approvalsHash")]
    pub fn compute_approvals_hash_js_alias(&self) -> JsValue {
        match JsValue::from_serde(&self.compute_approvals_hash()) {
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

    #[wasm_bindgen(js_name = "isNative")]
    pub fn is_native(&self) -> bool {
        self.0.clone().is_native()
    }

    #[wasm_bindgen(js_name = "isStandardPayment")]
    pub fn is_standard_payment(&self) -> bool {
        self.0.clone().is_standard_payment()
    }

    // #[wasm_bindgen(js_name = "isStoredContract")]
    // pub fn is_stored_contract(&self) -> bool {
    //     self.0.clone().body().is_stored_contract()
    // }

    // #[wasm_bindgen(js_name = "isStoredContractPackage")]
    // pub fn is_stored_contract_package(&self) -> bool {
    //     self.0.clone().body().is_stored_contract_package()
    // }

    // #[wasm_bindgen(js_name = "isModuleBytes")]
    // pub fn is_module_bytes(&self) -> bool {
    //     self.0.clone().body().is_module_bytes()
    // }

    // #[wasm_bindgen(js_name = "isByName")]
    // pub fn is_by_name(&self) -> bool {
    //     self.0.clone().body().is_by_name()
    // }

    // #[wasm_bindgen(js_name = "byName")]
    // pub fn by_name(&self) -> Option<String> {
    //     self.0.clone().body().by_name()
    // }

    #[wasm_bindgen(js_name = "entryPoint")]
    pub fn entry_point(&self) -> String {
        self.0.clone().entry_point().to_string()
    }

    #[wasm_bindgen(js_name = "addSignature")]
    pub fn add_signature(&self, public_key: &str, signature: &str) -> Transaction {
        // Serialize the existing approvals to JSON
        let casper_transaction: _Transaction = self.0.clone();
        let existing_approvals_json = casper_transaction
            .approvals()
            .iter()
            .map(|approval| {
                json!({
                    "signer": approval.signer().to_hex(),
                    "signature": approval.signature().to_hex(),
                })
            })
            .collect::<Vec<_>>();

        // Create JSON object for the new approval
        let new_approval_json = json!({
            "signer": public_key,
            "signature": signature,
        });

        // Append the new approval to existing approvals
        let mut all_approvals_json = existing_approvals_json;
        all_approvals_json.push(new_approval_json);

        // Convert the approvals JSON back to string
        let updated_approvals_str = serde_json::to_string(&all_approvals_json)
            .expect("Failed to serialize updated approvals JSON");

        // Replace the approvals field in the original transaction JSON string
        let mut transaction_json: Value = serde_json::from_str(&self.to_json_string().unwrap())
            .expect("Failed to deserialize transaction JSON");
        transaction_json["approvals"] = serde_json::from_str(&updated_approvals_str)
            .expect("Failed to deserialize updated approvals JSON");

        // Convert the updated transaction JSON back to a Transaction struct
        let updated_transaction: Transaction = serde_json::from_value(transaction_json)
            .expect("Failed to deserialize updated transaction JSON");

        updated_transaction
    }

    #[wasm_bindgen(js_name = "TTL")]
    pub fn ttl(&self) -> String {
        self.0.clone().ttl().to_string()
    }

    #[wasm_bindgen(js_name = "timestamp")]
    pub fn timestamp(&self) -> String {
        self.0.clone().timestamp().to_string()
    }

    #[wasm_bindgen(js_name = "chain_name")]
    pub fn chain_name(&self) -> String {
        match &self.0.header() {
            TransactionHeader::Deploy(header) => header.chain_name().to_string(),
            TransactionHeader::V1(header) => header.chain_name().to_string(),
        }
    }

    #[wasm_bindgen(js_name = "initiator_addr")]
    pub fn initiator_addr(&self) -> String {
        let initiator_addr: InitiatorAddr = self.0.clone().initiator_addr().clone();
        match initiator_addr {
            InitiatorAddr::PublicKey(public_key) => public_key.to_hex(),
            InitiatorAddr::AccountHash(hash) => hash.to_formatted_string(),
        }
    }

    #[wasm_bindgen(js_name = "account_hash")]
    pub fn account_hash(&self) -> AccountHash {
        let initiator_addr: InitiatorAddr = self.0.clone().initiator_addr().clone();
        initiator_addr.account_hash().into()
    }

    // #[wasm_bindgen(js_name = "paymentAmount")]
    // pub fn payment_amount(&self, conv_rate: u8) -> String {
    //     self.0
    //         .clone()
    //         .payment()
    //         .payment_amount(conv_rate)
    //         .unwrap()
    //         .to_string()
    // }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "session_args")]
    pub fn session_args_js_alias(&self) -> JsValue {
        match JsValue::from_serde(&self.0.clone().session_args()) {
            Ok(json) => json,
            Err(err) => {
                error(&format!(
                    "Error serializing session_args to JSON: {:?}",
                    err
                ));
                JsValue::null()
            }
        }
    }

    // #[cfg(target_arch = "wasm32")]
    // #[wasm_bindgen(js_name = "addArg")]
    // pub fn add_arg_js_alias(
    //     &mut self,
    //     js_value_arg: JsValue,
    //     secret_key: Option<String>,
    // ) -> Transaction {
    //     let transaction = self.0.clone();
    //     let mut args = transaction.body_args().clone();
    //     let new_args = insert_js_value_arg(&mut args, js_value_arg);
    //     let new_body = modify_body(
    //         body,
    //         NewBodyParams {
    //             new_args: Some(new_args),
    //             ..Default::default()
    //         },
    //     );

    //     self.build(BuildParams {
    //         secret_key,
    //         body: Some(new_body),
    //         ..Default::default()
    //     })
    // }
}

impl Transaction {
    pub fn args(&self) -> RuntimeArgs {
        self.0.clone().session_args().clone()
    }

    // pub fn add_arg(&mut self, new_value_arg: String, secret_key: Option<String>) -> Transaction {
    //     let transaction = self.0.clone();
    //     let mut args = transaction.body_args().clone();
    //     let new_args = insert_arg(&mut args, new_value_arg);
    //     let new_body = modify_body(
    //         body,
    //         NewBodyParams {
    //             new_args: Some(new_args),
    //             ..Default::default()
    //         },
    //     );

    //     self.build(BuildParams {
    //         secret_key,
    //         body: Some(new_body),
    //         ..Default::default()
    //     })
    // }

    pub fn to_json_string(&self) -> Result<String, String> {
        let result = serde_json::to_string(&self.0);
        match result {
            Ok(json) => Ok(json),
            Err(err) => {
                let err_msg = format!("Error serializing data to JSON: {:?}", err);
                error(&err_msg);
                Err(err_msg)
            }
        }
    }

    pub fn compute_approvals_hash(&self) -> Result<ApprovalsHash, bytesrepr::Error> {
        let transaction: _Transaction = self.0.clone();
        transaction.compute_approvals_hash()
    }

    fn build(&self, transaction_params: BuildParams) -> Transaction {
        let BuildParams {
            chain_name,
            ttl,
            timestamp,
            initiator_addr,
            body,
            pricing_mode,
            secret_key,
        } = transaction_params;
        let transaction: _Transaction = self.0.clone();
        let chain_name = if let Some(chain_name) = chain_name {
            chain_name
        } else {
            self.chain_name()
        };
        let ttl = if let Some(ttl) = ttl {
            ttl
        } else {
            transaction.ttl()
        };
        let timestamp = if let Some(timestamp) = timestamp {
            timestamp
        } else {
            transaction.timestamp()
        };

        let initiator_addr = if let Some(initiator_addr) = initiator_addr {
            initiator_addr
        } else {
            transaction.initiator_addr().clone()
        };

        let body = if let Some(body) = body {
            body
        } else {
            match transaction {
                _Transaction::Deploy(_deploy) => todo!("deploy body in transaction"),
                _Transaction::V1(ref transaction_v1) => transaction_v1.body().clone(),
            }
        };

        let pricing_mode = if let Some(pricing_mode) = pricing_mode {
            pricing_mode
        } else {
            match transaction {
                _Transaction::Deploy(_deploy) => todo!("deploy pricing_mode in transaction"),
                _Transaction::V1(transaction_v1) => transaction_v1.pricing_mode().clone(),
            }
        };

        let mut transaction_builder = TransactionV1Builder::new(body)
            .with_chain_name(chain_name)
            .with_pricing_mode(pricing_mode)
            .with_initiator_addr(initiator_addr)
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
            transaction_builder = transaction_builder.with_secret_key(&secret_key_result);
        }
        let transaction = transaction_builder
            .build()
            .map_err(|err| error(&format!("Failed to build transaction: {:?}", err)))
            .unwrap();

        let transaction: Transaction = transaction.into();
        // let _ = transaction.validate_transaction_size();
        transaction
    }
}

#[derive(Default)]
struct NewBodyParams<'a> {
    new_args: Option<&'a RuntimeArgs>,
    new_hash: Option<AddressableEntityHash>,
    new_package_hash: Option<PackageHash>,
    new_entry_point: Option<String>,
    new_alias: Option<String>,
    new_version: Option<u32>,
    new_module_bytes: Option<&'a Bytes>,
}

fn modify_body(
    body: &TransactionV1Body,
    NewBodyParams {
        new_args,
        new_hash,
        new_package_hash,
        new_entry_point,
        new_alias,
        new_version,
        new_module_bytes,
    }: NewBodyParams,
) -> TransactionV1Body {
    match body.target() {
        casper_types::TransactionTarget::Native => todo!(),
        casper_types::TransactionTarget::Stored { id, runtime } => todo!(),
        casper_types::TransactionTarget::Session {
            kind,
            module_bytes,
            runtime,
        } => {
            let default: _Bytes = module_bytes.clone();
            let new_bytes = new_module_bytes.unwrap();
            let new: &Bytes = new_bytes;
            let new_module_bytes: _Bytes = {
                let new_bytes: _Bytes = _Bytes::from((*new).to_vec());
                if new_bytes.len() > 0 {
                    new_bytes
                } else {
                    default
                }
            };

            let args = new_args.cloned().unwrap_or_else(|| body.args().clone());
            let transaction_kind = match body.transaction_kind() {
                0 => TransactionSessionKind::Standard,
                1 => TransactionSessionKind::Installer,
                2 => TransactionSessionKind::Upgrader,
                3 => TransactionSessionKind::Isolated,
                _ => unimplemented!("transaction_kind in transaction"),
            };

            TransactionV1Builder::new_session(transaction_kind, new_module_bytes)
                .with_runtime_args(args)
                .body
        } // TransactionV1Body::StoredContractByHash {
          //     hash,
          //     entry_point,
          //     args,
          // } => TransactionV1Body::StoredContractByHash {
          //     hash: new_hash.unwrap_or((*hash).into()).into(),
          //     entry_point: new_entry_point.unwrap_or_else(|| entry_point.clone()),
          //     args: new_args.cloned().unwrap_or_else(|| args.clone()),
          // },
          // TransactionV1Body::StoredContractByName {
          //     name,
          //     entry_point,
          //     args,
          // } => TransactionV1Body::StoredContractByName {
          //     name: new_name.unwrap_or_else(|| name.clone()),
          //     entry_point: new_entry_point.unwrap_or_else(|| entry_point.clone()),
          //     args: new_args.cloned().unwrap_or_else(|| args.clone()),
          // },
          // TransactionV1Body::StoredVersionedContractByHash {
          //     hash,
          //     version,
          //     entry_point,
          //     args,
          // } => TransactionV1Body::StoredVersionedContractByHash {
          //     hash: new_package_hash.unwrap_or((*hash).into()).into(),
          //     version: Some(new_version.unwrap_or(version.unwrap_or(1))),
          //     entry_point: new_entry_point.unwrap_or_else(|| entry_point.clone()),
          //     args: new_args.cloned().unwrap_or_else(|| args.clone()),
          // },
          // TransactionV1Body::StoredVersionedContractByName {
          //     name,
          //     version,
          //     entry_point,
          //     args,
          // } => TransactionV1Body::StoredVersionedContractByName {
          //     name: new_name.unwrap_or_else(|| name.clone()),
          //     version: Some(new_version.unwrap_or(version.unwrap_or(1))),
          //     entry_point: new_entry_point.unwrap_or_else(|| entry_point.clone()),
          //     args: new_args.cloned().unwrap_or_else(|| args.clone()),
          // },
          // TransactionV1Body::Transfer { args } => TransactionV1Body::Transfer {
          //     args: new_args.cloned().unwrap_or_else(|| args.clone()),
          // },
    }
}

impl From<Transaction> for _Transaction {
    fn from(transaction: Transaction) -> Self {
        transaction.0
    }
}

impl From<_Transaction> for Transaction {
    fn from(transaction: _Transaction) -> Self {
        Transaction(transaction)
    }
}

impl From<Deploy> for Transaction {
    fn from(deploy: Deploy) -> Self {
        _Transaction::Deploy(deploy).into()
    }
}

impl From<TransactionV1> for Transaction {
    fn from(transaction: TransactionV1) -> Self {
        _Transaction::V1(transaction).into()
    }
}
