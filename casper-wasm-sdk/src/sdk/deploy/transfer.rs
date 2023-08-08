use crate::{
    js::externs::log,
    sdk::SDK,
    types::{
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
        },
        verbosity::Verbosity,
    },
};
use casper_client::cli::make_transfer;
use rand::Rng;
use wasm_bindgen::prelude::*;

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
            Ok(deploy) => {
                self.put_deploy(node_address, verbosity, deploy.into())
                    .await
            }
            Err(error) => {
                // Handle the error, log it, and return an error JsValue if desired
                log(&format!("Error during transfer: {}", error));
                // For example, return an error JsValue:
                JsValue::from_str(&format!("Error: {}", error))
            }
        }
    }
}
