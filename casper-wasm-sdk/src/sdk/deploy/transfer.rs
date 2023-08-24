#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;

use crate::{
    debug::{error, log},
    types::{
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
        },
        sdk_error::SdkError,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{cli::make_transfer, rpcs::results::PutDeployResult, SuccessResponse};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "transfer")]
    pub async fn transfer_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
        amount: &str,
        target_account: &str,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
    ) -> JsValue {
        serialize_result(
            self.transfer(
                node_address,
                amount,
                target_account,
                deploy_params,
                payment_params,
                verbosity,
            )
            .await,
        )
    }
}

impl SDK {
    pub async fn transfer(
        &mut self,
        node_address: &str,
        amount: &str,
        target_account: &str,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<PutDeployResult>, SdkError> {
        log("transfer!");
        let deploy = make_transfer(
            "",
            amount,
            target_account,
            &rand::thread_rng().gen::<u64>().to_string(),
            deploy_str_params_to_casper_client(&deploy_params),
            payment_str_params_to_casper_client(&payment_params),
            false,
        );

        if let Err(err) = deploy {
            let err_msg = format!("Error during transfer: {}", err);
            error(&err_msg);
            return Err(SdkError::from(err));
        }

        self.put_deploy(node_address, deploy.unwrap(), verbosity)
            .await
            .map_err(SdkError::from)
    }
}
