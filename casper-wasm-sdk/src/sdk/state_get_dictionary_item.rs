use super::SDK;
use crate::{
    helpers::serialize_result,
    types::{
        dictionary_item_identifier::DictionaryItemIdentifier, digest::Digest, verbosity::Verbosity,
    },
};
use casper_client::{
    get_dictionary_item, rpcs::results::GetDictionaryItemResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn state_get_dictionary_item(
        &mut self,
        node_address: &str,
        state_root_hash: Digest,
        dictionary_item_identifier: DictionaryItemIdentifier,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("state_get_dictionary_item!");
        let result: Result<SuccessResponse<GetDictionaryItemResult>, Error> = get_dictionary_item(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            state_root_hash.into(),
            dictionary_item_identifier.into(),
        )
        .await;
        serialize_result(result)
    }
}
