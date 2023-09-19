#[cfg(target_arch = "wasm32")]
use crate::debug::error;
#[cfg(target_arch = "wasm32")]
use crate::types::digest::Digest;
use crate::{
    types::{digest::ToDigest, sdk_error::SdkError, uref::URef, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    cli::get_balance as get_balance_cli, get_balance as get_balance_lib,
    rpcs::results::GetBalanceResult as _GetBalanceResult, JsonRpcId, SuccessResponse,
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
pub struct GetBalanceResult(_GetBalanceResult);

#[cfg(target_arch = "wasm32")]
impl From<GetBalanceResult> for _GetBalanceResult {
    fn from(result: GetBalanceResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetBalanceResult> for GetBalanceResult {
    fn from(result: _GetBalanceResult) -> Self {
        GetBalanceResult(result)
    }
}
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetBalanceResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn balance_value(&self) -> JsValue {
        JsValue::from_serde(&self.0.balance_value).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn merkle_proof(&self) -> String {
        self.0.merkle_proof.clone()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[derive(Default, Debug, Deserialize, Clone, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getBalanceOptions", getter_with_clone)]
pub struct GetBalanceOptions {
    pub state_root_hash_as_string: Option<String>,
    pub state_root_hash: Option<Digest>,
    pub purse_uref_as_string: Option<String>,
    pub purse_uref: Option<URef>,
    pub node_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_balance_options")]
    pub fn get_balance_options(&self, options: JsValue) -> GetBalanceOptions {
        let options_result = options.into_serde::<GetBalanceOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                GetBalanceOptions::default()
            }
        }
    }

    #[wasm_bindgen(js_name = "get_balance")]
    pub async fn get_balance_js_alias(
        &self,
        options: Option<GetBalanceOptions>,
    ) -> Result<GetBalanceResult, JsError> {
        let GetBalanceOptions {
            state_root_hash_as_string,
            state_root_hash,
            purse_uref_as_string,
            purse_uref,
            verbosity,
            node_address,
        } = options.unwrap_or_default();

        let purse_uref = if let Some(purse_uref) = purse_uref {
            GetBalanceInput::PurseUref(purse_uref)
        } else if let Some(purse_uref_as_string) = purse_uref_as_string {
            GetBalanceInput::PurseUrefAsString(purse_uref_as_string)
        } else {
            let err = "Error: Missing purse uref as string or purse uref";
            error(err);
            return Err(JsError::new(err));
        };

        let result = if let Some(hash) = state_root_hash {
            self.get_balance(hash, purse_uref, verbosity, node_address)
                .await
        } else if let Some(hash) = state_root_hash_as_string.clone() {
            // Todo check state root hash validity here _Digest::LENGTH
            self.get_balance(hash.as_str(), purse_uref, verbosity, node_address)
                .await
        } else {
            let err = "Error: Missing state_root_hash";
            error(err);
            return Err(JsError::new(err));
        };
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }

    #[wasm_bindgen(js_name = "state_get_balance")]
    pub async fn state_get_balance_js_alias(
        &self,
        options: Option<GetBalanceOptions>,
    ) -> Result<GetBalanceResult, JsError> {
        self.get_balance_js_alias(options).await
    }
}

#[derive(Debug, Clone)]
pub enum GetBalanceInput {
    PurseUref(URef),
    PurseUrefAsString(String),
}

impl SDK {
    pub async fn get_balance(
        &self,
        state_root_hash: impl ToDigest,
        purse_uref: GetBalanceInput,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetBalanceResult>, SdkError> {
        //log("get_balance!");
        let state_root_hash = if state_root_hash.is_empty() {
            self.get_state_root_hash(None, None, None)
                .await
                .unwrap()
                .result
                .state_root_hash
                .unwrap()
                .into()
        } else {
            state_root_hash.to_digest()
        };
        match purse_uref {
            GetBalanceInput::PurseUref(purse_uref) => get_balance_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &self.get_node_address(node_address),
                self.get_verbosity(verbosity).into(),
                state_root_hash.into(),
                purse_uref.into(),
            )
            .await
            .map_err(SdkError::from),
            GetBalanceInput::PurseUrefAsString(purse_uref) => get_balance_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_node_address(node_address),
                self.get_verbosity(verbosity).into(),
                &state_root_hash.to_string(),
                &purse_uref,
            )
            .await
            .map_err(SdkError::from),
        }
    }
}
