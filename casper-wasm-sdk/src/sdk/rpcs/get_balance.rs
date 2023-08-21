#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    helpers::get_verbosity_or_default,
    types::{digest::Digest, uref::URef, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    get_balance, rpcs::results::GetBalanceResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_balance")]
    pub async fn get_balance_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
        state_root_hash: Digest,
        purse: URef,
    ) -> JsValue {
        serialize_result(
            self.get_balance(node_address, verbosity, state_root_hash, purse)
                .await,
        )
    }

    #[wasm_bindgen(js_name = "state_get_balance")]
    pub async fn state_get_balance_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
        state_root_hash: Digest,
        purse: URef,
    ) -> JsValue {
        self.get_balance_js_alias(node_address, verbosity, state_root_hash, purse)
            .await
    }
}

impl SDK {
    pub async fn get_balance(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
        state_root_hash: Digest,
        purse: URef,
    ) -> Result<SuccessResponse<GetBalanceResult>, Error> {
        //log("get_balance!");
        get_balance(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            get_verbosity_or_default(verbosity).into(),
            state_root_hash.into(),
            purse.into(),
        )
        .await
    }
}
