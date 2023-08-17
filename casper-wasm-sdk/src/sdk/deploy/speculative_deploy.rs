#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
#[cfg(target_arch = "wasm32")]
use crate::{
    debug::{error, log},
    helpers::serialize_result,
    types::{
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
            session_str_params::{session_str_params_to_casper_client, SessionStrParams},
        },
        verbosity::Verbosity,
    },
    SDK,
};
#[cfg(target_arch = "wasm32")]
use casper_client::cli::make_deploy;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    pub async fn speculative_deploy(
        &mut self,
        maybe_block_id: Option<BlockIdentifier>,
        node_address: &str,
        verbosity: Verbosity,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
    ) -> JsValue {
        log("speculative_deploy!");
        match make_deploy(
            "",
            deploy_str_params_to_casper_client(&deploy_params),
            session_str_params_to_casper_client(&session_params),
            payment_str_params_to_casper_client(&payment_params),
            false,
        ) {
            Ok(deploy) => serialize_result(
                self.speculative_exec(node_address, maybe_block_id, verbosity, deploy.into())
                    .await,
            ),
            Err(err) => {
                error(&format!("Error during speculative_deploy: {}", err));
                JsValue::null()
            }
        }
    }
}
