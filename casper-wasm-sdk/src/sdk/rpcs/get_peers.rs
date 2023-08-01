use crate::{helpers::serialize_result, sdk::SDK, types::verbosity::Verbosity};
use casper_client::{get_peers, rpcs::results::GetPeersResult, Error, JsonRpcId, SuccessResponse};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn get_peers(&mut self, node_address: &str, verbosity: Verbosity) -> JsValue {
        //log("get_peers!".to_string());
        let result: Result<SuccessResponse<GetPeersResult>, Error> = get_peers(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
        )
        .await;
        serialize_result(result)
    }
}
