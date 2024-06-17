use casper_types::{HashAddr as _HashAddr, KEY_HASH_LENGTH};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct HashAddr(_HashAddr);

#[wasm_bindgen]
impl HashAddr {
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(constructor)]
    pub fn new(bytes: Vec<u8>) -> Result<HashAddr, JsError> {
        if bytes.len() != KEY_HASH_LENGTH {
            return Err(JsError::new("Invalid HashAddr length"));
        }
        let mut array = [0u8; KEY_HASH_LENGTH];
        array.copy_from_slice(&bytes);
        Ok(HashAddr(array))
    }
}

impl From<Vec<u8>> for HashAddr {
    fn from(bytes: Vec<u8>) -> Self {
        let mut array = [0u8; KEY_HASH_LENGTH];
        array.copy_from_slice(&bytes);
        HashAddr(array)
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
