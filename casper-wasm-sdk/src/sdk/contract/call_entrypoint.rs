use crate::{
    debug::{error, log},
    types::{
        deploy::{BuildParams, Deploy},
        sdk_error::SdkError,
    },
    SDK,
};
#[cfg(target_arch = "wasm32")]
use crate::{
    helpers::serialize_result,
    types::deploy_params::{
        deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
        payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
        session_str_params::{session_str_params_to_casper_client, SessionStrParams},
    },
};
use casper_client::{
    cli::{
        make_deploy, DeployStrParams as _DeployStrParams, PaymentStrParams as _PaymentStrParams,
        SessionStrParams as _SessionStrParams,
    },
    rpcs::results::PutDeployResult,
    SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "call_entrypoint")]
    pub async fn call_entrypoint_js_alias(
        &mut self,
        node_address: &str,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_amount: &str,
    ) -> JsValue {
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        log(&format!("deploy_params {:?}", deploy_params));
        log(&format!("session_params {:?}", session_params));
        log(&format!("payment_params {:?}", payment_params));
        // let wasm_vec: Vec<u8> = wasm.to_vec();
        // let wasm_bytes = Bytes::from(wasm_vec);
        serialize_result(
            self.call_entrypoint(
                node_address,
                deploy_str_params_to_casper_client(&deploy_params),
                session_str_params_to_casper_client(&session_params),
                payment_str_params_to_casper_client(&payment_params),
                deploy_params.secret_key(),
            )
            .await,
        )
    }
}

impl SDK {
    pub async fn call_entrypoint(
        &mut self,
        node_address: &str,
        deploy_params: _DeployStrParams<'_>,
        session_params: _SessionStrParams<'_>,
        payment_params: _PaymentStrParams<'_>,
        secret_key: Option<std::string::String>,
    ) -> Result<SuccessResponse<PutDeployResult>, SdkError> {
        log("call_entrypoint!");
        let deploy = make_deploy("", deploy_params, session_params, payment_params, false);

        if let Err(err) = deploy {
            let err_msg = format!("Error during install: {}", err);
            error(&err_msg);
            return Err(SdkError::from(err));
        }

        let mut deploy: Deploy = deploy.unwrap().into();
        let build_params = BuildParams::default();
        deploy.build(build_params);
        if let Some(secret_key) = secret_key {
            deploy = deploy.sign(&secret_key);
        }

        self.put_deploy(node_address, deploy.into(), None)
            .await
            .map_err(SdkError::from)
    }
}
