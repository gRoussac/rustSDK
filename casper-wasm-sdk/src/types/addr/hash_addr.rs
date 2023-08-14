use crate::js::externs::error;
use casper_types::{HashAddr as _HashAddr, KEY_HASH_LENGTH};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct HashAddr(_HashAddr);

#[wasm_bindgen]
impl HashAddr {
    #[wasm_bindgen(constructor)]
    pub fn new(bytes: Vec<u8>) -> Result<HashAddr, JsValue> {
        if bytes.len() != KEY_HASH_LENGTH {
            error("Invalid HashAddr length");
            return Err(JsValue::null());
        }
        let mut array = [0u8; KEY_HASH_LENGTH];
        array.copy_from_slice(&bytes);
        Ok(HashAddr(array))
    }
}

impl From<HashAddr> for _HashAddr {
    fn from(hash_addr: HashAddr) -> Self {
        hash_addr.0
    }
}

impl From<_HashAddr> for HashAddr {
    fn from(hash_addr: _HashAddr) -> Self {
        HashAddr(hash_addr)
    }
}
