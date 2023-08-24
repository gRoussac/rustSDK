use casper_client::{
    cli::{
        make_deploy, DeployStrParams as _DeployStrParams, PaymentStrParams as _PaymentStrParams,
        SessionStrParams as _SessionStrParams,
    },
    rpcs::results::PutDeployResult,
    SuccessResponse,
};
use js_sys::Uint8Array;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

use crate::{
    debug::{error, log},
    sign_deploy::serialize_result,
    types::{
        cl::bytes::Bytes,
        deploy::{BuildParams, Deploy},
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
            session_str_params::{session_str_params_to_casper_client, SessionStrParams},
        },
        sdk_error::SdkError,
    },
    SDK,
};

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "install")]
    pub async fn install_js_alias(
        &mut self,
        node_address: &str,
        deploy_params: DeployStrParams,
        payment_amount: &str,
        wasm: Uint8Array,
    ) -> JsValue {
        let session_params = SessionStrParams::default();
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let wasm_vec: Vec<u8> = wasm.to_vec();
        let wasm_bytes = Bytes::from(wasm_vec);
        serialize_result(
            self.install(
                node_address,
                deploy_str_params_to_casper_client(&deploy_params),
                session_str_params_to_casper_client(&session_params),
                payment_str_params_to_casper_client(&payment_params),
                wasm_bytes,
                deploy_params.secret_key(),
            )
            .await,
        )
    }
}

impl SDK {
    pub async fn install(
        &mut self,
        node_address: &str,
        deploy_params: _DeployStrParams<'_>,
        session_params: _SessionStrParams<'_>,
        payment_params: _PaymentStrParams<'_>,
        wasm: Bytes,
        secret_key: Option<std::string::String>,
    ) -> Result<SuccessResponse<PutDeployResult>, SdkError> {
        log("install!");
        let deploy = make_deploy("", deploy_params, session_params, payment_params, false);

        if let Err(err) = deploy {
            let err_msg = format!("Error during install: {}", err);
            error(&err_msg);
            return Err(SdkError::from(err));
        }

        let deploy: Deploy = deploy.unwrap().into();
        let build_params = BuildParams::default();
        deploy.build(build_params);
        deploy.with_module_bytes(wasm, secret_key);

        self.put_deploy(node_address, deploy.into(), None)
            .await
            .map_err(SdkError::from)
    }
}
