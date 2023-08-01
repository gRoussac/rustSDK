use crate::{helpers::serialize_result, sdk::SDK, types::verbosity::Verbosity};
use casper_client::{
    get_validator_changes, rpcs::results::GetValidatorChangesResult, Error, JsonRpcId,
    SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn get_validator_changes(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("get_validator_changes!".to_string());
        let result: Result<SuccessResponse<GetValidatorChangesResult>, Error> =
            get_validator_changes(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                node_address,
                verbosity.into(),
            )
            .await;
        serialize_result(result)
    }
}
