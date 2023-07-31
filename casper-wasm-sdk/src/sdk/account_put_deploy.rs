use super::SDK;
use crate::{
    helpers::serialize_result,
    types::{deploy::Deploy, verbosity::Verbosity},
};
use casper_client::{
    put_deploy, rpcs::results::PutDeployResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn account_put_deploy(
        &mut self,
        node_address: &str,
        deploy: Deploy,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("account_put_deploy!".to_string());
        let result: Result<SuccessResponse<PutDeployResult>, Error> = put_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            deploy.into(),
        )
        .await;
        serialize_result(result)
    }
}
