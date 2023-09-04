#[cfg(target_arch = "wasm32")]
use crate::debug::error;
use crate::{helpers::get_verbosity_or_default, types::verbosity::Verbosity, SDK};
use casper_client::{
    get_chainspec, rpcs::results::GetChainspecResult as _GetChainspecResult, Error, JsonRpcId,
    SuccessResponse,
};
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
pub struct GetChainspecResult(_GetChainspecResult);

#[cfg(target_arch = "wasm32")]
impl From<GetChainspecResult> for _GetChainspecResult {
    fn from(result: GetChainspecResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetChainspecResult> for GetChainspecResult {
    fn from(result: _GetChainspecResult) -> Self {
        GetChainspecResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetChainspecResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn chainspec_bytes(&self) -> JsValue {
        JsValue::from_serde(&self.0.chainspec_bytes).unwrap()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_chainspec")]
    pub async fn get_chainspec_js_alias(
        &self,
        node_address: &str,
        verbosity: Option<Verbosity>,
    ) -> Result<GetChainspecResult, JsError> {
        let result = self.get_chainspec(node_address, verbosity).await;
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
    pub async fn get_chainspec(
        &self,
        node_address: &str,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<_GetChainspecResult>, Error> {
        //log("get_chainspec!");
        get_chainspec(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            get_verbosity_or_default(verbosity).into(),
        )
        .await
    }
}
