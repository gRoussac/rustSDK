#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    helpers::get_verbosity_or_default,
    types::{block_identifier::BlockIdentifier, deploy::Deploy, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    rpcs::results::SpeculativeExecResult, speculative_exec, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "speculative_exec")]
    pub async fn speculative_exec_js_alias(
        &mut self,
        node_address: &str,
        deploy: Deploy,
        block_identifier: Option<BlockIdentifier>,
        verbosity: Option<Verbosity>,
    ) -> JsValue {
        serialize_result(
            self.speculative_exec(node_address, deploy, block_identifier, verbosity)
                .await,
        )
    }
}

impl SDK {
    pub async fn speculative_exec(
        &mut self,
        node_address: &str,
        deploy: Deploy,
        block_identifier: Option<BlockIdentifier>,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<SpeculativeExecResult>, Error> {
        //log("speculative_exec!");
        speculative_exec(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            block_identifier.map(Into::into),
            get_verbosity_or_default(verbosity).into(),
            deploy.into(),
        )
        .await
    }
}
