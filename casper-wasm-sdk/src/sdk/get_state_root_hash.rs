use super::SDK;
use crate::{
    helpers::serialize_result,
    types::{block_identifier::BlockIdentifier, verbosity::Verbosity},
};
use casper_client::{
    get_state_root_hash, rpcs::results::GetStateRootHashResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn get_state_root_hash(
        &mut self,
        node_address: &str,
        block_identifier: Option<BlockIdentifier>,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("state_root_hash!");
        let result: Result<SuccessResponse<GetStateRootHashResult>, Error> = get_state_root_hash(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            block_identifier.map(Into::into),
        )
        .await;
        serialize_result(result)
    }
}
