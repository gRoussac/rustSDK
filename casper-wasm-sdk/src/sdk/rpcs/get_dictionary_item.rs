use crate::{
    helpers::serialize_result,
    sdk::SDK,
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
    pub async fn get_dictionary_item(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        state_root_hash: Digest,
        dictionary_item_identifier: DictionaryItemIdentifier,
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

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "state_get_dictionary_item")]
    pub async fn state_get_dictionary_item_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        state_root_hash: Digest,
        dictionary_item_identifier: DictionaryItemIdentifier,
    ) -> JsValue {
        self.get_dictionary_item(
            node_address,
            verbosity,
            state_root_hash,
            dictionary_item_identifier,
        )
        .await
    }
}
