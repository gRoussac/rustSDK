#[cfg(target_arch = "wasm32")]
use crate::debug::error;
use crate::{types::verbosity::Verbosity, SDK};
use casper_client::{
    list_rpcs, rpcs::results::ListRpcsResult as _ListRpcsResult, Error, JsonRpcId, SuccessResponse,
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
pub struct ListRpcsResult(_ListRpcsResult);

#[cfg(target_arch = "wasm32")]
impl From<ListRpcsResult> for _ListRpcsResult {
    fn from(result: ListRpcsResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_ListRpcsResult> for ListRpcsResult {
    fn from(result: _ListRpcsResult) -> Self {
        ListRpcsResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl ListRpcsResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn name(&self) -> String {
        self.0.name.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn schema(&self) -> JsValue {
        JsValue::from_serde(&self.0.schema).unwrap()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "list_rpcs")]
    pub async fn list_rpcs_js_alias(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<ListRpcsResult, JsError> {
        let result = self.list_rpcs(verbosity, node_address).await;
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
    pub async fn list_rpcs(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_ListRpcsResult>, Error> {
        //log("list_rpcs!");
        list_rpcs(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            &self.get_node_address(node_address),
            self.get_verbosity(verbosity).into(),
        )
        .await
    }
}
