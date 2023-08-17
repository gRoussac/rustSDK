#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    types::{deploy::Deploy, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    put_deploy, rpcs::results::PutDeployResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "put_deploy")]
    pub async fn put_deploy_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        deploy: Deploy,
    ) -> JsValue {
        serialize_result(self.put_deploy(node_address, verbosity, deploy).await)
    }

    #[wasm_bindgen(js_name = "account_put_deploy")]
    pub async fn account_put_deploy_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        deploy: Deploy,
    ) -> JsValue {
        self.put_deploy_js_alias(node_address, verbosity, deploy)
            .await
    }
}

impl SDK {
    pub async fn put_deploy(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        deploy: Deploy,
    ) -> Result<SuccessResponse<PutDeployResult>, Error> {
        //log("account_put_deploy!");
        put_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            deploy.into(),
        )
        .await
    }
}
