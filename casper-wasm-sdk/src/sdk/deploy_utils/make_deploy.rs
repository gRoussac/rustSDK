use crate::types::deploy_params::{
    deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
    payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
    session_str_params::{session_str_params_to_casper_client, SessionStrParams},
};
#[cfg(target_arch = "wasm32")]
use crate::{helpers::serialize_result, SDK};
use casper_client::cli::{make_deploy as client_make_deploy, CliError};
use casper_types::Deploy;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "make_deploy")]
    pub fn make_deploy_js_alias(
        &mut self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
    ) -> JsValue {
        let deploy = make_deploy(deploy_params, session_params, payment_params);
        serialize_result(deploy)
    }
}

pub(crate) fn make_deploy(
    deploy_params: DeployStrParams,
    session_params: SessionStrParams,
    payment_params: PaymentStrParams,
) -> Result<Deploy, CliError> {
    // log("make_deploy");
    client_make_deploy(
        "",
        deploy_str_params_to_casper_client(&deploy_params),
        session_str_params_to_casper_client(&session_params),
        payment_str_params_to_casper_client(&payment_params),
        false,
    )
}
