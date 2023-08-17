#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{
    types::{
        dictionary_item_identifier::DictionaryItemIdentifier, digest::Digest, verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    get_dictionary_item, rpcs::results::GetDictionaryItemResult, Error, JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_dictionary_item")]
    pub async fn get_dictionary_item_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        state_root_hash: Digest,
        dictionary_item_identifier: DictionaryItemIdentifier,
    ) -> JsValue {
        serialize_result(
            self.get_dictionary_item(
                node_address,
                verbosity,
                state_root_hash,
                dictionary_item_identifier,
            )
            .await,
        )
    }

    #[wasm_bindgen(js_name = "state_get_dictionary_item")]
    pub async fn state_get_dictionary_item_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        state_root_hash: Digest,
        dictionary_item_identifier: DictionaryItemIdentifier,
    ) -> JsValue {
        self.get_dictionary_item_js_alias(
            node_address,
            verbosity,
            state_root_hash,
            dictionary_item_identifier,
        )
        .await
    }
}

impl SDK {
    pub async fn get_dictionary_item(
        &mut self,
        node_address: &str,
        verbosity: Verbosity,
        state_root_hash: Digest,
        dictionary_item_identifier: DictionaryItemIdentifier,
    ) -> Result<SuccessResponse<GetDictionaryItemResult>, Error> {
        //log("state_get_dictionary_item!");
        get_dictionary_item(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            state_root_hash.into(),
            dictionary_item_identifier.into(),
        )
        .await
    }
}
