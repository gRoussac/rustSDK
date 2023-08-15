use super::{
    bytes::{self, Bytes},
    cl_type::CLType,
};
use crate::js::externs::error;
use casper_types::{
    bytesrepr::{FromBytes, ToBytes},
    CLTyped, CLValue as _CLValue, U128,
};
use gloo_utils::format::JsValueSerdeExt;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Debug)]
pub struct CLValue {
    cl_type: CLType,
    bytes: Bytes,
}

// impl Into<_CLValue> for CLValue {
//     fn into(self) -> _CLValue {
//         _CLValue::from_t((self.cl_type, self.bytes)).unwrap()
//     }
// }

#[wasm_bindgen]
impl CLValue {
    // #[wasm_bindgen(constructor)]
    // pub fn new(cl_type: CLType, bytes: Bytes) -> Self {
    //     CLValue { cl_type, bytes }
    // }

    // pub fn Bool(value: bool) -> Result<CLValue, JsValue> {
    //     let cl_value = _CLValue::from_t(value)
    //         .map_err(|err| JsValue::from_str(&format!("Failed to create CLValue: {:?}", err)))?;
    //     Ok(cl_value.into())
    // }

    // pub fn I32(value: i32) -> Result<CLValue, JsValue> {
    //     let cl_value = _CLValue::from_t(value)
    //         .map_err(|err| JsValue::from_str(&format!("Failed to create CLValue: {:?}", err)))?;
    //     let bytes = cl_value
    //         .into_bytes()
    //         .map_err(|err| JsValue::from_str(&format!("Failed to serialize CLValue: {:?}", err)))?;
    //     Ok(CLValue::new(CLType::I32(), bytes.into()))
    // }

    // pub fn U32(value: u32) -> Result<CLValue, JsValue> {
    //     let cl_value = _CLValue::from_t(value)
    //         .map_err(|err| JsValue::from_str(&format!("Failed to create CLValue: {:?}", err)))?;
    //     let bytes = cl_value
    //         .into_bytes()
    //         .map_err(|err| JsValue::from_str(&format!("Failed to serialize CLValue: {:?}", err)))?;
    //     Ok(CLValue::new(CLType::U32(), bytes.into()))
    // }

    // pub fn U64(value: u64) -> Result<CLValue, JsValue> {
    //     let cl_value = _CLValue::from_t(value)
    //         .map_err(|err| JsValue::from_str(&format!("Failed to create CLValue: {:?}", err)))?;
    //     let bytes = cl_value
    //         .into_bytes()
    //         .map_err(|err| JsValue::from_str(&format!("Failed to serialize CLValue: {:?}", err)))?;
    //     Ok(CLValue::new(CLType::U64(), bytes.into()))
    // }

    // pub fn U128(value: JsValue) -> Result<CLValue, JsValue> {
    //     // Deserialize JsValue into u128
    //     let value_as_u128: U128 = value
    //         .into_serde()
    //         .map_err(|err| JsValue::from_str(&format!("Failed to deserialize u128: {:?}", err)))?;

    //     // Create _CLValue from the u128
    //     let cl_value = _CLValue::from_t(value_as_u128)
    //         .map_err(|err| JsValue::from_str(&format!("Failed to create CLValue: {:?}", err)))?;

    //     // Serialize _CLValue into bytes
    //     let bytes = cl_value
    //         .into_bytes()
    //         .map_err(|err| JsValue::from_str(&format!("Failed to serialize CLValue: {:?}", err)))?;

    //     // Create CLValue with u128 CLType and bytes
    //     Ok(CLValue::new(CLType::U128(), bytes.into()))
    // }
}

// impl From<CLValue> for _CLValue {
//     fn from(cl_value: CLValue) -> Self {
//         let bytes = cl_value.bytes.inner_bytes_js().into();
//         _CLValue::from_t((cl_value.cl_type, bytes)).unwrap()
//     }
// }
// impl From<_CLValue> for CLValue {
//     fn from(cl_value: _CLValue) -> Self {
//         let (cl_type, bytes): (CLType, Vec<u8>) = cl_value.into();
//         let bytes = Bytes::from(bytes);
//         CLValue { cl_type, bytes }
//     }
// }
