#[cfg(target_arch = "wasm32")]
use crate::debug::error;
#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
#[cfg(target_arch = "wasm32")]
use crate::types::deploy::Deploy;
use crate::{
    helpers::get_verbosity_or_default,
    types::{block_identifier::BlockIdentifierInput, sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    rpcs::results::SpeculativeExecResult, speculative_exec as speculative_exec_lib, JsonRpcId,
    SuccessResponse,
};
use casper_types::Deploy as CasperTypesDeploy;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

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
        &mut self,
        options: GetSpeculativeExecOptions,
    ) -> JsValue {
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
            error("Error: Missing deploy as json or deploy");
            return JsValue::null();
        };

        let maybe_block_identifier = if let Some(maybe_block_identifier) = maybe_block_identifier {
            Some(BlockIdentifierInput::BlockIdentifier(
                maybe_block_identifier,
            ))
        } else {
            maybe_block_id_as_string.map(BlockIdentifierInput::String)
        };

        serialize_result(
            self.speculative_exec(
                &node_address,
                deploy.into(),
                maybe_block_identifier,
                verbosity,
            )
            .await,
        )
    }
}

impl SDK {
    pub async fn speculative_exec(
        &mut self,
        node_address: &str,
        deploy: CasperTypesDeploy,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<SpeculativeExecResult>, SdkError> {
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
            deploy,
        )
        .await
        .map_err(SdkError::from)
    }
}
