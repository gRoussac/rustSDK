#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    types::{deploy_hash::DeployHash, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    get_deploy, rpcs::results::GetDeployResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_deploy")]
    pub async fn get_deploy_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        deploy_hash: DeployHash,
        finalized_approvals: bool,
    ) -> JsValue {
        serialize_result(
            self.get_deploy(node_address, verbosity, deploy_hash, finalized_approvals)
                .await,
        )
    }

    #[wasm_bindgen(js_name = "info_get_deploy")]
    pub async fn info_get_deploy_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        deploy_hash: DeployHash,
        finalized_approvals: bool,
    ) -> JsValue {
        self.get_deploy_js_alias(node_address, verbosity, deploy_hash, finalized_approvals)
            .await
    }
}

impl SDK {
    pub async fn get_deploy(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        deploy_hash: DeployHash,
        finalized_approvals: bool,
    ) -> Result<SuccessResponse<GetDeployResult>, Error> {
        //log("get_deploy!");
        get_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            deploy_hash.into(),
            finalized_approvals,
        )
        .await
    }
}
