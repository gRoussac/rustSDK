#[cfg(target_arch = "wasm32")]
use super::deploy::PutDeployResult;
use crate::{
    debug::error,
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
use casper_client::{
    cli::make_transfer, rpcs::results::PutDeployResult as _PutDeployResult, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "transfer")]
    #[allow(clippy::too_many_arguments)]
    pub async fn transfer_js_alias(
        &self,
        node_address: &str,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
        verbosity: Option<Verbosity>,
    ) -> Result<PutDeployResult, JsError> {
        let result = self
            .transfer(
                node_address,
                amount,
                target_account,
                transfer_id,
                deploy_params,
                payment_params,
                verbosity,
            )
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred: {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }
}

impl SDK {
    #[allow(clippy::too_many_arguments)]
    pub async fn transfer(
        &self,
        node_address: &str,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<_PutDeployResult>, SdkError> {
        //log("transfer!");
        let transfer_id = if let Some(transfer_id) = transfer_id {
            transfer_id
        } else {
            rand::thread_rng().gen::<u64>().to_string()
        };
        let deploy = make_transfer(
            "",
            amount,
            target_account,
            &transfer_id,
            deploy_str_params_to_casper_client(&deploy_params),
            payment_str_params_to_casper_client(&payment_params),
            false,
        );

        if let Err(err) = deploy {
            let err_msg = format!("Error during transfer: {}", err);
            error(&err_msg);
            return Err(SdkError::from(err));
        }

        self.put_deploy(node_address, deploy.unwrap().into(), verbosity)
            .await
            .map_err(SdkError::from)
    }
}
