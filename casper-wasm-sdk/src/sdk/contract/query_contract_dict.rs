#[cfg(target_arch = "wasm32")]
use crate::types::{
    deploy_params::dictionary_item_str_params::DictionaryItemStrParams,
    dictionary_item_identifier::DictionaryItemIdentifier,
};
#[cfg(target_arch = "wasm32")]
use crate::{
    debug::error,
    types::{digest::Digest, global_state_identifier::GlobalStateIdentifier},
};
use crate::{
    rpcs::get_dictionary_item::DictionaryItemInput,
    types::{digest::ToDigest, verbosity::Verbosity},
};
use crate::{types::sdk_error::SdkError, SDK};
use casper_client::{rpcs::results::GetDictionaryItemResult, SuccessResponse};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
#[cfg(target_arch = "wasm32")]
use serde::Deserialize;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[derive(Default, Debug, Deserialize, Clone)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "QueryContractDictOptions")]
pub struct QueryContractDictOptions {
    #[allow(unused)]
    node_address: String,
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
    #[allow(unused)]
    dictionary_item_params: Option<DictionaryItemStrParams>,
    #[allow(unused)]
    dictionary_item_identifier: Option<DictionaryItemIdentifier>,
    #[allow(unused)]
    verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "query_contract_dict_options")]
    pub fn query_contract_dict_state_options(&self, options: JsValue) -> QueryContractDictOptions {
        let options_result = options.into_serde::<QueryContractDictOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                QueryContractDictOptions::default()
            }
        }
    }

    #[wasm_bindgen(js_name = "query_contract_dict")]
    pub async fn query_contract_dict_js_alias(
        &mut self,
        options: QueryContractDictOptions,
    ) -> JsValue {
        let options = self.get_dictionary_item_options(JsValue::from(options));
        self.get_dictionary_item_js_alias(options).await
    }
}

impl SDK {
    pub async fn query_contract_dict(
        &mut self,
        node_address: &str,
        state_root_hash: impl ToDigest,
        dictionary_item: DictionaryItemInput,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<GetDictionaryItemResult>, SdkError> {
        // log("query_contract_dict!");
        self.get_dictionary_item(node_address, state_root_hash, dictionary_item, verbosity)
            .await
            .map_err(SdkError::from)
    }
}
