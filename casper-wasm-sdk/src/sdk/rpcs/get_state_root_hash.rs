#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    types::{block_identifier::BlockIdentifier, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    get_state_root_hash, rpcs::results::GetStateRootHashResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_state_root_hash")]
    pub async fn get_state_root_hash_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> JsValue {
        serialize_result(
            self.get_state_root_hash(node_address, verbosity, maybe_block_identifier)
                .await,
        )
    }

    #[wasm_bindgen(js_name = "chain_get_state_root_hash")]
    pub async fn chain_get_state_root_hash_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> JsValue {
        self.get_state_root_hash_js_alias(node_address, verbosity, maybe_block_identifier)
            .await
    }
}

impl SDK {
    pub async fn get_state_root_hash(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> Result<SuccessResponse<GetStateRootHashResult>, Error> {
        //log("state_root_hash!");
        get_state_root_hash(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            maybe_block_identifier.map(Into::into),
        )
        .await
    }
}
