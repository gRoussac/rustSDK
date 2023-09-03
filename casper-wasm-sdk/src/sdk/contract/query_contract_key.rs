#[cfg(target_arch = "wasm32")]
use crate::{
    debug::error,
    types::{digest::Digest, key::Key, path::Path, verbosity::Verbosity},
};
use crate::{
    rpcs::query_global_state::{QueryGlobalStateParams, QueryGlobalStateResult},
    types::sdk_error::SdkError,
    SDK,
};
use casper_client::{
    rpcs::results::QueryGlobalStateResult as _QueryGlobalStateResult, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[derive(Deserialize, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "queryContractKeyOptions", getter_with_clone)]
pub struct QueryContractKeyOptions {
    pub node_address: String,
    // Not supported by get_dictionary_item
    // pub global_state_identifier_as_string: Option<String>,
    // pub global_state_identifier: Option<GlobalStateIdentifier>,
    pub state_root_hash_as_string: Option<String>,
    pub state_root_hash: Option<Digest>,
    pub maybe_block_id_as_string: Option<String>,
    #[serde(rename = "key_as_string")]
    pub contract_key_as_string: Option<String>,
    #[serde(rename = "key")]
    pub contract_key: Option<Key>,
    pub path_as_string: Option<String>,
    pub path: Option<Path>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "query_contract_key_options")]
    pub fn query_contract_key_state_options(&self, options: JsValue) -> QueryContractKeyOptions {
        let options_result = options.into_serde::<QueryContractKeyOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                QueryContractKeyOptions::default()
            }
        }
    }

    #[wasm_bindgen(js_name = "query_contract_key")]
    pub async fn query_contract_key_js_alias(
        &mut self,
        options: QueryContractKeyOptions,
    ) -> Result<QueryGlobalStateResult, JsError> {
        let js_value_options = JsValue::from_serde::<QueryContractKeyOptions>(&options);
        if let Err(err) = js_value_options {
            let err = &format!("Error serializing options:  {:?}", err);
            error(err);
            return Err(JsError::new(err));
        }
        let options = self.query_global_state_options(js_value_options.unwrap());
        self.query_global_state_js_alias(options).await
    }
}

impl SDK {
    pub async fn query_contract_key(
        &mut self,
        query_params: QueryGlobalStateParams,
    ) -> Result<SuccessResponse<_QueryGlobalStateResult>, SdkError> {
        //log("query_contract_key!");
        self.query_global_state(query_params)
            .await
            .map_err(SdkError::from)
    }
}
