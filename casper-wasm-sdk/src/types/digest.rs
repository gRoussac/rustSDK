use crate::debug::error;
use casper_types::{
    bytesrepr::{self, FromBytes, ToBytes},
    Digest as _Digest,
};
use hex::decode;
use wasm_bindgen::prelude::*;

#[derive(Debug)]
#[wasm_bindgen]
pub struct Digest(_Digest);

#[wasm_bindgen]
impl Digest {
    #[wasm_bindgen(constructor)]
    pub fn new(digest_hex_str: &str) -> Result<Digest, JsValue> {
        let bytes = decode(digest_hex_str)
            .map_err(|err| error(&format!("{:?}", err)))
            .unwrap();
        Self::from_digest(bytes)
    }

    #[wasm_bindgen(js_name = "fromDigest")]
    pub fn from_digest(bytes: Vec<u8>) -> Result<Digest, JsValue> {
        let mut digest_bytes = [0u8; _Digest::LENGTH];
        if bytes.len() != _Digest::LENGTH {
            error("Invalid Digest length");
            return Err(JsValue::null());
        }
        digest_bytes.copy_from_slice(&bytes);
        Ok(Digest(_Digest::from(digest_bytes)))
    }
}

impl From<Digest> for _Digest {
    fn from(digest: Digest) -> Self {
        digest.0
    }
}

impl From<_Digest> for Digest {
    fn from(digest: _Digest) -> Self {
        Digest(digest)
    }
}

impl ToBytes for Digest {
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

impl FromBytes for Digest {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        _Digest::from_bytes(bytes).map(|(digest, remainder)| (Digest(digest), remainder))
    }
}

impl From<[u8; _Digest::LENGTH]> for Digest {
    fn from(bytes: [u8; _Digest::LENGTH]) -> Self {
        let digest = _Digest::try_from(bytes).unwrap();
        Digest(digest)
    }
}
