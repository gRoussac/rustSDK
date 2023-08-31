#[cfg(target_arch = "wasm32")]
use crate::types::{
    deploy_params::dictionary_item_str_params::DictionaryItemStrParams,
    dictionary_item_identifier::DictionaryItemIdentifier,
};
#[cfg(target_arch = "wasm32")]
use crate::{debug::error, types::digest::Digest};
use crate::{
    rpcs::get_dictionary_item::DictionaryItemInput,
    types::{digest::ToDigest, verbosity::Verbosity},
};
use crate::{types::sdk_error::SdkError, SDK};
use casper_client::{rpcs::results::GetDictionaryItemResult, SuccessResponse};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[derive(Default, Debug, Deserialize, Clone, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "queryContractDictOptions", getter_with_clone)]
pub struct QueryContractDictOptions {
    pub node_address: String,
    // Not supported by get_dictionary_item
    // pub global_state_identifier_as_string: Option<String>,
    // pub global_state_identifier: Option<GlobalStateIdentifier>,
    pub state_root_hash_as_string: Option<String>,
    pub state_root_hash: Option<Digest>,
    pub dictionary_item_params: Option<DictionaryItemStrParams>,
    pub dictionary_item_identifier: Option<DictionaryItemIdentifier>,
    pub verbosity: Option<Verbosity>,
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
                error(&format!(
                    "Error deserializing query_contract_dict_options: {:?}",
                    err
                ));
                QueryContractDictOptions::default()
            }
        }
    }

    #[wasm_bindgen(js_name = "query_contract_dict")]
    pub async fn query_contract_dict_js_alias(
        &mut self,
        options: QueryContractDictOptions,
    ) -> JsValue {
        let js_value_options = JsValue::from_serde::<QueryContractDictOptions>(&options);
        if let Err(err) = js_value_options {
            error(&format!("Error serializing options: {:?}", err));
            return JsValue::null();
        }
        let options = self.get_dictionary_item_options(js_value_options.unwrap());
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
