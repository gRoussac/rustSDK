#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    types::{block_identifier::BlockIdentifier, verbosity::Verbosity},
    SDK,
};
use casper_client::{get_block, rpcs::results::GetBlockResult, Error, JsonRpcId, SuccessResponse};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_block")]
    pub async fn get_block_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> JsValue {
        serialize_result(
            self.get_block(node_address, verbosity, maybe_block_identifier)
                .await,
        )
    }

    #[wasm_bindgen(js_name = "chain_get_block")]
    pub async fn chain_get_block_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> JsValue {
        self.get_block_js_alias(node_address, verbosity, maybe_block_identifier)
            .await
    }
}
impl SDK {
    pub async fn get_block(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> Result<SuccessResponse<GetBlockResult>, Error> {
        //log("get_block!");
        get_block(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            maybe_block_identifier.map(Into::into),
        )
        .await
    }
}
