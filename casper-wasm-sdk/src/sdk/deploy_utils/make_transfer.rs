#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    types::deploy_params::{
        deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
        payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
    },
    SDK,
};
use casper_client::cli::{make_transfer as client_make_transfer, CliError};
use casper_types::Deploy;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "make_transfer")]
    pub fn make_transfer_js_alias(
        &mut self,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
    ) -> JsValue {
        // log("make_transfer");
        let deploy = self.make_transfer(
            amount,
            target_account,
            transfer_id,
            deploy_params,
            payment_params,
        );
        serialize_result(deploy)
    }
}

impl SDK {
    pub fn make_transfer(
        &mut self,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
    ) -> Result<Deploy, CliError> {
        // log("make_transfer");
        make_transfer(
            amount,
            target_account,
            transfer_id,
            deploy_params,
            payment_params,
        )
    }
}

pub(crate) fn make_transfer(
    amount: &str,
    target_account: &str,
    transfer_id: Option<String>,
    deploy_params: DeployStrParams,
    payment_params: PaymentStrParams,
) -> Result<Deploy, CliError> {
    let transfer_id = if let Some(transfer_id) = transfer_id {
        transfer_id
    } else {
        rand::thread_rng().gen::<u64>().to_string()
    };
    client_make_transfer(
        "",
        amount,
        target_account,
        &transfer_id,
        deploy_str_params_to_casper_client(&deploy_params),
        payment_str_params_to_casper_client(&payment_params),
        false,
    )
}
