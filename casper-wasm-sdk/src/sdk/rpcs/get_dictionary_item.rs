#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    debug::{error, log},
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
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;
use wasm_bindgen::{
    convert::{FromWasmAbi, IntoWasmAbi},
    describe::WasmDescribe,
};

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_dictionary_item")]
    pub async fn get_dictionary_item_js_alias(
        &mut self,
        node_address: &str,
        state_root_hash: Option<String>,
        dictionary_item_identifier: Option<DictionaryItemIdentifier>,
        dictionary_item_params: Option<DictionaryItemStrParams>,
        verbosity: Option<Verbosity>,
        state_root_hash_digest: Option<Digest>,
    ) -> JsValue {
        let dictionary_item = if let Some(identifier) = dictionary_item_identifier {
            DictionaryItemInput::Identifier(identifier)
        } else if let Some(params) = dictionary_item_params {
            DictionaryItemInput::Params(params)
        } else {
            error("Error: Missing dictionary_item identifier or params");
            return JsValue::null();
        };

        let selected_state_root_hash: Digest = if let Some(hash) = state_root_hash_digest {
            hash
        } else if let Some(hash_string) = state_root_hash {
            Digest::from(hash_string.as_str())
        } else {
            error("Error: Missing state_root_hash");
            return JsValue::null();
        };

        serialize_result(
            self.get_dictionary_item(
                node_address,
                selected_state_root_hash,
                verbosity,
                Some(dictionary_item),
            )
            .await,
        )
    }

    #[wasm_bindgen(js_name = "state_get_dictionary_item")]
    pub async fn state_get_dictionary_item_js_alias(
        &mut self,
        node_address: &str,
        state_root_hash: Option<String>,
        dictionary_item_identifier: Option<DictionaryItemIdentifier>,
        dictionary_item_params: Option<DictionaryItemStrParams>,
        verbosity: Option<Verbosity>,
        state_root_hash_digest: Option<Digest>,
    ) -> JsValue {
        self.get_dictionary_item_js_alias(
            node_address,
            state_root_hash,
            dictionary_item_identifier,
            dictionary_item_params,
            verbosity,
            state_root_hash_digest,
        )
        .await
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
