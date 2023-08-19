#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    debug::{error, log},
    types::{
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
            session_str_params::{session_str_params_to_casper_client, SessionStrParams},
        },
        sdk_error::SdkError,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    cli::{make_deploy, CliError},
    rpcs::results::PutDeployResult,
    SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "deploy")]
    pub async fn deploy_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
    ) -> JsValue {
        serialize_result(
            self.deploy(
                node_address,
                verbosity,
                deploy_params,
                session_params,
                payment_params,
            )
            .await,
        )
    }
}

impl SDK {
    pub async fn deploy(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
    ) -> Result<SuccessResponse<PutDeployResult>, SdkError> {
        log("deploy!");
        let deploy = make_deploy(
            "",
            deploy_str_params_to_casper_client(&deploy_params),
            session_str_params_to_casper_client(&session_params),
            payment_str_params_to_casper_client(&payment_params),
            false,
        );

        if let Err(err) = deploy {
            let err_msg = format!("Error during deploy: {}", err);
            error(&err_msg);
            return Err(SdkError::from(err));
        }

        self.put_deploy(node_address, verbosity, deploy.unwrap().into())
            .await
            .map_err(SdkError::from)
    }
}
