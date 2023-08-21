#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    debug::error,
    helpers::get_verbosity_or_default,
    types::{
        deploy_params::dictionary_item_str_params::{
            dictionary_item_str_params_to_casper_client, DictionaryItemStrParams,
        },
        dictionary_item_identifier::DictionaryItemIdentifier,
        digest::{Digest, ToDigest},
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
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
use serde::Deserialize;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[derive(Default, Debug, Deserialize, Clone)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getDictionaryItemOptions")]
pub struct GetDictionaryItemOptions {
    node_address: String,
    state_root_hash: Option<String>,
    state_root_hash_digest: Option<Digest>,
    dictionary_item_params: Option<DictionaryItemStrParams>,
    dictionary_item_identifier: Option<DictionaryItemIdentifier>,
    verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_dictionary_item_options")]
    pub fn get_dictionary_item_options(&self, options: JsValue) -> GetDictionaryItemOptions {
        let options_result: Result<GetDictionaryItemOptions, _> = options.into_serde();
        if let Err(err) = options_result {
            error(&format!("Deserialization error: {:?}", err));
            return GetDictionaryItemOptions::default();
        }
        let options: GetDictionaryItemOptions = options_result.unwrap();
        options
    }

    #[wasm_bindgen(js_name = "get_dictionary_item")]
    pub async fn get_dictionary_item_js_alias(
        &mut self,
        options: GetDictionaryItemOptions,
    ) -> JsValue {
        let cloned_options = options.clone();
        let GetDictionaryItemOptions {
            node_address,
            state_root_hash,
            state_root_hash_digest,
            dictionary_item_params,
            dictionary_item_identifier,
            verbosity,
        } = options;

        let dictionary_item = if let Some(identifier) = dictionary_item_identifier {
            DictionaryItemInput::Identifier(identifier)
        } else if let Some(params) = dictionary_item_params {
            DictionaryItemInput::Params(params)
        } else {
            error("Error: Missing dictionary_item identifier or params");
            return JsValue::null();
        };

        let result = if let Some(hash) = state_root_hash_digest {
            self.get_dictionary_item(&node_address, hash, verbosity, Some(dictionary_item))
                .await
        } else if let Some(hash) = state_root_hash {
            self.get_dictionary_item(
                &node_address,
                hash.as_str(),
                verbosity,
                Some(dictionary_item),
            )
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
        verbosity: Option<Verbosity>,
        dictionary_item: Option<DictionaryItemInput>,
    ) -> Result<SuccessResponse<GetDictionaryItemResult>, SdkError> {
        //log("state_get_dictionary_item!");
        if let Some(DictionaryItemInput::Identifier(dictionary_item_identifier)) = dictionary_item {
            get_dictionary_item_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                node_address,
                get_verbosity_or_default(verbosity).into(),
                state_root_hash.to_digest().into(),
                dictionary_item_identifier.into(),
            )
            .await
            .map_err(SdkError::from)
        } else if let Some(DictionaryItemInput::Params(dictionary_item_params)) = dictionary_item {
            let state_root_hash_as_string: String = state_root_hash.to_digest().into();
            get_dictionary_item_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                node_address,
                get_verbosity_or_default(verbosity).into(),
                &state_root_hash_as_string,
                dictionary_item_str_params_to_casper_client(&dictionary_item_params),
            )
            .await
            .map_err(SdkError::from)
        } else {
            Err(SdkError::InvalidArgument {
                context: "get_dictionary_item",
                error: "Missing dictionary_item identifier or params".to_string(),
            })
        }
    }
}
