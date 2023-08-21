#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    helpers::get_verbosity_or_default,
    types::{
        global_state_identifier::GlobalStateIdentifier, key::Key, path::Path, verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    query_global_state, rpcs::results::QueryGlobalStateResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "query_global_state")]
    pub async fn query_global_state_js_alias(
        &mut self,
        node_address: &str,
        global_state_identifier: GlobalStateIdentifier,
        key: Key,
        path: Path,
        verbosity: Option<Verbosity>,
    ) -> JsValue {
        serialize_result(
            self.query_global_state(node_address, verbosity, global_state_identifier, key, path)
                .await,
        )
    }
}

impl SDK {
    pub async fn query_global_state(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
        global_state_identifier: GlobalStateIdentifier,
        key: Key,
        path: Path,
    ) -> Result<SuccessResponse<QueryGlobalStateResult>, Error> {
        //log("query_global_state!");
        query_global_state(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            get_verbosity_or_default(verbosity).into(),
            global_state_identifier.into(),
            key.into(),
            path.into(),
        )
        .await
    }
}
