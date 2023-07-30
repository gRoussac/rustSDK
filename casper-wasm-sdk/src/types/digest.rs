use casper_types::Digest as _Digest;
use wasm_bindgen::prelude::*;

#[derive(Debug)]
#[wasm_bindgen]
pub struct Digest {
    bytes: Vec<u8>,
}

#[wasm_bindgen]
impl Digest {
    #[wasm_bindgen(constructor)]
    pub fn new(bytes: Vec<u8>) -> Result<Digest, JsValue> {
        let mut digest_bytes = [0u8; _Digest::LENGTH];
        if bytes.len() != _Digest::LENGTH {
            return Err(JsValue::from_str("Invalid Digest length"));
        }
        digest_bytes.copy_from_slice(&bytes);
        Ok(Digest {
            bytes: digest_bytes.to_vec(),
        })
    }
}

impl From<_Digest> for Digest {
    fn from(digest: _Digest) -> Self {
        Digest {
            bytes: digest.value().to_vec(),
        }
    }
}

impl From<Digest> for _Digest {
    fn from(digest: Digest) -> Self {
        _Digest::try_from(digest.bytes.as_slice()).expect("Invalid Digest bytes")
    }
}
