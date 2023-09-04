#[cfg(target_arch = "wasm32")]
use crate::types::deploy::Deploy;
#[cfg(target_arch = "wasm32")]
use crate::types::deploy_hash::DeployHash;
#[cfg(target_arch = "wasm32")]
use crate::{debug::error, types::digest::Digest};
use crate::{helpers::get_verbosity_or_default, types::verbosity::Verbosity, SDK};
use casper_client::{
    get_deploy, rpcs::results::GetDeployResult as _GetDeployResult, Error, JsonRpcId,
    SuccessResponse,
};
use casper_types::DeployHash as _DeployHash;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetDeployResult(_GetDeployResult);

#[cfg(target_arch = "wasm32")]
impl From<GetDeployResult> for _GetDeployResult {
    fn from(result: GetDeployResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetDeployResult> for GetDeployResult {
    fn from(result: _GetDeployResult) -> Self {
        GetDeployResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetDeployResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn deploy(&self) -> Deploy {
        self.0.deploy.clone().into()
    }

    #[wasm_bindgen(getter)]
    pub fn execution_info(&self) -> JsValue {
        JsValue::from_serde(&self.0.execution_info).unwrap()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getDeployOptions", getter_with_clone)]
pub struct GetDeployOptions {
    pub node_address: String,
    pub deploy_hash_as_string: Option<String>,
    pub deploy_hash: Option<DeployHash>,
    pub finalized_approvals: Option<bool>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_deploy_options")]
    pub fn get_deploy_options(&self, options: JsValue) -> GetDeployOptions {
        let options_result = options.into_serde::<GetDeployOptions>();
        match options_result {
            Ok(mut options) => {
                if let Some(finalized_approvals) = options.finalized_approvals {
                    options.finalized_approvals =
                        Some(JsValue::from_bool(finalized_approvals) == JsValue::TRUE);
                }
                options
            }
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                GetDeployOptions::default()
            }
        }
    }

    #[wasm_bindgen(js_name = "get_deploy")]
    pub async fn get_deploy_js_alias(
        &self,
        options: GetDeployOptions,
    ) -> Result<GetDeployResult, JsError> {
        let GetDeployOptions {
            node_address,
            deploy_hash_as_string,
            deploy_hash,
            finalized_approvals,
            verbosity,
        } = options;
        let err_msg = "Error: Missing deploy hash as string or deploy hash".to_string();
        let deploy_hash = if let Some(deploy_hash_as_string) = deploy_hash_as_string {
            let hash = Digest::new(&deploy_hash_as_string);
            if let Err(err) = hash {
                let err_msg = format!("Failed to parse AccountHash from formatted string: {}", err);
                error(&err_msg);
                return Err(JsError::new(&err_msg));
            }
            let deploy_hash = DeployHash::from_digest(hash.unwrap());
            if deploy_hash.is_err() {
                error(&err_msg);
                return Err(JsError::new(&err_msg));
            }
            deploy_hash.unwrap()
        } else {
            if deploy_hash.is_none() {
                error(&err_msg);
                return Err(JsError::new(&err_msg));
            }
            deploy_hash.unwrap()
        };

        let result = self
            .get_deploy(&node_address, deploy_hash, finalized_approvals, verbosity)
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

    #[wasm_bindgen(js_name = "info_get_deploy")]
    pub async fn info_get_deploy_js_alias(
        &self,
        options: GetDeployOptions,
    ) -> Result<GetDeployResult, JsError> {
        self.get_deploy_js_alias(options).await
    }
}

impl SDK {
    pub async fn get_deploy(
        &self,
        node_address: &str,
        deploy_hash: _DeployHash,
        finalized_approvals: Option<bool>,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<_GetDeployResult>, Error> {
        //log("get_deploy!");
        get_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            get_verbosity_or_default(verbosity).into(),
            deploy_hash,
            finalized_approvals.unwrap_or_default(),
        )
        .await
    }
}
