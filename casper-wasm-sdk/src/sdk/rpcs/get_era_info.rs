#[cfg(target_arch = "wasm32")]
use crate::debug::error;
#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
use crate::{
    helpers::get_verbosity_or_default,
    types::{block_identifier::BlockIdentifierInput, sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
#[allow(deprecated)]
use casper_client::{
    cli::get_era_info as get_era_info_cli, get_era_info as get_era_info_lib,
    rpcs::results::GetEraInfoResult as _GetEraInfoResult, JsonRpcId, SuccessResponse,
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
pub struct GetEraInfoResult(_GetEraInfoResult);

#[cfg(target_arch = "wasm32")]
impl From<GetEraInfoResult> for _GetEraInfoResult {
    fn from(result: GetEraInfoResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetEraInfoResult> for GetEraInfoResult {
    fn from(result: _GetEraInfoResult) -> Self {
        GetEraInfoResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetEraInfoResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn era_summary(&self) -> JsValue {
        JsValue::from_serde(&self.0.era_summary).unwrap()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getEraInfoOptions", getter_with_clone)]
pub struct GetEraInfoOptions {
    pub node_address: String,
    pub maybe_block_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[deprecated(note = "prefer 'get_era_summary' as it doesn't require a switch block")]
    #[allow(deprecated)]
    #[wasm_bindgen(js_name = "get_era_info_options")]
    pub fn get_era_info_options(&self, options: JsValue) -> GetEraInfoOptions {
        options.into_serde().unwrap_or_default()
    }

    #[deprecated(note = "prefer 'get_era_summary' as it doesn't require a switch block")]
    #[allow(deprecated)]
    #[wasm_bindgen(js_name = "get_era_info")]
    pub async fn get_era_info_js_alias(
        &self,
        options: GetEraInfoOptions,
    ) -> Result<GetEraInfoResult, JsError> {
        let GetEraInfoOptions {
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
            .get_era_info(&node_address, maybe_block_identifier, verbosity)
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
}

impl SDK {
    #[deprecated(note = "prefer 'get_era_summary' as it doesn't require a switch block")]
    #[allow(deprecated)]
    pub async fn get_era_info(
        &self,
        node_address: &str,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<_GetEraInfoResult>, SdkError> {
        //log("get_era_info!");

        if let Some(BlockIdentifierInput::String(maybe_block_id)) = maybe_block_identifier {
            get_era_info_cli(
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
            get_era_info_lib(
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
