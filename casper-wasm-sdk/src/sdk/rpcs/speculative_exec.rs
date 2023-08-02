use crate::{
    helpers::serialize_result,
    sdk::SDK,
    types::{block_identifier::BlockIdentifier, deploy::Deploy, verbosity::Verbosity},
};
use casper_client::{
    rpcs::results::SpeculativeExecResult, speculative_exec, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn speculative_exec(
        &mut self,
        node_address: &str,
        block_identifier: Option<BlockIdentifier>,
        verbosity: Verbosity,
        deploy: Deploy,
    ) -> JsValue {
        //log("speculative_exec!");
        let result: Result<SuccessResponse<SpeculativeExecResult>, Error> = speculative_exec(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            block_identifier.map(Into::into),
            verbosity.into(),
            deploy.into(),
        )
        .await;
        serialize_result(result)
    }
}
