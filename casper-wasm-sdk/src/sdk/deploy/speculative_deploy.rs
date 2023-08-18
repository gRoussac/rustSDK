#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    debug::{error, log},
    types::{
        block_identifier::BlockIdentifier,
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
            session_str_params::{session_str_params_to_casper_client, SessionStrParams},
        },
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    cli::{make_deploy, CliError},
    rpcs::results::SpeculativeExecResult,
    SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "speculative_deploy")]
    pub async fn speculative_deploy_js_alias(
        &mut self,
        maybe_block_id: Option<BlockIdentifier>,
        node_address: &str,
        verbosity: Verbosity,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
    ) -> JsValue {
        serialize_result(
            self.speculative_deploy(
                maybe_block_id,
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
    pub async fn speculative_deploy(
        &mut self,
        maybe_block_id: Option<BlockIdentifier>,
        node_address: &str,
        verbosity: Verbosity,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
    ) -> Result<SuccessResponse<SpeculativeExecResult>, CliError> {
        log("speculative_deploy!");
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
            return Err(err);
        }

        self.speculative_exec(
            node_address,
            maybe_block_id,
            verbosity,
            deploy.unwrap().into(),
        )
        .await
        .map_err(CliError::Core)
    }
}
