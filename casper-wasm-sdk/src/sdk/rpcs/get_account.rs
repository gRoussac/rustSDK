use crate::{
    helpers::serialize_result,
    sdk::SDK,
    types::{block_identifier::BlockIdentifier, public_key::PublicKey, verbosity::Verbosity},
};
use casper_client::{
    get_account, rpcs::results::GetAccountResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    pub async fn get_account(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
        account_identifier: PublicKey,
    ) -> JsValue {
        //log("get_account!");
        let result: Result<SuccessResponse<GetAccountResult>, Error> = get_account(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            maybe_block_identifier.map(Into::into),
            account_identifier.into(),
        )
        .await;
        serialize_result(result)
    }

    #[wasm_bindgen(js_name = "state_get_account_info")]
    pub async fn state_get_account_info_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        maybe_block_identifier: Option<BlockIdentifier>,
        account_identifier: PublicKey,
    ) -> JsValue {
        self.get_account(
            node_address,
            verbosity,
            maybe_block_identifier,
            account_identifier,
        )
        .await
    }
}
