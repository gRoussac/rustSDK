use super::SDK;
use crate::{
    helpers::serialize_result,
    types::{
        global_state_identifier::GlobalStateIdentifier, key::Key, path::Path, verbosity::Verbosity,
    },
};
use casper_client::{
    query_global_state, rpcs::results::QueryGlobalStateResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn query_global_state(
        &mut self,
        node_address: &str,
        global_state_identifier: GlobalStateIdentifier,
        key: Key,
        path: Path,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("query_global_state!");
        let result: Result<SuccessResponse<QueryGlobalStateResult>, Error> = query_global_state(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            global_state_identifier.into(),
            key.into(),
            path.into(),
        )
        .await;
        serialize_result(result)
    }
}
