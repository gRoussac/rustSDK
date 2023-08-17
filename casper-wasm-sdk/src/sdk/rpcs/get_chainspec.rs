#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{types::verbosity::Verbosity, SDK};
use casper_client::{
    get_chainspec, rpcs::results::GetChainspecResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_chainspec")]
    pub async fn get_chainspec_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
    ) -> JsValue {
        serialize_result(self.get_chainspec(node_address, verbosity).await)
    }
}

impl SDK {
    pub async fn get_chainspec(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
    ) -> Result<SuccessResponse<GetChainspecResult>, Error> {
        //log("get_chainspec!");
        get_chainspec(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
        )
        .await
    }
}
