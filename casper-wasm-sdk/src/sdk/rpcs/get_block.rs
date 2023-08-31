#[cfg(target_arch = "wasm32")]
use crate::debug::error;
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
    cli::get_block as get_block_cli, get_block as get_block_lib, rpcs::results::GetBlockResult,
    JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getBlockOptions", getter_with_clone)]
pub struct GetBlockOptions {
    pub node_address: String,
    pub maybe_block_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
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
    pub async fn get_block_js_alias(&mut self, options: GetBlockOptions) -> JsValue {
        let GetBlockOptions {
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

        serialize_result(
            self.get_block(&node_address, maybe_block_identifier, verbosity)
                .await,
        )
    }

    #[wasm_bindgen(js_name = "chain_get_block")]
    pub async fn chain_get_block_js_alias(&mut self, options: GetBlockOptions) -> JsValue {
        self.get_block_js_alias(options).await
    }
}

impl SDK {
    pub async fn get_block(
        &mut self,
        node_address: &str,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<GetBlockResult>, SdkError> {
        //log("get_block!");

        if let Some(BlockIdentifierInput::String(maybe_block_id)) = maybe_block_identifier {
            get_block_cli(
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
            get_block_lib(
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
