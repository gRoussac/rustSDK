use crate::{
    helpers::serialize_result,
    sdk::SDK,
    types::{block_identifier::BlockIdentifier, verbosity::Verbosity},
};
use casper_client::{get_block, rpcs::results::GetBlockResult, Error, JsonRpcId, SuccessResponse};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]

impl SDK {
    pub async fn get_block(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> JsValue {
        //log("get_block!");
        let result: Result<SuccessResponse<GetBlockResult>, Error> = get_block(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            maybe_block_identifier.map(Into::into),
        )
        .await;
        serialize_result(result)
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "chain_get_block")]
    pub async fn chain_get_block_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> JsValue {
        self.get_block(node_address, verbosity, maybe_block_identifier)
            .await
    }
}
