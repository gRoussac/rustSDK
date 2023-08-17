use crate::{
    helpers::serialize_result,
    sdk::SDK,
    types::{digest::Digest, uref::URef, verbosity::Verbosity},
};
use casper_client::{
    get_balance, rpcs::results::GetBalanceResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    pub async fn get_balance(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        state_root_hash: Digest,
        purse: URef,
    ) -> JsValue {
        //log("get_balance!");
        let result: Result<SuccessResponse<GetBalanceResult>, Error> = get_balance(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            state_root_hash.into(),
            purse.into(),
        )
        .await;
        serialize_result(result)
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "state_get_balance")]
    pub async fn state_get_balance_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        state_root_hash: Digest,
        purse: URef,
    ) -> JsValue {
        self.get_balance(node_address, verbosity, state_root_hash, purse)
            .await
    }
}
