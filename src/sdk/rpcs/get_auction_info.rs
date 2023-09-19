#[cfg(target_arch = "wasm32")]
use crate::debug::error;
#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
use crate::{
    types::{block_identifier::BlockIdentifierInput, sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    cli::get_auction_info as get_auction_info_cli, get_auction_info as get_auction_info_lib,
    rpcs::results::GetAuctionInfoResult as _GetAuctionInfoResult, JsonRpcId, SuccessResponse,
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
pub struct GetAuctionInfoResult(_GetAuctionInfoResult);

#[cfg(target_arch = "wasm32")]
impl From<GetAuctionInfoResult> for _GetAuctionInfoResult {
    fn from(result: GetAuctionInfoResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetAuctionInfoResult> for GetAuctionInfoResult {
    fn from(result: _GetAuctionInfoResult) -> Self {
        GetAuctionInfoResult(result)
    }
}
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetAuctionInfoResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn auction_state(&self) -> JsValue {
        JsValue::from_serde(&self.0.auction_state).unwrap()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getAuctionInfoOptions", getter_with_clone)]
pub struct GetAuctionInfoOptions {
    pub maybe_block_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub node_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_auction_info_options")]
    pub fn get_auction_info_options(&self, options: JsValue) -> GetAuctionInfoOptions {
        let options_result = options.into_serde::<GetAuctionInfoOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                GetAuctionInfoOptions::default()
            }
        }
    }

    #[wasm_bindgen(js_name = "get_auction_info")]
    pub async fn get_auction_info_js_alias(
        &self,
        options: Option<GetAuctionInfoOptions>,
    ) -> Result<GetAuctionInfoResult, JsError> {
        let GetAuctionInfoOptions {
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
            .get_auction_info(maybe_block_identifier, verbosity, node_address)
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
    pub async fn get_auction_info(
        &self,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetAuctionInfoResult>, SdkError> {
        //log("get_auction_info!");

        if let Some(BlockIdentifierInput::String(maybe_block_id)) = maybe_block_identifier {
            get_auction_info_cli(
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
            get_auction_info_lib(
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
