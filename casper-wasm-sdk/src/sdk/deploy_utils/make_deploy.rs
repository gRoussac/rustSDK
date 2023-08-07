use casper_client::cli::{make_deploy, CliError};
use casper_types::Deploy;
use wasm_bindgen::prelude::*;

use crate::{
    helpers::stringify_deploy,
    js::externs::log,
    sdk::SDK,
    types::deploy_params::{
        deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
        payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
        session_str_params::{session_str_params_to_casper_client, SessionStrParams},
    },
};

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub fn make_deploy(
        &mut self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
    ) -> JsValue {
        log("make_deploy!");
        let result: Result<Deploy, CliError> = make_deploy(
            "",
            deploy_str_params_to_casper_client(&(deploy_params)),
            session_str_params_to_casper_client(&(session_params)),
            payment_str_params_to_casper_client(&(payment_params)),
            false,
        );
        stringify_deploy(result)
    }
}
