#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    debug::{error, log},
    types::{
        block_identifier::BlockIdentifier,
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
        },
        sdk_error::SdkError,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{cli::make_transfer, rpcs::results::SpeculativeExecResult, SuccessResponse};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[allow(clippy::too_many_arguments)]
    #[wasm_bindgen(js_name = "speculative_transfer")]
    pub async fn speculative_transfer_js_alias(
        &mut self,
        maybe_block_id: Option<BlockIdentifier>,
        node_address: &str,
        verbosity: Verbosity,
        amount: &str,
        target_account: &str,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
    ) -> JsValue {
        serialize_result(
            self.speculative_transfer(
                maybe_block_id,
                node_address,
                verbosity,
                amount,
                target_account,
                deploy_params,
                payment_params,
            )
            .await,
        )
    }
}

impl SDK {
    #[allow(clippy::too_many_arguments)]
    pub async fn speculative_transfer(
        &mut self,
        maybe_block_id: Option<BlockIdentifier>,
        node_address: &str,
        verbosity: Verbosity,
        amount: &str,
        target_account: &str,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
    ) -> Result<SuccessResponse<SpeculativeExecResult>, SdkError> {
        log("speculative_transfer!");
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
            let err_msg = format!("Error during speculative_transfer: {}", err);
            error(&err_msg);
            return Err(SdkError::from(err));
        }

        self.speculative_exec(
            node_address,
            maybe_block_id,
            verbosity,
            deploy.unwrap().into(),
        )
        .await
        .map_err(SdkError::from)
    }
}
