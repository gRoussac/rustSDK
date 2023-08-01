use crate::{
    helpers::serialize_result,
    sdk::SDK,
    types::{block_identifier::BlockIdentifier, verbosity::Verbosity},
};
#[allow(deprecated)]
use casper_client::{
    get_era_info, rpcs::results::GetEraInfoResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[deprecated(note = "prefer 'get_era_summary' as it doesn't require a switch block")]
#[wasm_bindgen]
impl SDK {
    #![allow(deprecated)]
    #[wasm_bindgen]
    pub async fn get_era_info(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> JsValue {
        //log("get_era_info!".to_string());
        let result: Result<SuccessResponse<GetEraInfoResult>, Error> = get_era_info(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            maybe_block_identifier.map(Into::into),
        )
        .await;
        serialize_result(result)
    }
}
