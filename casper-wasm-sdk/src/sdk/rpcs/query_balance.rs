use crate::{
    helpers::serialize_result,
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
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn query_balance(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_global_state_identifier: Option<GlobalStateIdentifier>,
        purse_identifier: PurseIdentifier,
    ) -> JsValue {
        //log("query_balance!");
        let result: Result<SuccessResponse<QueryBalanceResult>, Error> = query_balance(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            maybe_global_state_identifier.map(Into::into),
            purse_identifier.into(),
        )
        .await;
        serialize_result(result)
    }
}
