#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    debug::{error, log},
    types::{
        block_identifier::{BlockIdentifier, BlockIdentifierInput},
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
        maybe_block_identifier: Option<BlockIdentifier>,
        node_address: &str,
        verbosity: Option<Verbosity>,
        amount: &str,
        target_account: &str,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
    ) -> JsValue {
        serialize_result(
            self.speculative_transfer(
                node_address,
                amount,
                target_account,
                deploy_params,
                payment_params,
                maybe_block_identifier,
                verbosity,
            )
            .await,
        )
    }
}

impl SDK {
    #[allow(clippy::too_many_arguments)]
    pub async fn speculative_transfer(
        &mut self,
        node_address: &str,
        amount: &str,
        target_account: &str,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
        maybe_block_identifier: Option<BlockIdentifier>,
        verbosity: Option<Verbosity>,
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

        let maybe_block_identifier =
            maybe_block_identifier.map(BlockIdentifierInput::BlockIdentifier);

        self.speculative_exec(
            node_address,
            deploy.unwrap(),
            maybe_block_identifier,
            verbosity,
        )
        .await
        .map_err(SdkError::from)
    }
}
