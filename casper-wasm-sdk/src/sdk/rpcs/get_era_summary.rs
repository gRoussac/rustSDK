#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    helpers::get_verbosity_or_default,
    types::{block_identifier::BlockIdentifier, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    get_era_summary, rpcs::results::GetEraSummaryResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_era_summary")]
    pub async fn get_era_summary_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> JsValue {
        serialize_result(
            self.get_era_summary(node_address, verbosity, maybe_block_identifier)
                .await,
        )
    }
}

impl SDK {
    pub async fn get_era_summary(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> Result<SuccessResponse<GetEraSummaryResult>, Error> {
        //log("get_era_summary!");
        get_era_summary(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            get_verbosity_or_default(verbosity).into(),
            maybe_block_identifier.map(Into::into),
        )
        .await
    }
}
