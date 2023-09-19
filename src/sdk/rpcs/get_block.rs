#[cfg(target_arch = "wasm32")]
use crate::debug::error;
#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
use crate::{
    types::{block_identifier::BlockIdentifierInput, sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    cli::get_block as get_block_cli, get_block as get_block_lib,
    rpcs::results::GetBlockResult as _GetBlockResult, JsonRpcId, SuccessResponse,
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
pub struct GetBlockResult(_GetBlockResult);

#[cfg(target_arch = "wasm32")]
impl From<GetBlockResult> for _GetBlockResult {
    fn from(result: GetBlockResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetBlockResult> for GetBlockResult {
    fn from(result: _GetBlockResult) -> Self {
        GetBlockResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetBlockResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn block(&self) -> JsValue {
        JsValue::from_serde(&self.0.block).unwrap()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[derive(Debug, Deserialize, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getBlockOptions", getter_with_clone)]
pub struct GetBlockOptions {
    pub maybe_block_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub node_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_block_options")]
    pub fn get_block_options(&self, options: JsValue) -> GetBlockOptions {
        let options_result = options.into_serde::<GetBlockOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                GetBlockOptions::default()
            }
        }
    }

    #[wasm_bindgen(js_name = "get_block")]
    pub async fn get_block_js_alias(
        &self,
        options: Option<GetBlockOptions>,
    ) -> Result<GetBlockResult, JsError> {
        let GetBlockOptions {
            maybe_block_id_as_string,
            maybe_block_identifier,
            verbosity,
            node_address,
        } = options.unwrap_or_default();

        let maybe_block_identifier = if let Some(maybe_block_identifier) = maybe_block_identifier {
            Some(BlockIdentifierInput::BlockIdentifier(
                maybe_block_identifier,
            ))
        } else {
            maybe_block_id_as_string.map(BlockIdentifierInput::String)
        };

        let result = self
            .get_block(maybe_block_identifier, verbosity, node_address)
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }

    #[wasm_bindgen(js_name = "chain_get_block")]
    pub async fn chain_get_block_js_alias(
        &self,
        options: Option<GetBlockOptions>,
    ) -> Result<GetBlockResult, JsError> {
        self.get_block_js_alias(options).await
    }
}

impl SDK {
    pub async fn get_block(
        &self,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetBlockResult>, SdkError> {
        //log("get_block!");

        if let Some(BlockIdentifierInput::String(maybe_block_id)) = maybe_block_identifier {
            get_block_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_node_address(node_address),
                self.get_verbosity(verbosity).into(),
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
            get_block_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &self.get_node_address(node_address),
                self.get_verbosity(verbosity).into(),
                maybe_block_identifier.map(Into::into),
            )
            .await
            .map_err(SdkError::from)
        }
    }
}
