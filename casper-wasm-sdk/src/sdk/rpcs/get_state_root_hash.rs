#[cfg(target_arch = "wasm32")]
use crate::debug::error;
#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
#[cfg(target_arch = "wasm32")]
use crate::types::digest::Digest;
use crate::{
    helpers::get_verbosity_or_default,
    types::{block_identifier::BlockIdentifierInput, sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    cli::get_state_root_hash as get_state_root_hash_cli,
    get_state_root_hash as get_state_root_hash_lib,
    rpcs::results::GetStateRootHashResult as _GetStateRootHashResult, JsonRpcId, SuccessResponse,
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
pub struct GetStateRootHashResult(_GetStateRootHashResult);

#[cfg(target_arch = "wasm32")]
impl From<GetStateRootHashResult> for _GetStateRootHashResult {
    fn from(result: GetStateRootHashResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetStateRootHashResult> for GetStateRootHashResult {
    fn from(result: _GetStateRootHashResult) -> Self {
        GetStateRootHashResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetStateRootHashResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn state_root_hash(&self) -> Option<Digest> {
        self.0.state_root_hash.map(Into::into)
    }

    #[wasm_bindgen(getter)]
    pub fn state_root_hash_as_string(&self) -> String {
        self.0
            .state_root_hash
            .map(Into::<Digest>::into)
            .map(|digest| digest.to_string())
            .unwrap_or_default()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getStateRootHashOptions", getter_with_clone)]
pub struct GetStateRootHashOptions {
    pub node_address: String,
    pub maybe_block_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_state_root_hash_options")]
    pub fn get_state_root_hash_options(&self, options: JsValue) -> GetStateRootHashOptions {
        let options_result = options.into_serde::<GetStateRootHashOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                GetStateRootHashOptions::default()
            }
        }
    }

    #[wasm_bindgen(js_name = "get_state_root_hash")]
    pub async fn get_state_root_hash_js_alias(
        &self,
        options: GetStateRootHashOptions,
    ) -> Result<GetStateRootHashResult, JsError> {
        let GetStateRootHashOptions {
            node_address,
            maybe_block_id_as_string,
            maybe_block_identifier,
            verbosity,
        } = options;
        let maybe_block_identifier = if let Some(maybe_block_identifier) = maybe_block_identifier {
            Some(BlockIdentifierInput::BlockIdentifier(
                maybe_block_identifier,
            ))
        } else {
            maybe_block_id_as_string.map(BlockIdentifierInput::String)
        };

        let result = self
            .get_state_root_hash(&node_address, maybe_block_identifier, verbosity)
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred: {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }

    #[wasm_bindgen(js_name = "chain_get_state_root_hash")]
    pub async fn chain_get_state_root_hash_js_alias(
        &self,
        options: GetStateRootHashOptions,
    ) -> Result<GetStateRootHashResult, JsError> {
        self.get_state_root_hash_js_alias(options).await
    }
}

impl SDK {
    pub async fn get_state_root_hash(
        &self,
        node_address: &str,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<_GetStateRootHashResult>, SdkError> {
        //log("get_state_root_hash!");
        if let Some(BlockIdentifierInput::String(maybe_block_id)) = maybe_block_identifier {
            get_state_root_hash_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                node_address,
                get_verbosity_or_default(verbosity).into(),
                &maybe_block_id,
            )
            .await
            .map_err(SdkError::from)
        } else {
            let maybe_block_identifier =
                if let Some(BlockIdentifierInput::BlockIdentifier(maybe_block_identifier)) =
                    maybe_block_identifier
                {
                    Some(maybe_block_identifier)
                } else {
                    None
                };
            get_state_root_hash_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                node_address,
                get_verbosity_or_default(verbosity).into(),
                maybe_block_identifier.map(Into::into),
            )
            .await
            .map_err(SdkError::from)
        }
    }
}
