use crate::debug::error;
use casper_types::{
    bytesrepr::{self, FromBytes, ToBytes, U8_SERIALIZED_LENGTH},
    PackageAddr, PackageHash as _PackageHash,
};
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Deserialize, Clone, Serialize, Copy)]
pub struct PackageHash(_PackageHash);

#[wasm_bindgen]
impl PackageHash {
    #[wasm_bindgen(constructor)]
    pub fn new(input: &str) -> Result<PackageHash, JsValue> {
        let prefixed_input = format!("package-{}", input);
        Self::from_formatted_str(&prefixed_input)
    }

    #[wasm_bindgen(js_name = "fromFormattedStr")]
    pub fn from_formatted_str(input: &str) -> Result<PackageHash, JsValue> {
        let _package_hash = _PackageHash::from_formatted_str(input)
            .map_err(|err| {
                error(&format!(
                    "Failed to parse PackageHash from formatted string: {:?}",
                    err
                ))
            })
            .unwrap();
        Ok(Self(_package_hash))
    }

    #[wasm_bindgen(js_name = "toFormattedString")]
    pub fn to_formatted_string(&self) -> String {
        self.0.to_formatted_string()
    }

    #[wasm_bindgen(js_name = "fromUint8Array")]
    pub fn from_bytes(bytes: Vec<u8>) -> PackageHash {
        let _package_hash =
            _PackageHash::try_from(&bytes).expect("Failed to convert bytes to PackageHash");
        Self(_package_hash)
    }
}

impl From<PackageHash> for _PackageHash {
    fn from(_package_hash: PackageHash) -> Self {
        _package_hash.0
    }
}

impl From<_PackageHash> for PackageHash {
    fn from(_package_hash: _PackageHash) -> Self {
        Self(_package_hash)
    }
}

impl FromBytes for PackageHash {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        let (_package_hash, remainder) = _PackageHash::from_bytes(bytes)?;
        Ok((Self(_package_hash), remainder))
    }
}

impl ToBytes for PackageHash {
    fn to_bytes(&self) -> Result<Vec<u8>, bytesrepr::Error> {
        self.0.to_bytes()
    }

    fn serialized_length(&self) -> usize {
        U8_SERIALIZED_LENGTH + self.0.value().len() * U8_SERIALIZED_LENGTH
    }

    fn write_bytes(&self, bytes: &mut Vec<u8>) -> Result<(), bytesrepr::Error> {
        self.0.write_bytes(bytes)
    }
}

impl From<PackageAddr> for PackageHash {
    fn from(bytes: PackageAddr) -> Self {
        _PackageHash::from_bytes(&bytes)
            .map(|(hash, _)| hash)
            .expect("Failed to convert bytes to PackageHash")
            .into()
    }
}
