#[cfg(target_arch = "wasm32")]
use crate::debug::error;
use crate::types::digest::Digest;
use crate::{
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
    get_dictionary_item as get_dictionary_item_lib,
    rpcs::results::GetDictionaryItemResult as _GetDictionaryItemResult, JsonRpcId, SuccessResponse,
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
pub struct GetDictionaryItemResult(_GetDictionaryItemResult);

#[cfg(target_arch = "wasm32")]
impl From<GetDictionaryItemResult> for _GetDictionaryItemResult {
    fn from(result: GetDictionaryItemResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetDictionaryItemResult> for GetDictionaryItemResult {
    fn from(result: _GetDictionaryItemResult) -> Self {
        GetDictionaryItemResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetDictionaryItemResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn dictionary_key(&self) -> String {
        self.0.dictionary_key.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn stored_value(&self) -> JsValue {
        JsValue::from_serde(&self.0.stored_value).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn merkle_proof(&self) -> String {
        self.0.merkle_proof.clone()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[derive(Default, Debug, Deserialize, Clone, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getDictionaryItemOptions", getter_with_clone)]
pub struct GetDictionaryItemOptions {
    pub state_root_hash_as_string: Option<String>,
    pub state_root_hash: Option<Digest>,
    pub dictionary_item_params: Option<DictionaryItemStrParams>,
    pub dictionary_item_identifier: Option<DictionaryItemIdentifier>,
    pub node_address: Option<String>,
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
        &self,
        options: Option<GetDictionaryItemOptions>,
    ) -> Result<GetDictionaryItemResult, JsError> {
        let GetDictionaryItemOptions {
            state_root_hash_as_string,
            state_root_hash,
            dictionary_item_params,
            dictionary_item_identifier,
            verbosity,
            node_address,
        } = options.unwrap_or_default();

        let dictionary_item = if let Some(identifier) = dictionary_item_identifier {
            DictionaryItemInput::Identifier(identifier)
        } else if let Some(params) = dictionary_item_params {
            DictionaryItemInput::Params(params)
        } else {
            let err = "Error: Missing dictionary item identifier or params";
            error(err);
            return Err(JsError::new(err));
        };

        let result = if let Some(hash) = state_root_hash {
            self.get_dictionary_item(hash, dictionary_item, verbosity, node_address)
                .await
        } else if let Some(hash) = state_root_hash_as_string.clone() {
            self.get_dictionary_item(hash.as_str(), dictionary_item, verbosity, node_address)
                .await
        } else {
            let err = "Error: Missing state_root_hash";
            error(err);
            return Err(JsError::new(err));
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

    #[wasm_bindgen(js_name = "state_get_dictionary_item")]
    pub async fn state_get_dictionary_item_js_alias(
        &self,
        options: Option<GetDictionaryItemOptions>,
    ) -> Result<GetDictionaryItemResult, JsError> {
        self.get_dictionary_item_js_alias(options).await
    }
}

pub enum DictionaryItemInput {
    Identifier(DictionaryItemIdentifier),
    Params(DictionaryItemStrParams),
}

impl SDK {
    pub async fn get_dictionary_item(
        &self,
        state_root_hash: impl ToDigest,
        dictionary_item: DictionaryItemInput,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetDictionaryItemResult>, SdkError> {
        // log("state_get_dictionary_item!");
        match dictionary_item {
            DictionaryItemInput::Params(dictionary_item_params) => {
                let state_root_hash_as_string: String = if !state_root_hash.is_empty() {
                    state_root_hash.to_digest().to_string()
                } else {
                    let state_root_hash: Digest = self
                        .get_state_root_hash(None, None, None)
                        .await
                        .unwrap()
                        .result
                        .state_root_hash
                        .unwrap()
                        .into();
                    state_root_hash.to_string()
                };
                get_dictionary_item_cli(
                    &rand::thread_rng().gen::<i64>().to_string(),
                    &self.get_node_address(node_address),
                    self.get_verbosity(verbosity).into(),
                    &state_root_hash_as_string,
                    dictionary_item_str_params_to_casper_client(&dictionary_item_params),
                )
                .await
                .map_err(SdkError::from)
            }
            DictionaryItemInput::Identifier(dictionary_item_identifier) => {
                let state_root_hash = if state_root_hash.is_empty() {
                    self.get_state_root_hash(None, None, None)
                        .await
                        .unwrap()
                        .result
                        .state_root_hash
                        .unwrap()
                        .into()
                } else {
                    state_root_hash.to_digest()
                };

                get_dictionary_item_lib(
                    JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                    &self.get_node_address(node_address),
                    self.get_verbosity(verbosity).into(),
                    state_root_hash.into(),
                    dictionary_item_identifier.into(),
                )
                .await
                .map_err(SdkError::from)
            }
        }
    }
}
