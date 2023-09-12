use crate::types::deploy::Deploy;
#[cfg(target_arch = "wasm32")]
use crate::{debug::error, deploy::deploy::PutDeployResult};
use crate::{helpers::get_verbosity_or_default, types::verbosity::Verbosity, SDK};
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
        node_address: &str,
        deploy: Deploy,
        verbosity: Option<Verbosity>,
    ) -> Result<PutDeployResult, JsError> {
        let result = self
            .put_deploy(node_address, deploy.into(), verbosity)
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
        node_address: &str,
        deploy: Deploy,
        verbosity: Option<Verbosity>,
    ) -> Result<PutDeployResult, JsError> {
        self.put_deploy_js_alias(node_address, deploy, verbosity)
            .await
    }
}

impl SDK {
    pub async fn put_deploy(
        &self,
        node_address: &str,
        deploy: Deploy,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<_PutDeployResult>, Error> {
        //log("account_put_deploy!");
        put_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            get_verbosity_or_default(verbosity).into(),
            deploy.into(),
        )
        .await
    }
}
