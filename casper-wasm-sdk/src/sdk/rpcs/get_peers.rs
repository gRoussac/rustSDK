#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{debug::log, sdk::SDK, types::verbosity::Verbosity};
use casper_client::{
    get_peers as client_get_peers, rpcs::results::GetPeersResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_peers")]
    pub async fn get_peers_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
    ) -> JsValue {
        serialize_result(self.get_peers(node_address, verbosity).await)
    }
}

impl SDK {
    pub async fn get_peers(
        &self,
        node_address: &str,
        verbosity: Verbosity,
    ) -> Result<SuccessResponse<GetPeersResult>, Error> {
        log("get_peers!");
        client_get_peers(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
        )
        .await
    }
}
