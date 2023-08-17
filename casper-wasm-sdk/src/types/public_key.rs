use crate::debug::error;
use casper_types::{
    bytesrepr::{self, FromBytes, ToBytes},
    PublicKey as _PublicKey,
};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord)]
pub struct PublicKey(_PublicKey);

#[wasm_bindgen]
impl PublicKey {
    #[wasm_bindgen(constructor)]
    pub fn new(public_key_hex_str: &str) -> Result<PublicKey, JsValue> {
        let bytes = hex::decode(public_key_hex_str)
            .map_err(|err| error(&format!("{:?}", err)))
            .unwrap();
        let (public_key, _) = _PublicKey::from_bytes(&bytes)
            .map_err(|err| error(&format!("{:?}", err)))
            .unwrap();
        Ok(PublicKey(public_key))
    }

    #[wasm_bindgen(js_name = "fromUint8Array")]
    pub fn from_bytes(bytes: Vec<u8>) -> PublicKey {
        let (public_key, _) = _PublicKey::from_bytes(&bytes).unwrap();
        PublicKey(public_key)
    }
}

impl From<PublicKey> for _PublicKey {
    fn from(public_key: PublicKey) -> Self {
        public_key.0
    }
}

impl From<_PublicKey> for PublicKey {
    fn from(public_key: _PublicKey) -> Self {
        PublicKey(public_key)
    }
}

impl ToBytes for PublicKey {
    fn to_bytes(&self) -> Result<Vec<u8>, bytesrepr::Error> {
        self.0.to_bytes()
    }

    fn serialized_length(&self) -> usize {
        self.0.serialized_length()
    }

    fn write_bytes(&self, bytes: &mut Vec<u8>) -> Result<(), bytesrepr::Error> {
        self.0.write_bytes(bytes)
    }
}

impl FromBytes for PublicKey {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        let (public_key, remainder) = _PublicKey::from_bytes(bytes)?;
        Ok((PublicKey(public_key), remainder))
    }
}
