use super::SDK;
use crate::{
    helpers::serialize_result,
    types::{block_identifier::BlockIdentifier, verbosity::Verbosity},
};
use casper_client::{get_block, rpcs::results::GetBlockResult, Error, JsonRpcId, SuccessResponse};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]

impl SDK {
    #[wasm_bindgen]
    pub async fn chain_get_block(
        &mut self,
        node_address: &str,
        block_identifier: BlockIdentifier,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("chain_get_block!");
        let result: Result<SuccessResponse<GetBlockResult>, Error> = get_block(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            Some(block_identifier.into()),
        )
        .await;
        serialize_result(result)
    }
}
