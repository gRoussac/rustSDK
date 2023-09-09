#[cfg(target_arch = "wasm32")]
use crate::debug::error;
#[cfg(target_arch = "wasm32")]
use crate::types::block_hash::BlockHash;
#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
use crate::types::deploy::Deploy;
use crate::{
    helpers::get_verbosity_or_default,
    types::{block_identifier::BlockIdentifierInput, sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    rpcs::results::SpeculativeExecResult as _SpeculativeExecResult,
    speculative_exec as speculative_exec_lib, JsonRpcId, SuccessResponse,
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
pub struct SpeculativeExecResult(_SpeculativeExecResult);

#[cfg(target_arch = "wasm32")]
impl From<SpeculativeExecResult> for _SpeculativeExecResult {
    fn from(result: SpeculativeExecResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_SpeculativeExecResult> for SpeculativeExecResult {
    fn from(result: _SpeculativeExecResult) -> Self {
        SpeculativeExecResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SpeculativeExecResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn block_hash(&self) -> BlockHash {
        self.0.block_hash.into()
    }

    #[wasm_bindgen(getter)]
    pub fn execution_result(&self) -> JsValue {
        JsValue::from_serde(&self.0.execution_result).unwrap()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getSpeculativeExecOptions", getter_with_clone)]
pub struct GetSpeculativeExecOptions {
    pub node_address: String,
    pub deploy_as_string: Option<String>,
    pub deploy: Option<Deploy>,
    pub maybe_block_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "speculative_exec_options")]
    pub fn get_speculative_exec_options(&self, options: JsValue) -> GetSpeculativeExecOptions {
        let options_result = options.into_serde::<GetSpeculativeExecOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                GetSpeculativeExecOptions::default()
            }
        }
    }

    #[wasm_bindgen(js_name = "speculative_exec")]
    pub async fn speculative_exec_js_alias(
        &self,
        options: GetSpeculativeExecOptions,
    ) -> Result<SpeculativeExecResult, JsError> {
        let GetSpeculativeExecOptions {
            node_address,
            deploy_as_string,
            deploy,
            maybe_block_id_as_string,
            maybe_block_identifier,
            verbosity,
        } = options;

        let deploy = if let Some(deploy_as_string) = deploy_as_string {
            Deploy::new(deploy_as_string.into())
        } else if let Some(deploy) = deploy {
            deploy
        } else {
            let err = &format!("Error: Missing deploy as json or deploy");
            error(err);
            return Err(JsError::new(err));
        };

        let maybe_block_identifier = if let Some(maybe_block_identifier) = maybe_block_identifier {
            Some(BlockIdentifierInput::BlockIdentifier(
                maybe_block_identifier,
            ))
        } else {
            maybe_block_id_as_string.map(BlockIdentifierInput::String)
        };

        let result = self
            .speculative_exec(
                &node_address,
                deploy.into(),
                maybe_block_identifier,
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
    pub async fn speculative_exec(
        &self,
        node_address: &str,
        deploy: Deploy,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<_SpeculativeExecResult>, SdkError> {
        //log("speculative_exec!");

        let maybe_block_identifier =
            if let Some(BlockIdentifierInput::BlockIdentifier(maybe_block_identifier)) =
                maybe_block_identifier
            {
                Some(maybe_block_identifier)
            } else {
                None
            };
        speculative_exec_lib(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            maybe_block_identifier.map(Into::into),
            get_verbosity_or_default(verbosity).into(),
            deploy.into(),
        )
        .await
        .map_err(SdkError::from)
    }
}
