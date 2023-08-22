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
    cli::get_state_root_hash as get_state_root_hash_cli,
    get_state_root_hash as get_state_root_hash_lib, rpcs::results::GetStateRootHashResult,
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
#[wasm_bindgen(js_name = "getStateRootHashOptions")]
pub struct GetStateRootHashOptions {
    node_address: String,
    maybe_block_id_as_string: Option<String>,
    maybe_block_identifier: Option<BlockIdentifier>,
    verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_state_root_hash_options")]
    pub fn get_state_root_hash_options(&self, options: JsValue) -> GetStateRootHashOptions {
        options.into_serde().unwrap_or_default()
    }

    #[wasm_bindgen(js_name = "get_state_root_hash")]
    pub async fn get_state_root_hash_js_alias(
        &mut self,
        options: GetStateRootHashOptions,
    ) -> JsValue {
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

        serialize_result(
            self.get_state_root_hash(&node_address, maybe_block_identifier, verbosity)
                .await,
        )
    }
}

impl SDK {
    pub async fn get_state_root_hash(
        &mut self,
        node_address: &str,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<GetStateRootHashResult>, SdkError> {
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
