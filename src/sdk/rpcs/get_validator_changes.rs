#[cfg(target_arch = "wasm32")]
use crate::debug::error;
use crate::{types::verbosity::Verbosity, SDK};
use casper_client::{
    get_validator_changes, rpcs::results::GetValidatorChangesResult as _GetValidatorChangesResult,
    Error, JsonRpcId, SuccessResponse,
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
pub struct GetValidatorChangesResult(_GetValidatorChangesResult);

#[cfg(target_arch = "wasm32")]
impl From<GetValidatorChangesResult> for _GetValidatorChangesResult {
    fn from(result: GetValidatorChangesResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetValidatorChangesResult> for GetValidatorChangesResult {
    fn from(result: _GetValidatorChangesResult) -> Self {
        GetValidatorChangesResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetValidatorChangesResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn changes(&self) -> JsValue {
        JsValue::from_serde(&self.0.changes).unwrap()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_validator_changes")]
    pub async fn get_validator_changes_js_alias(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<GetValidatorChangesResult, JsError> {
        let result = self.get_validator_changes(verbosity, node_address).await;
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
    pub async fn get_validator_changes(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetValidatorChangesResult>, Error> {
        //log("get_validator_changes!");
        get_validator_changes(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            &self.get_node_address(node_address),
            self.get_verbosity(verbosity).into(),
        )
        .await
    }
}
