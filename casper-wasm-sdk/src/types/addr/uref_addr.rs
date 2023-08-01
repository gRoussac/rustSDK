use casper_types::{URefAddr as _URefAddr, UREF_ADDR_LENGTH};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct URefAddr(_URefAddr);

#[wasm_bindgen]
impl URefAddr {
    #[wasm_bindgen(constructor)]
    pub fn new(bytes: Vec<u8>) -> Result<URefAddr, JsValue> {
        if bytes.len() != UREF_ADDR_LENGTH {
            return Err(JsValue::from_str("Invalid URefAddr length"));
        }
        let mut array = [0u8; UREF_ADDR_LENGTH];
        array.copy_from_slice(&bytes);
        Ok(URefAddr(array))
    }
}

impl From<URefAddr> for _URefAddr {
    fn from(uref_addr: URefAddr) -> Self {
        uref_addr.0
    }
}

impl From<_URefAddr> for URefAddr {
    fn from(uref_addr: _URefAddr) -> Self {
        URefAddr(uref_addr)
    }
}
