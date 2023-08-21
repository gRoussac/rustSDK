#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    helpers::get_verbosity_or_default,
    types::{block_identifier::BlockIdentifier, public_key::PublicKey, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    get_account, rpcs::results::GetAccountResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_account")]
    pub async fn get_account_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
        maybe_block_identifier: Option<BlockIdentifier>,
        account_identifier: PublicKey,
    ) -> JsValue {
        serialize_result(
            self.get_account(
                node_address,
                verbosity,
                maybe_block_identifier,
                account_identifier,
            )
            .await,
        )
    }

    #[wasm_bindgen(js_name = "state_get_account_info")]
    pub async fn state_get_account_info_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
        maybe_block_identifier: Option<BlockIdentifier>,
        account_identifier: PublicKey,
    ) -> JsValue {
        self.get_account_js_alias(
            node_address,
            verbosity,
            maybe_block_identifier,
            account_identifier,
        )
        .await
    }
}

impl SDK {
    pub async fn get_account(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
        maybe_block_identifier: Option<BlockIdentifier>,
        account_identifier: PublicKey,
    ) -> Result<SuccessResponse<GetAccountResult>, Error> {
        //log("get_account!");
        get_account(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            get_verbosity_or_default(verbosity).into(),
            maybe_block_identifier.map(Into::into),
            account_identifier.into(),
        )
        .await
    }
}
