use crate::{
    helpers::serialize_result,
    js::externs::log,
    sdk::SDK,
    types::{
        deploy::Deploy,
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
        },
    },
};
use casper_client::cli::{make_transfer, CliError};
use casper_types::Deploy as _Deploy;
use rand::Rng;
use wasm_bindgen::{describe::U64, prelude::*};

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
        log("make_transfer!");
        let transfer_id = if let Some(transfer_id) = transfer_id {
            transfer_id
        } else {
            rand::thread_rng().gen::<u64>().to_string()
        };
        log(&format!("transfer_id {:?}", transfer_id));
        let result: Result<_Deploy, CliError> = make_transfer(
            "",
            amount,
            target_account,
            &transfer_id,
            deploy_str_params_to_casper_client(&deploy_params),
            payment_str_params_to_casper_client(&payment_params),
            false,
        );

        // Map the result to our custom Deploy type to Serialize Transfer "id" into string
        let mapped_result: Result<Deploy, CliError> = result.map(Deploy::from);
        let value = serialize_result(mapped_result);
        log(&format!("{:?}", value));
        // let test = Deploy::new(value.clone());
        // log(&format!("testtesttest{:?}", test));

        value
        //JsValue::null()
    }
}
