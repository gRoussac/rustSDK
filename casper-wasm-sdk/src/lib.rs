pub mod helpers;
pub mod js;
pub mod types;

use crate::helpers::serialize_result;
use casper_client::{
    get_account, get_balance, get_block, get_deploy, get_dictionary_item, get_state_root_hash,
    query_global_state,
    rpcs::results::{
        GetAccountResult, GetBalanceResult, GetBlockResult, GetDeployResult,
        GetDictionaryItemResult, GetStateRootHashResult, QueryGlobalStateResult,
    },
    Error, JsonRpcId, SuccessResponse,
};
use casper_types::{bytesrepr::FromBytes, PublicKey};
use js::externs::{error, log};
use rand::Rng;
use types::{
    block_identifier::BlockIdentifier, deploy_hash::DeployHash,
    dictionary_item_identifier::DictionaryItemIdentifier, digest::Digest,
    global_state_identifier::GlobalStateIdentifier, key::Key, path::Path, uref::URef,
    verbosity::Verbosity,
};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct SDK {}

impl Default for SDK {
    fn default() -> Self {
        Self::new()
    }
}

#[wasm_bindgen]
impl SDK {
    pub fn new() -> Self {
        SDK {}
    }

    #[wasm_bindgen]
    pub async fn chain_get_block(
        &mut self,
        node_address: &str,
        block_identifier: BlockIdentifier,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("chain_get_block!");
        //log(&format!("block_identifier! {:?}", block_identifier));
        let result: Result<SuccessResponse<GetBlockResult>, Error> = get_block(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            Some(block_identifier.into()),
        )
        .await;
        serialize_result(result)
    }

    #[wasm_bindgen]
    pub async fn info_get_deploy(
        &mut self,
        node_address: &str,
        deploy_hash: DeployHash,
        finalized_approvals: bool,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("info_get_deploy!");
        let result: Result<SuccessResponse<GetDeployResult>, Error> = get_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            deploy_hash.into(),
            finalized_approvals,
        )
        .await;
        serialize_result(result)
    }

    #[wasm_bindgen]
    pub async fn get_state_root_hash(
        &mut self,
        node_address: &str,
        block_identifier: BlockIdentifier,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("state_root_hash!");
        let result: Result<SuccessResponse<GetStateRootHashResult>, Error> = get_state_root_hash(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            Some(block_identifier.into()),
        )
        .await;
        serialize_result(result)
    }

    #[wasm_bindgen]
    pub async fn state_get_account_info(
        &mut self,
        node_address: &str,
        account_identifier: String,
        block_identifier: BlockIdentifier,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("state_get_account_info!");
        let account_identifier_bytes: Vec<u8> = match hex::decode(account_identifier) {
            Ok(bytes) => bytes,
            Err(err) => {
                log(&format!("Error decoding account identifier: {:?}", err));
                return JsValue::null();
            }
        };
        let account_identifier = match PublicKey::from_bytes(&account_identifier_bytes) {
            Ok((public_key, remainder)) if remainder.is_empty() => public_key,
            _ => {
                error("Error converting account identifier");
                return JsValue::null();
            }
        };

        let result: Result<SuccessResponse<GetAccountResult>, Error> = get_account(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            Some(block_identifier.into()),
            account_identifier,
        )
        .await;
        serialize_result(result)
    }

    #[wasm_bindgen]
    pub async fn state_get_balance(
        &mut self,
        node_address: &str,
        state_root_hash: Digest,
        purse: URef,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("state_get_balance!");
        let result: Result<SuccessResponse<GetBalanceResult>, Error> = get_balance(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            state_root_hash.into(),
            purse.into(),
        )
        .await;
        serialize_result(result)
    }

    #[wasm_bindgen]
    pub async fn state_get_dictionary_item(
        &mut self,
        node_address: &str,
        state_root_hash: Digest,
        dictionary_item_identifier: DictionaryItemIdentifier,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("state_get_dictionary_item!".to_string());
        let result: Result<SuccessResponse<GetDictionaryItemResult>, Error> = get_dictionary_item(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            state_root_hash.into(),
            dictionary_item_identifier.into(),
        )
        .await;
        serialize_result(result)
    }

    #[wasm_bindgen]
    pub async fn query_global_state(
        &mut self,
        node_address: &str,
        global_state_identifier: GlobalStateIdentifier,
        key: Key,
        path: Path,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("query_global_state!");
        let result: Result<SuccessResponse<QueryGlobalStateResult>, Error> = query_global_state(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            global_state_identifier.into(),
            key.into(),
            path.into(),
        )
        .await;
        serialize_result(result)
    }
}
