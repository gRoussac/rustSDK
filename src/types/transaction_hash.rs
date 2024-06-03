use super::digest::Digest;
use crate::debug::error;
use casper_types::bytesrepr::ToBytes;
use casper_types::Digest as _Digest;
use casper_types::TransactionHash as _TransactionHash;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use hex::decode;
use serde::{Deserialize, Serialize};
use std::fmt;
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct TransactionHash(_TransactionHash);

#[wasm_bindgen]
impl TransactionHash {
    #[wasm_bindgen(constructor)]
    pub fn new(transaction_hash_hex_str: &str) -> Result<TransactionHash, JsValue> {
        let bytes = decode(transaction_hash_hex_str)
            .map_err(|err| error(&format!("{:?}", err)))
            .unwrap();
        let mut hash = [0u8; _Digest::LENGTH];
        hash.copy_from_slice(&bytes);
        Self::from_raw(&hash)
    }

    #[wasm_bindgen(js_name = "fromRaw")]
    pub fn from_raw(bytes: &[u8]) -> Result<TransactionHash, JsValue> {
        if bytes.len() != _Digest::LENGTH {
            return Err(JsValue::from_str("Invalid digest length"));
        }
        let mut hash = [0u8; _Digest::LENGTH];
        hash.copy_from_slice(bytes);
        Ok(Self(_TransactionHash::from_raw(hash)))
    }

    #[wasm_bindgen(js_name = "fromDigest")]
    pub fn from_digest(digest: Digest) -> Result<TransactionHash, JsValue> {
        Self::from_raw(&digest.to_bytes().unwrap())
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "digest")]
    pub fn digest(&self) -> Result<Digest, JsValue> {
        Ok(self.0.digest().into())
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toString")]
    pub fn to_string_js_alias(&self) -> String {
        self.to_string()
    }
}

impl fmt::Display for TransactionHash {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", hex::encode(self.0))
    }
}

impl From<TransactionHash> for _TransactionHash {
    fn from(transaction_hash: TransactionHash) -> Self {
        transaction_hash.0
    }
}

impl From<_TransactionHash> for TransactionHash {
    fn from(transaction_hash: _TransactionHash) -> Self {
        TransactionHash(transaction_hash)
    }
}
