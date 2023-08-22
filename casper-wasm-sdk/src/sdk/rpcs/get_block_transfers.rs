#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
use crate::{
    helpers::get_verbosity_or_default,
    types::{block_identifier::BlockIdentifierInput, sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    cli::get_block_transfers as get_block_transfers_cli,
    get_block_transfers as get_block_transfers_lib, rpcs::results::GetBlockTransfersResult,
    JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::Deserialize;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Default)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getBlockTransfersOptions")]
pub struct GetBlockTransfersOptions {
    node_address: String,
    maybe_block_id_as_string: Option<String>,
    maybe_block_identifier: Option<BlockIdentifier>,
    verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_block_transfers_options")]
    pub fn get_block_transfers_options(&self, options: JsValue) -> GetBlockTransfersOptions {
        options.into_serde().unwrap_or_default()
    }

    #[wasm_bindgen(js_name = "get_block_transfers")]
    pub async fn get_block_transfers_js_alias(
        &mut self,
        options: GetBlockTransfersOptions,
    ) -> JsValue {
        let GetBlockTransfersOptions {
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
            maybe_block_id_as_string.map(BlockIdentifierInput::Id)
        };

        serialize_result(
            self.get_block_transfers(&node_address, maybe_block_identifier, verbosity)
                .await,
        )
    }
}

impl SDK {
    pub async fn get_block_transfers(
        &mut self,
        node_address: &str,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<GetBlockTransfersResult>, SdkError> {
        //log("get_block_transfers!");

        if let Some(BlockIdentifierInput::Id(maybe_block_id)) = maybe_block_identifier {
            get_block_transfers_cli(
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
            get_block_transfers_lib(
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
