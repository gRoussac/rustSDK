#[cfg(target_arch = "wasm32")]
use crate::types::deploy_hash::DeployHash;
use crate::{
    debug::error,
    types::{
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
            session_str_params::{session_str_params_to_casper_client, SessionStrParams},
        },
        sdk_error::SdkError,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    cli::make_deploy, rpcs::results::PutDeployResult as _PutDeployResult, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct PutDeployResult(_PutDeployResult);

#[cfg(target_arch = "wasm32")]
impl From<PutDeployResult> for _PutDeployResult {
    fn from(result: PutDeployResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_PutDeployResult> for PutDeployResult {
    fn from(result: _PutDeployResult) -> Self {
        PutDeployResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl PutDeployResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn deploy_hash(&self) -> DeployHash {
        self.0.deploy_hash.into()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "deploy")]
    pub async fn deploy_js_alias(
        &mut self,
        node_address: &str,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
        verbosity: Option<Verbosity>,
    ) -> Result<PutDeployResult, JsError> {
        let result = self
            .deploy(
                node_address,
                deploy_params,
                session_params,
                payment_params,
                verbosity,
            )
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred: {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }
}

impl SDK {
    pub async fn deploy(
        &mut self,
        node_address: &str,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<_PutDeployResult>, SdkError> {
        //log("deploy!");
        let deploy = make_deploy(
            "",
            deploy_str_params_to_casper_client(&deploy_params),
            session_str_params_to_casper_client(&session_params),
            payment_str_params_to_casper_client(&payment_params),
            false,
        );

        if let Err(err) = deploy {
            let err_msg = format!("Error during deploy: {}", err);
            error(&err_msg);
            return Err(SdkError::from(err));
        }

        self.put_deploy(node_address, deploy.unwrap().into(), verbosity)
            .await
            .map_err(SdkError::from)
    }
}
