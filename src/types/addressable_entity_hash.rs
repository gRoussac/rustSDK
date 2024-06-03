use crate::debug::error;
use casper_types::{
    addressable_entity::{
        AddressableEntityHash as _AddressableEntityHash, ADDRESSABLE_ENTITY_STRING_PREFIX,
    },
    bytesrepr::{self, FromBytes, ToBytes, U8_SERIALIZED_LENGTH},
};
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Deserialize, Clone, Serialize, Copy)]
pub struct AddressableEntityHash(_AddressableEntityHash);

#[wasm_bindgen]
impl AddressableEntityHash {
    #[wasm_bindgen(constructor)]
    #[wasm_bindgen(js_name = "fromString")]
    pub fn new(input: &str) -> Result<AddressableEntityHash, JsValue> {
        let prefixed_input = format!("{}{}", ADDRESSABLE_ENTITY_STRING_PREFIX, input);
        Self::from_formatted_str(&prefixed_input)
    }

    #[wasm_bindgen(js_name = "fromFormattedStr")]
    pub fn from_formatted_str(input: &str) -> Result<AddressableEntityHash, JsValue> {
        let addressable_entity_hash = _AddressableEntityHash::from_formatted_str(input)
            .map_err(|err| {
                error(&format!(
                    "Failed to parse AddressableEntityHash from formatted string: {:?}",
                    err
                ))
            })
            .unwrap();
        Ok(Self(addressable_entity_hash))
    }

    #[wasm_bindgen(js_name = "toFormattedString")]
    pub fn to_formatted_string(&self) -> String {
        self.0.to_formatted_string()
    }

    #[wasm_bindgen(js_name = "fromUint8Array")]
    pub fn from_bytes(bytes: Vec<u8>) -> AddressableEntityHash {
        let addressable_entity_hash = _AddressableEntityHash::try_from(&bytes)
            .expect("Failed to convert bytes to AddressableEntityHash");
        Self(addressable_entity_hash)
    }
}

impl From<AddressableEntityHash> for _AddressableEntityHash {
    fn from(addressable_entity_hash: AddressableEntityHash) -> Self {
        addressable_entity_hash.0
    }
}

impl From<_AddressableEntityHash> for AddressableEntityHash {
    fn from(addressable_entity_hash: _AddressableEntityHash) -> Self {
        Self(addressable_entity_hash)
    }
}

impl FromBytes for AddressableEntityHash {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        let (addressable_entity_hash, remainder) = _AddressableEntityHash::from_bytes(bytes)?;
        Ok((Self(addressable_entity_hash), remainder))
    }
}

impl ToBytes for AddressableEntityHash {
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
