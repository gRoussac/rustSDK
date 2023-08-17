#[cfg(target_arch = "wasm32")]
#[cfg(target_arch = "wasm32")]
use crate::{
    debug::{error, log},
    helpers::serialize_result,
    types::{
        block_identifier::BlockIdentifier,
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
        },
        verbosity::Verbosity,
    },
    SDK,
};
#[cfg(target_arch = "wasm32")]
use casper_client::cli::make_transfer;
#[cfg(target_arch = "wasm32")]
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[allow(clippy::too_many_arguments)]
    #[wasm_bindgen]
    pub async fn speculative_transfer(
        &mut self,
        maybe_block_id: Option<BlockIdentifier>,
        node_address: &str,
        verbosity: Verbosity,
        amount: &str,
        target_account: &str,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
    ) -> JsValue {
        log("speculative_transfer!");
        match make_transfer(
            "",
            amount,
            target_account,
            &rand::thread_rng().gen::<u64>().to_string(),
            deploy_str_params_to_casper_client(&deploy_params),
            payment_str_params_to_casper_client(&payment_params),
            false,
        ) {
            Ok(deploy) => serialize_result(
                self.speculative_exec(node_address, maybe_block_id, verbosity, deploy.into())
                    .await,
            ),
            Err(err) => {
                error(&format!("Error during speculative_transfer: {}", err));
                JsValue::null()
            }
        }
    }
}
