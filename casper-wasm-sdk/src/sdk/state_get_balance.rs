use super::SDK;
use crate::{
    helpers::serialize_result,
    types::{digest::Digest, uref::URef, verbosity::Verbosity},
};
use casper_client::{
    get_balance, rpcs::results::GetBalanceResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn state_get_balance(
        &mut self,
        node_address: &str,
        state_root_hash: Digest,
        purse: URef,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("state_get_balance!");
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
}
