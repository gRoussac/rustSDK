#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{helpers::get_verbosity_or_default, types::verbosity::Verbosity, SDK};
use casper_client::{
    get_validator_changes, rpcs::results::GetValidatorChangesResult, Error, JsonRpcId,
    SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_validator_changes")]
    pub async fn get_validator_changes_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
    ) -> JsValue {
        serialize_result(self.get_validator_changes(node_address, verbosity).await)
    }
}

impl SDK {
    pub async fn get_validator_changes(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<GetValidatorChangesResult>, Error> {
        //log("get_validator_changes!");
        get_validator_changes(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            get_verbosity_or_default(verbosity).into(),
        )
        .await
    }
}
