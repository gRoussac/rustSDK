#[cfg(target_arch = "wasm32")]
use crate::debug::error;
use crate::{types::verbosity::Verbosity, SDK};
use casper_client::{
    get_peers, rpcs::results::GetPeersResult as _GetPeersResult, Error, JsonRpcId, SuccessResponse,
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
pub struct GetPeersResult(_GetPeersResult);

#[cfg(target_arch = "wasm32")]
impl From<GetPeersResult> for _GetPeersResult {
    fn from(result: GetPeersResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetPeersResult> for GetPeersResult {
    fn from(result: _GetPeersResult) -> Self {
        GetPeersResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetPeersResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn peers(&self) -> JsValue {
        JsValue::from_serde(&self.0.peers).unwrap()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_peers")]
    pub async fn get_peers_js_alias(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<GetPeersResult, JsError> {
        let result = self.get_peers(verbosity, node_address).await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }
}

impl SDK {
    pub async fn get_peers(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetPeersResult>, Error> {
        //log("get_peers!");
        get_peers(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            &self.get_node_address(node_address),
            self.get_verbosity(verbosity).into(),
        )
        .await
    }
}
