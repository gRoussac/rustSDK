use crate::{helpers::serialize_result, sdk::SDK, types::verbosity::Verbosity};
use casper_client::{
    get_chainspec, rpcs::results::GetChainspecResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn get_chainspec(&mut self, node_address: &str, verbosity: Verbosity) -> JsValue {
        //log("get_chainspec!");
        let result: Result<SuccessResponse<GetChainspecResult>, Error> = get_chainspec(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
        )
        .await;
        serialize_result(result)
    }
}
