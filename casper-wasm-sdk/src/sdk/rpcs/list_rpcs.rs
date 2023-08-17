use crate::{helpers::serialize_result, types::verbosity::Verbosity, SDK};
use casper_client::{list_rpcs, rpcs::results::ListRpcsResult, Error, JsonRpcId, SuccessResponse};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn list_rpcs(&mut self, node_address: &str, verbosity: Verbosity) -> JsValue {
        //log("list_rpcs!");
        let result: Result<SuccessResponse<ListRpcsResult>, Error> = list_rpcs(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
        )
        .await;
        serialize_result(result)
    }
}
