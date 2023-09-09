#[cfg(target_arch = "wasm32")]
use crate::rpcs::speculative_exec::SpeculativeExecResult;
#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
use crate::{
    debug::error,
    types::{
        block_identifier::BlockIdentifierInput,
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
    cli::make_transfer, rpcs::results::SpeculativeExecResult as _SpeculativeExecResult,
    SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[allow(clippy::too_many_arguments)]
    #[wasm_bindgen(js_name = "speculative_transfer")]
    pub async fn speculative_transfer_js_alias(
        &self,
        node_address: &str,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
        maybe_block_id_as_string: Option<String>,
        maybe_block_identifier: Option<BlockIdentifier>,
        verbosity: Option<Verbosity>,
    ) -> Result<SpeculativeExecResult, JsError> {
        let maybe_block_identifier = if let Some(maybe_block_identifier) = maybe_block_identifier {
            Some(BlockIdentifierInput::BlockIdentifier(
                maybe_block_identifier,
            ))
        } else {
            maybe_block_id_as_string.map(BlockIdentifierInput::String)
        };
        let result = self
            .speculative_transfer(
                node_address,
                amount,
                target_account,
                transfer_id,
                deploy_params,
                payment_params,
                maybe_block_identifier,
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
    pub async fn speculative_transfer(
        &self,
        node_address: &str,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<_SpeculativeExecResult>, SdkError> {
        // log("speculative_transfer!");
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
            let err_msg = format!("Error during speculative_transfer: {}", err);
            error(&err_msg);
            return Err(SdkError::from(err));
        }

        self.speculative_exec(
            node_address,
            deploy.unwrap().into(),
            maybe_block_identifier,
            verbosity,
        )
        .await
        .map_err(SdkError::from)
    }
}
