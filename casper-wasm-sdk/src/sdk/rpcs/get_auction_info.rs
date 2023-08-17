#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    types::{block_identifier::BlockIdentifier, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    get_auction_info, rpcs::results::GetAuctionInfoResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_auction_info")]
    pub async fn get_auction_info_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> JsValue {
        serialize_result(
            self.get_auction_info(node_address, verbosity, maybe_block_identifier)
                .await,
        )
    }
}

impl SDK {
    pub async fn get_auction_info(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> Result<SuccessResponse<GetAuctionInfoResult>, Error> {
        //log("get_auction_info!");
        get_auction_info(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            maybe_block_identifier.map(Into::into),
        )
        .await
    }
}
