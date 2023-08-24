#[cfg(target_arch = "wasm32")]
use crate::{
    debug::{error, log},
    rpcs::query_global_state::QueryGlobalStateParams,
    types::{
        digest::Digest, global_state_identifier::GlobalStateIdentifier, key::Key, path::Path,
        sdk_error::SdkError, verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{rpcs::results::QueryGlobalStateResult, SuccessResponse};
use gloo_utils::format::JsValueSerdeExt;
use serde::Deserialize;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[derive(Deserialize, Default)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "queryContractOptions")]
pub struct QueryContractOptions {
    #[allow(unused)]
    node_address: String,
    #[allow(unused)]
    verbosity: Option<Verbosity>,
    #[allow(unused)]
    global_state_identifier_as_string: Option<String>,
    #[allow(unused)]
    global_state_identifier: Option<GlobalStateIdentifier>,
    #[allow(unused)]
    state_root_hash_as_string: Option<String>,
    #[allow(unused)]
    state_root_hash: Option<Digest>,
    #[allow(unused)]
    maybe_block_id_as_string: Option<String>,
    #[serde(rename = "key_as_string")]
    #[allow(unused)]
    contract_key_as_string: Option<String>,
    #[serde(rename = "key")]
    #[allow(unused)]
    contract_key: Option<Key>,
    #[allow(unused)]
    path_as_string: Option<String>,
    #[allow(unused)]
    path: Option<Path>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "query_contract_options")]
    pub fn query_contract_state_options(&self, options: JsValue) -> QueryContractOptions {
        let options_result = options.into_serde::<QueryContractOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                QueryContractOptions::default()
            }
        }
    }

    #[wasm_bindgen(js_name = "query_contract")]
    pub async fn query_contract_js_alias(&mut self, options: QueryContractOptions) -> JsValue {
        let options = self.query_global_state_options(JsValue::from(options));
        self.query_global_state_js_alias(options).await
    }
}

impl SDK {
    pub async fn query_contract(
        &mut self,
        query_params: QueryGlobalStateParams,
    ) -> Result<SuccessResponse<QueryGlobalStateResult>, SdkError> {
        log("query_contract!");
        self.query_global_state(query_params)
            .await
            .map_err(SdkError::from)
    }
}
