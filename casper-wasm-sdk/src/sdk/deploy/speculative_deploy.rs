#[cfg(target_arch = "wasm32")]
use crate::rpcs::speculative_exec::SpeculativeExecResult;
use crate::{
    debug::error,
    types::{
        block_identifier::{BlockIdentifier, BlockIdentifierInput},
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
    cli::make_deploy, rpcs::results::SpeculativeExecResult as _SpeculativeExecResult,
    SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "speculative_deploy")]
    pub async fn speculative_deploy_js_alias(
        &self,
        node_address: &str,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
        maybe_block_identifier: Option<BlockIdentifier>,
        verbosity: Option<Verbosity>,
    ) -> Result<SpeculativeExecResult, JsError> {
        let result = self
            .speculative_deploy(
                node_address,
                deploy_params,
                session_params,
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
    pub async fn speculative_deploy(
        &self,
        node_address: &str,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
        maybe_block_identifier: Option<BlockIdentifier>,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<_SpeculativeExecResult>, SdkError> {
        // log("speculative_deploy!");
        let deploy = make_deploy(
            "",
            deploy_str_params_to_casper_client(&deploy_params),
            session_str_params_to_casper_client(&session_params),
            payment_str_params_to_casper_client(&payment_params),
            false,
        );

        if let Err(err) = deploy {
            let err_msg = format!("Error during speculative_deploy: {}", err);
            error(&err_msg);
            return Err(SdkError::from(err));
        }

        let maybe_block_identifier =
            maybe_block_identifier.map(BlockIdentifierInput::BlockIdentifier);

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
