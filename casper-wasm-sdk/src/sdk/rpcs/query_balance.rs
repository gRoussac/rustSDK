#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    types::{
        global_state_identifier::GlobalStateIdentifier, purse_identifier::PurseIdentifier,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    query_balance, rpcs::results::QueryBalanceResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "query_balance")]
    pub async fn query_balance_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_global_state_identifier: Option<GlobalStateIdentifier>,
        purse_identifier: PurseIdentifier,
    ) -> JsValue {
        serialize_result(
            self.query_balance(
                node_address,
                verbosity,
                maybe_global_state_identifier,
                purse_identifier,
            )
            .await,
        )
    }
}

impl SDK {
    pub async fn query_balance(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_global_state_identifier: Option<GlobalStateIdentifier>,
        purse_identifier: PurseIdentifier,
    ) -> Result<SuccessResponse<QueryBalanceResult>, Error> {
        //log("query_balance!");
        query_balance(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            maybe_global_state_identifier.map(Into::into),
            purse_identifier.into(),
        )
        .await
    }
}
