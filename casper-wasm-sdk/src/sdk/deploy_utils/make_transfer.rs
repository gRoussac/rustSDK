use crate::{
    helpers::serialize_result,
    sdk::SDK,
    types::deploy_params::{
        deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
        payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
    },
};
use casper_client::cli::{make_transfer, CliError};
use casper_types::Deploy;
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub fn make_transfer(
        &mut self,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
    ) -> JsValue {
        // log("make_transfer");
        let transfer_id = if let Some(transfer_id) = transfer_id {
            transfer_id
        } else {
            rand::thread_rng().gen::<u64>().to_string()
        };
        let result: Result<Deploy, CliError> = make_transfer(
            "",
            amount,
            target_account,
            &transfer_id,
            deploy_str_params_to_casper_client(&deploy_params),
            payment_str_params_to_casper_client(&payment_params),
            false,
        );

        serialize_result(result)
    }
}
