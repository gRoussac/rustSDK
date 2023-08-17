use crate::{
    helpers::serialize_result,
    types::{deploy_hash::DeployHash, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    get_deploy, rpcs::results::GetDeployResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    pub async fn get_deploy(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        deploy_hash: DeployHash,
        finalized_approvals: bool,
    ) -> JsValue {
        //log("get_deploy!");
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

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "info_get_deploy")]
    pub async fn info_get_deploy_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        deploy_hash: DeployHash,
        finalized_approvals: bool,
    ) -> JsValue {
        self.get_deploy(node_address, verbosity, deploy_hash, finalized_approvals)
            .await
    }
}
