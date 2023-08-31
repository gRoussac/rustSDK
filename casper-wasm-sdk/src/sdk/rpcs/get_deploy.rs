#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
#[cfg(target_arch = "wasm32")]
use crate::{debug::error, types::digest::Digest};
use crate::{
    helpers::get_verbosity_or_default,
    types::{deploy_hash::DeployHash, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    get_deploy, rpcs::results::GetDeployResult, Error, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

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
    pub async fn get_deploy_js_alias(&mut self, options: GetDeployOptions) -> JsValue {
        let GetDeployOptions {
            node_address,
            deploy_hash_as_string,
            deploy_hash,
            finalized_approvals,
            verbosity,
        } = options;
        let err_msg = "Error: Missing deploy hash as string or deploy hash".to_string();
        let deploy_hash = if let Some(deploy_hash_as_string) = deploy_hash_as_string {
            let hash = Digest::new(&deploy_hash_as_string).map_err(|err| {
                let err_msg = format!("Failed to parse AccountHash from formatted string: {}", err);
                error(&err_msg);
                JsValue::null()
            });
            let deploy_hash = DeployHash::from_digest(hash.unwrap());
            if deploy_hash.is_err() {
                error(&err_msg);
                return JsValue::null();
            }
            deploy_hash.unwrap()
        } else {
            if deploy_hash.is_none() {
                error(&err_msg);
                return JsValue::null();
            }
            deploy_hash.unwrap()
        };
        serialize_result(
            self.get_deploy(&node_address, deploy_hash, finalized_approvals, verbosity)
                .await,
        )
    }

    #[wasm_bindgen(js_name = "info_get_deploy")]
    pub async fn info_get_deploy_js_alias(&mut self, options: GetDeployOptions) -> JsValue {
        self.get_deploy_js_alias(options).await
    }
}

impl SDK {
    pub async fn get_deploy(
        &mut self,
        node_address: &str,
        deploy_hash: DeployHash,
        finalized_approvals: Option<bool>,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<GetDeployResult>, Error> {
        //log("get_deploy!");
        get_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            get_verbosity_or_default(verbosity).into(),
            deploy_hash.into(),
            finalized_approvals.unwrap_or_default(),
        )
        .await
    }
}
