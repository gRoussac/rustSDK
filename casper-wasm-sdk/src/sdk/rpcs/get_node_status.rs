#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{types::verbosity::Verbosity, SDK};
use casper_client::{
    get_node_status, rpcs::results::GetNodeStatusResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_node_status")]
    pub async fn get_node_status_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
    ) -> JsValue {
        serialize_result(self.get_node_status(node_address, verbosity).await)
    }
}

impl SDK {
    pub async fn get_node_status(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
    ) -> Result<SuccessResponse<GetNodeStatusResult>, Error> {
        //log("get_node_status!");
        get_node_status(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
        )
        .await
    }
}
