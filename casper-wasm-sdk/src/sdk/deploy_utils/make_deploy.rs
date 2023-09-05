#[cfg(target_arch = "wasm32")]
use super::sign_deploy::Deploy;
#[cfg(target_arch = "wasm32")]
use crate::debug::error;
use crate::{
    types::{
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
            session_str_params::{session_str_params_to_casper_client, SessionStrParams},
        },
        sdk_error::SdkError,
    },
    SDK,
};
use casper_client::cli::make_deploy as client_make_deploy;
use casper_types::Deploy as _Deploy;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "make_deploy")]
    pub fn make_deploy_js_alias(
        &self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
    ) -> Result<Deploy, JsError> {
        let result = make_deploy(deploy_params, session_params, payment_params);
        match result {
            Ok(data) => Ok(data.into()),
            Err(err) => {
                let err = &format!("Error occurred: {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }
}

impl SDK {
    pub fn make_deploy(
        &self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
    ) -> Result<_Deploy, SdkError> {
        make_deploy(deploy_params, session_params, payment_params).map_err(SdkError::from)
    }
}

pub(crate) fn make_deploy(
    deploy_params: DeployStrParams,
    session_params: SessionStrParams,
    payment_params: PaymentStrParams,
) -> Result<_Deploy, SdkError> {
    // log("make_deploy");
    client_make_deploy(
        "",
        deploy_str_params_to_casper_client(&deploy_params),
        session_str_params_to_casper_client(&session_params),
        payment_str_params_to_casper_client(&payment_params),
        false,
    )
    .map_err(SdkError::from)
}
