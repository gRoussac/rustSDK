use super::SDK;
use crate::{
    helpers::serialize_result,
    js::externs::log,
    types::{deploy_hash::DeployHash, verbosity::Verbosity},
};
use casper_client::{
    get_deploy, rpcs::results::GetDeployResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn info_get_deploy(
        &mut self,
        node_address: &str,
        deploy_hash: DeployHash,
        finalized_approvals: bool,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("info_get_deploy!");
        log(&format!("{:?}", verbosity));
        let result: Result<SuccessResponse<GetDeployResult>, Error> = get_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            deploy_hash.into(),
            finalized_approvals,
        )
        .await;
        serialize_result(result)
    }
}
