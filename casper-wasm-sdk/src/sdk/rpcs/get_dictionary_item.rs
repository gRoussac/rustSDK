#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
#[cfg(target_arch = "wasm32")]
use crate::{debug::error, types::digest::Digest};
use crate::{
    helpers::get_verbosity_or_default,
    types::{
        deploy_params::dictionary_item_str_params::{
            dictionary_item_str_params_to_casper_client, DictionaryItemStrParams,
        },
        dictionary_item_identifier::DictionaryItemIdentifier,
        digest::ToDigest,
        sdk_error::SdkError,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    cli::get_dictionary_item as get_dictionary_item_cli,
    get_dictionary_item as get_dictionary_item_lib, rpcs::results::GetDictionaryItemResult,
    JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[derive(Default, Debug, Deserialize, Clone, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getDictionaryItemOptions", getter_with_clone)]
pub struct GetDictionaryItemOptions {
    pub node_address: String,
    pub state_root_hash_as_string: Option<String>,
    pub state_root_hash: Option<Digest>,
    pub dictionary_item_params: Option<DictionaryItemStrParams>,
    pub dictionary_item_identifier: Option<DictionaryItemIdentifier>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_dictionary_item_options")]
    pub fn get_dictionary_item_options(&self, options: JsValue) -> GetDictionaryItemOptions {
        let options_result = options.into_serde::<GetDictionaryItemOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                GetDictionaryItemOptions::default()
            }
        }
    }

    #[wasm_bindgen(js_name = "get_dictionary_item")]
    pub async fn get_dictionary_item_js_alias(
        &mut self,
        options: GetDictionaryItemOptions,
    ) -> JsValue {
        let GetDictionaryItemOptions {
            node_address,
            state_root_hash_as_string,
            state_root_hash,
            dictionary_item_params,
            dictionary_item_identifier,
            verbosity,
        } = options;

        let dictionary_item = if let Some(identifier) = dictionary_item_identifier {
            DictionaryItemInput::Identifier(identifier)
        } else if let Some(params) = dictionary_item_params {
            DictionaryItemInput::Params(params)
        } else {
            error("Error: Missing dictionary item identifier or params");
            return JsValue::null();
        };

        let result = if let Some(hash) = state_root_hash {
            self.get_dictionary_item(&node_address, hash, dictionary_item, verbosity)
                .await
        } else if let Some(hash) = state_root_hash_as_string.clone() {
            self.get_dictionary_item(&node_address, hash.as_str(), dictionary_item, verbosity)
                .await
        } else {
            error("Error: Missing state_root_hash");
            return JsValue::null();
        };
        serialize_result(result)
    }

    #[wasm_bindgen(js_name = "state_get_dictionary_item")]
    pub async fn state_get_dictionary_item_js_alias(
        &mut self,
        options: GetDictionaryItemOptions,
    ) -> JsValue {
        self.get_dictionary_item_js_alias(options).await
    }
}

pub enum DictionaryItemInput {
    Identifier(DictionaryItemIdentifier),
    Params(DictionaryItemStrParams),
}

impl SDK {
    pub async fn get_dictionary_item(
        &mut self,
        node_address: &str,
        state_root_hash: impl ToDigest,
        dictionary_item: DictionaryItemInput,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<GetDictionaryItemResult>, SdkError> {
        //log("state_get_dictionary_item!");
        match dictionary_item {
            DictionaryItemInput::Params(dictionary_item_params) => {
                let state_root_hash_as_string: String = state_root_hash.to_digest().to_string();
                get_dictionary_item_cli(
                    &rand::thread_rng().gen::<i64>().to_string(),
                    node_address,
                    get_verbosity_or_default(verbosity).into(),
                    &state_root_hash_as_string,
                    dictionary_item_str_params_to_casper_client(&dictionary_item_params),
                )
                .await
                .map_err(SdkError::from)
            }
            DictionaryItemInput::Identifier(dictionary_item_identifier) => get_dictionary_item_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                node_address,
                get_verbosity_or_default(verbosity).into(),
                state_root_hash.to_digest().into(),
                dictionary_item_identifier.into(),
            )
            .await
            .map_err(SdkError::from),
        }
    }
}
