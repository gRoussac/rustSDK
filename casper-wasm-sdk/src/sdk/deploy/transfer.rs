#[cfg(target_arch = "wasm32")]
use crate::{
    debug::{error, log},
    helpers::serialize_result,
    types::{
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
    #[wasm_bindgen]
    pub async fn transfer(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        amount: &str,
        target_account: &str,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
    ) -> JsValue {
        log("transfer!");
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
                self.put_deploy(node_address, verbosity, deploy.into())
                    .await,
            ),
            Err(err) => {
                error(&format!("Error during transfer: {}", err));
                JsValue::null()
            }
        }
    }
}
