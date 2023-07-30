use super::uref::URef;
use casper_client::rpcs::DictionaryItemIdentifier as _DictionaryItemIdentifier;
use wasm_bindgen::prelude::*;

#[derive(Debug)]
#[wasm_bindgen]
pub struct DictionaryItemIdentifier(_DictionaryItemIdentifier);

#[wasm_bindgen]
impl DictionaryItemIdentifier {
    #[wasm_bindgen(constructor)]
    pub fn new(seed_uref: URef, dictionary_item_key: String) -> Self {
        let dictionary_item_identifier = _DictionaryItemIdentifier::URef {
            seed_uref: seed_uref.into(),
            dictionary_item_key,
        };
        DictionaryItemIdentifier(dictionary_item_identifier)
    }
}

impl From<DictionaryItemIdentifier> for _DictionaryItemIdentifier {
    fn from(dictionary_item_identifier: DictionaryItemIdentifier) -> Self {
        dictionary_item_identifier.0
    }
}

impl From<_DictionaryItemIdentifier> for DictionaryItemIdentifier {
    fn from(identifier: _DictionaryItemIdentifier) -> Self {
        DictionaryItemIdentifier(identifier)
    }
}
