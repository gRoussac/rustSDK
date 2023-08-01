use casper_types::URef as _URef;
use wasm_bindgen::prelude::*;

use crate::types::{access_rights::AccessRights, addr::uref_addr::URefAddr};

#[derive(Debug)]
#[wasm_bindgen]

pub struct URef(_URef);

#[wasm_bindgen]
impl URef {
    #[wasm_bindgen(constructor)]
    pub fn new(hex_str: &str, access_rights: u8) -> Result<URef, JsValue> {
        // Convert the input hexadecimal string to bytes
        let bytes = match hex::decode(hex_str) {
            Ok(bytes) => bytes,
            Err(error) => return Err(JsValue::from_str(&format!("Invalid hex string: {}", error))),
        };

        let uref = _URef::new(
            URefAddr::new(bytes).unwrap().into(),
            AccessRights::new(access_rights).unwrap_or_default().into(),
        );

        Ok(URef(uref))
    }

    #[wasm_bindgen(js_name = "fromUint8Array")]
    pub fn from_bytes(address: Vec<u8>, access_rights: u8) -> Self {
        let mut address_array = [0u8; 32];
        address_array[..address.len()].copy_from_slice(&address);

        URef(_URef::new(
            address_array,
            AccessRights::new(access_rights).unwrap_or_default().into(),
        ))
    }
}

impl From<_URef> for URef {
    fn from(uref: _URef) -> Self {
        URef(uref)
    }
}

impl From<URef> for _URef {
    fn from(uref: URef) -> Self {
        uref.0
    }
}
