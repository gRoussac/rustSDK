use crate::debug::error;
use casper_types::{DictionaryAddr as _DictionaryAddr, KEY_DICTIONARY_LENGTH};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct DictionaryAddr(_DictionaryAddr);

#[wasm_bindgen]
impl DictionaryAddr {
    #[wasm_bindgen(constructor)]
    pub fn new(bytes: Vec<u8>) -> Result<DictionaryAddr, JsValue> {
        if bytes.len() != KEY_DICTIONARY_LENGTH {
            error("Invalid DictionaryAddr length");
            return Err(JsValue::null());
        }
        let mut array = [0u8; KEY_DICTIONARY_LENGTH];
        array.copy_from_slice(&bytes);
        Ok(DictionaryAddr(array))
    }
}

impl From<DictionaryAddr> for _DictionaryAddr {
    fn from(dictionary_addr: DictionaryAddr) -> Self {
        dictionary_addr.0
    }
}

impl From<_DictionaryAddr> for DictionaryAddr {
    fn from(dictionary_addr: _DictionaryAddr) -> Self {
        DictionaryAddr(dictionary_addr)
    }
}
