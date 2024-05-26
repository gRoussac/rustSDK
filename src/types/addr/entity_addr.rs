#[cfg(target_arch = "wasm32")]
use crate::debug::error;
use casper_types::{
    bytesrepr::{self, FromBytes, ToBytes},
    EntityAddr as _EntityAddr,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct EntityAddr(_EntityAddr);

#[wasm_bindgen]
impl EntityAddr {
    // #[cfg(target_arch = "wasm32")]
    // #[wasm_bindgen(constructor)]
    // pub fn new(entity_addr_hex_str: &str) -> Result<EntityAddr, JsValue> {
    //     let bytes = hex::decode(entity_addr_hex_str)
    //         .map_err(|err| JsValue::from_str(&format!("Failed to decode hex string: {:?}", err)))?;
    //     if bytes.len() != _EntityAddr::LENGTH {
    //         return Err(JsValue::from_str("Invalid entity addr length"));
    //     }
    //     let mut array = [0u8; _EntityAddr::LENGTH];
    //     array.copy_from_slice(&bytes);
    //     let entity_addr = _EntityAddr(array);
    //     Ok(entity_addr.into())
    // }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromFormattedStr")]
    pub fn from_formatted_str(formatted_str: &str) -> Result<EntityAddr, JsValue> {
        let entity_addr = _EntityAddr::from_formatted_str(formatted_str)
            .map_err(|err| {
                error(&format!(
                    "Failed to parse EntityAddr from formatted string: {:?}",
                    err
                ))
            })
            .unwrap();
        Ok(EntityAddr(entity_addr))
    }

    #[wasm_bindgen(js_name = "toFormattedString")]
    pub fn to_formatted_string(&self) -> String {
        self.0.to_formatted_string()
    }

    #[wasm_bindgen(js_name = "toHexString")]
    pub fn to_hex_string(&self) -> String {
        self.0.to_string()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }
}

impl From<EntityAddr> for _EntityAddr {
    fn from(entity_addr: EntityAddr) -> Self {
        entity_addr.0
    }
}

impl From<_EntityAddr> for EntityAddr {
    fn from(entity_addr: _EntityAddr) -> Self {
        EntityAddr(entity_addr)
    }
}

impl FromBytes for EntityAddr {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        let (entity_addr, remainder) = _EntityAddr::from_bytes(bytes)?;
        Ok((EntityAddr(entity_addr), remainder))
    }
}

impl ToBytes for EntityAddr {
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
