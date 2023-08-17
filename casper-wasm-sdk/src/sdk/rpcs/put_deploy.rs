use crate::{
    helpers::serialize_result,
    types::{deploy::Deploy, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    put_deploy, rpcs::results::PutDeployResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    pub async fn put_deploy(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        deploy: Deploy,
    ) -> JsValue {
        //log("account_put_deploy!");
        let result: Result<SuccessResponse<PutDeployResult>, Error> = put_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            deploy.into(),
        )
        .await;
        serialize_result(result)
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "account_put_deploy")]
    pub async fn account_put_deploy_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        deploy: Deploy,
    ) -> JsValue {
        self.put_deploy(node_address, verbosity, deploy).await
    }
}
