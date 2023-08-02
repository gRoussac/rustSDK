use crate::{
    helpers::serialize_result,
    sdk::SDK,
    types::{block_identifier::BlockIdentifier, verbosity::Verbosity},
};
use casper_client::{
    get_auction_info, rpcs::results::GetAuctionInfoResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn get_auction_info(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> JsValue {
        //log("get_auction_info!");
        let result: Result<SuccessResponse<GetAuctionInfoResult>, Error> = get_auction_info(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            maybe_block_identifier.map(Into::into),
        )
        .await;
        serialize_result(result)
    }
}
