use crate::{helpers::serialize_result, sdk::SDK, types::verbosity::Verbosity};
use casper_client::{
    get_node_status, rpcs::results::GetNodeStatusResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn get_node_status(&mut self, node_address: &str, verbosity: Verbosity) -> JsValue {
        //log("get_node_status!");
        let result: Result<SuccessResponse<GetNodeStatusResult>, Error> = get_node_status(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
        )
        .await;
        serialize_result(result)
    }
}
