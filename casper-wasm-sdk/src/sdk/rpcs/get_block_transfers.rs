#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    helpers::get_verbosity_or_default,
    types::{block_identifier::BlockIdentifier, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    get_block_transfers, rpcs::results::GetBlockTransfersResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_block_transfers")]
    pub async fn get_block_transfers_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> JsValue {
        serialize_result(
            self.get_block_transfers(node_address, verbosity, maybe_block_identifier)
                .await,
        )
    }
}

impl SDK {
    pub async fn get_block_transfers(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> Result<SuccessResponse<GetBlockTransfersResult>, Error> {
        //log("get_block_transfers!");
        get_block_transfers(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            get_verbosity_or_default(verbosity).into(),
            maybe_block_identifier.map(Into::into),
        )
        .await
    }
}
