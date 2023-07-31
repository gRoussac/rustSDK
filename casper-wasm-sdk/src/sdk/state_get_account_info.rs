use super::SDK;
use crate::{
    helpers::serialize_result,
    js::externs::{error, log},
    types::{block_identifier::BlockIdentifier, verbosity::Verbosity},
};
use casper_client::{
    get_account, rpcs::results::GetAccountResult, Error, JsonRpcId, SuccessResponse,
};
use casper_types::{bytesrepr::FromBytes, PublicKey};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn state_get_account_info(
        &mut self,
        node_address: &str,
        account_identifier: String,
        block_identifier: Option<BlockIdentifier>,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("state_get_account_info!");
        let account_identifier_bytes: Vec<u8> = match hex::decode(account_identifier) {
            Ok(bytes) => bytes,
            Err(err) => {
                log(&format!("Error decoding account identifier: {:?}", err));
                return JsValue::null();
            }
        };
        let account_identifier = match PublicKey::from_bytes(&account_identifier_bytes) {
            Ok((public_key, remainder)) if remainder.is_empty() => public_key,
            _ => {
                error("Error converting account identifier");
                return JsValue::null();
            }
        };

        let result: Result<SuccessResponse<GetAccountResult>, Error> = get_account(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            block_identifier.map(Into::into),
            account_identifier,
        )
        .await;
        serialize_result(result)
    }
}
