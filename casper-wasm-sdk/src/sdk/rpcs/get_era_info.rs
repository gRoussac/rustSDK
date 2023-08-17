#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    types::{block_identifier::BlockIdentifier, verbosity::Verbosity},
    SDK,
};
#[allow(deprecated)]
use casper_client::{
    get_era_info, rpcs::results::GetEraInfoResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[deprecated(note = "prefer 'get_era_summary' as it doesn't require a switch block")]
    #[allow(deprecated)]
    #[wasm_bindgen(js_name = "get_era_info")]
    pub async fn get_era_info_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> JsValue {
        serialize_result(
            self.get_era_info(node_address, verbosity, maybe_block_identifier)
                .await,
        )
    }
}

impl SDK {
    #[deprecated(note = "prefer 'get_era_summary' as it doesn't require a switch block")]
    #[allow(deprecated)]
    pub async fn get_era_info(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
    ) -> Result<SuccessResponse<GetEraInfoResult>, Error> {
        //log("get_era_info!");
        get_era_info(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            maybe_block_identifier.map(Into::into),
        )
        .await
    }
}
