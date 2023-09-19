use crate::types::deploy::Deploy;
#[cfg(target_arch = "wasm32")]
use crate::{debug::error, deploy::deploy::PutDeployResult};
use crate::{types::verbosity::Verbosity, SDK};
use casper_client::{
    put_deploy, rpcs::results::PutDeployResult as _PutDeployResult, Error, JsonRpcId,
    SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "put_deploy")]
    pub async fn put_deploy_js_alias(
        &self,
        deploy: Deploy,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<PutDeployResult, JsError> {
        let result = self
            .put_deploy(deploy.into(), verbosity, node_address)
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }

    #[wasm_bindgen(js_name = "account_put_deploy")]
    pub async fn account_put_deploy_js_alias(
        &self,
        deploy: Deploy,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<PutDeployResult, JsError> {
        self.put_deploy_js_alias(deploy, verbosity, node_address)
            .await
    }
}

impl SDK {
    pub async fn put_deploy(
        &self,
        deploy: Deploy,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_PutDeployResult>, Error> {
        //log("account_put_deploy!");
        put_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            &self.get_node_address(node_address),
            self.get_verbosity(verbosity).into(),
            deploy.into(),
        )
        .await
    }
}
