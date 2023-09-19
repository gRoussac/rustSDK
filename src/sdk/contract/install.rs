#[cfg(target_arch = "wasm32")]
use crate::deploy::deploy::PutDeployResult;
use crate::types::deploy_params::{
    deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
    payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
    session_str_params::{session_str_params_to_casper_client, SessionStrParams},
};
use crate::{debug::error, types::sdk_error::SdkError, SDK};
use casper_client::{
    cli::make_deploy, rpcs::results::PutDeployResult as _PutDeployResult, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "install")]
    pub async fn install_js_alias(
        &self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_amount: &str,
        node_address: Option<String>,
    ) -> Result<PutDeployResult, JsError> {
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let result = self
            .install(deploy_params, session_params, payment_params, node_address)
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
}

impl SDK {
    pub async fn install(
        &self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_PutDeployResult>, SdkError> {
        //log("install!");
        let deploy = make_deploy(
            "",
            deploy_str_params_to_casper_client(&deploy_params),
            session_str_params_to_casper_client(&session_params),
            payment_str_params_to_casper_client(&payment_params),
            false,
        );
        if let Err(err) = deploy {
            let err_msg = format!("Error during install: {}", err);
            error(&err_msg);
            return Err(SdkError::from(err));
        }
        self.put_deploy(deploy.unwrap().into(), None, node_address)
            .await
            .map_err(SdkError::from)
    }
}
