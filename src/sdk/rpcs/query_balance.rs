#[cfg(target_arch = "wasm32")]
use crate::types::digest::Digest;
use crate::types::{
    global_state_identifier::GlobalStateIdentifier, purse_identifier::PurseIdentifier,
};
use crate::{
    debug::error,
    helpers::get_verbosity_or_default,
    types::{sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
use casper_client::cli::parse_purse_identifier;
use casper_client::{
    cli::query_balance as query_balance_cli, query_balance as query_balance_lib,
    rpcs::results::QueryBalanceResult as _QueryBalanceResult, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct QueryBalanceResult(_QueryBalanceResult);

#[cfg(target_arch = "wasm32")]
impl From<QueryBalanceResult> for _QueryBalanceResult {
    fn from(result: QueryBalanceResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_QueryBalanceResult> for QueryBalanceResult {
    fn from(result: _QueryBalanceResult) -> Self {
        QueryBalanceResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl QueryBalanceResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn balance(&self) -> JsValue {
        JsValue::from_serde(&self.0.balance).unwrap()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "queryBalanceOptions", getter_with_clone)]
pub struct QueryBalanceOptions {
    pub purse_identifier_as_string: Option<String>,
    pub purse_identifier: Option<PurseIdentifier>,
    pub global_state_identifier: Option<GlobalStateIdentifier>,
    pub state_root_hash_as_string: Option<String>,
    pub state_root_hash: Option<Digest>,
    pub maybe_block_id_as_string: Option<String>,
    pub node_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "query_balance_options")]
    pub fn query_balance_options(&self, options: JsValue) -> QueryBalanceOptions {
        let options_result = options.into_serde::<QueryBalanceOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                QueryBalanceOptions::default()
            }
        }
    }

    #[wasm_bindgen(js_name = "query_balance")]
    pub async fn query_balance_js_alias(
        &self,
        options: QueryBalanceOptions,
    ) -> Result<QueryBalanceResult, JsError> {
        let QueryBalanceOptions {
            global_state_identifier,
            purse_identifier_as_string,
            purse_identifier,
            state_root_hash_as_string,
            state_root_hash,
            maybe_block_id_as_string,
            node_address,
            verbosity,
        } = options;

        let result = if let Some(hash) = state_root_hash {
            self.query_balance(
                global_state_identifier,
                purse_identifier_as_string,
                purse_identifier.into(),
                Some(hash.to_string()),
                None,
                node_address,
                verbosity,
            )
            .await
        } else if let Some(hash) = state_root_hash_as_string {
            self.query_balance(
                global_state_identifier,
                purse_identifier_as_string,
                purse_identifier.into(),
                Some(hash.to_string()),
                None,
                node_address,
                verbosity,
            )
            .await
        } else if let Some(maybe_block_id_as_string) = maybe_block_id_as_string {
            self.query_balance(
                global_state_identifier,
                purse_identifier_as_string,
                purse_identifier.into(),
                None,
                Some(maybe_block_id_as_string),
                node_address,
                verbosity,
            )
            .await
        } else {
            self.query_balance(
                global_state_identifier,
                purse_identifier_as_string,
                purse_identifier.into(),
                None,
                None,
                node_address,
                verbosity,
            )
            .await
        };
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }
}

impl SDK {
    #[allow(clippy::too_many_arguments)]
    pub async fn query_balance(
        &self,
        maybe_global_state_identifier: Option<GlobalStateIdentifier>,
        purse_identifier_as_string: Option<String>,
        purse_identifier: Option<PurseIdentifier>,
        state_root_hash: Option<String>,
        maybe_block_id: Option<String>,
        node_address: Option<String>,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<_QueryBalanceResult>, SdkError> {
        //log("query_balance!");

        let purse_identifier: PurseIdentifier = if let Some(purse_identifier) = purse_identifier {
            purse_identifier
        } else if let Some(purse_id) = purse_identifier_as_string.clone() {
            match parse_purse_identifier(&purse_id) {
                Ok(parsed) => parsed.into(),
                Err(err) => {
                    error(&err.to_string());
                    return Err(SdkError::FailedToParsePurseIdentifier);
                }
            }
        } else {
            let err = "Error: Missing purse identifier";
            error(err);
            return Err(SdkError::FailedToParsePurseIdentifier);
        };

        if let Some(maybe_global_state_identifier) = maybe_global_state_identifier {
            query_balance_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &self.get_node_address(node_address),
                get_verbosity_or_default(verbosity).into(),
                Some(maybe_global_state_identifier.into()),
                purse_identifier.into(),
            )
            .await
            .map_err(SdkError::from)
        } else if maybe_global_state_identifier.is_none() {
            query_balance_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &self.get_node_address(node_address),
                get_verbosity_or_default(verbosity).into(),
                None,
                purse_identifier.into(),
            )
            .await
            .map_err(SdkError::from)
        } else if let Some(state_root_hash) = state_root_hash {
            query_balance_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_node_address(node_address),
                get_verbosity_or_default(verbosity).into(),
                "",
                &state_root_hash,
                &purse_identifier.to_string(),
            )
            .await
            .map_err(SdkError::from)
        } else {
            query_balance_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_node_address(node_address),
                get_verbosity_or_default(verbosity).into(),
                &maybe_block_id.unwrap_or_default(),
                "",
                &purse_identifier.to_string(),
            )
            .await
            .map_err(SdkError::from)
        }
    }
}
