#[cfg(target_arch = "wasm32")]
use crate::{
    debug::error,
    types::{digest::Digest, public_key::PublicKey},
};
use crate::{helpers::get_verbosity_or_default, types::verbosity::Verbosity, SDK};
use casper_client::{
    get_node_status, rpcs::results::GetNodeStatusResult as _GetNodeStatusResult, Error, JsonRpcId,
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
pub struct GetNodeStatusResult(_GetNodeStatusResult);

#[cfg(target_arch = "wasm32")]
impl From<GetNodeStatusResult> for _GetNodeStatusResult {
    fn from(result: GetNodeStatusResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetNodeStatusResult> for GetNodeStatusResult {
    fn from(result: _GetNodeStatusResult) -> Self {
        GetNodeStatusResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetNodeStatusResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn chainspec_name(&self) -> String {
        self.0.chainspec_name.clone()
    }

    #[allow(deprecated)]
    #[wasm_bindgen(getter)]
    pub fn starting_state_root_hash(&self) -> Digest {
        self.0.starting_state_root_hash.into()
    }

    #[wasm_bindgen(getter)]
    pub fn peers(&self) -> JsValue {
        JsValue::from_serde(&self.0.peers).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn last_added_block_info(&self) -> JsValue {
        JsValue::from_serde(&self.0.last_added_block_info).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn our_public_signing_key(&self) -> Option<PublicKey> {
        self.0.our_public_signing_key.clone().map(Into::into)
    }

    #[wasm_bindgen(getter)]
    pub fn round_length(&self) -> JsValue {
        JsValue::from_serde(&self.0.round_length).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn next_upgrade(&self) -> JsValue {
        JsValue::from_serde(&self.0.next_upgrade).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn build_version(&self) -> String {
        self.0.build_version.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn uptime(&self) -> JsValue {
        JsValue::from_serde(&self.0.uptime).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn reactor_state(&self) -> JsValue {
        JsValue::from_serde(&self.0.reactor_state).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn last_progress(&self) -> JsValue {
        JsValue::from_serde(&self.0.last_progress).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn available_block_range(&self) -> JsValue {
        JsValue::from_serde(&self.0.available_block_range).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn block_sync(&self) -> JsValue {
        JsValue::from_serde(&self.0.block_sync).unwrap()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_node_status")]
    pub async fn get_node_status_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
    ) -> Result<GetNodeStatusResult, JsError> {
        let result = self.get_node_status(node_address, verbosity).await;
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
    pub async fn get_node_status(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<_GetNodeStatusResult>, Error> {
        //log("get_node_status!");
        get_node_status(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            get_verbosity_or_default(verbosity).into(),
        )
        .await
    }
}
