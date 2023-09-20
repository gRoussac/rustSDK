use crate::helpers::get_current_timestamp;
use crate::helpers::hex_to_uint8_vec;
use crate::types::cl::bytes::Bytes;
use crate::{
    debug::error,
    helpers::{hex_to_string, motes_to_cspr, secret_key_from_pem},
    types::verbosity::Verbosity,
};
use casper_types::PublicKey;
use gloo_utils::format::JsValueSerdeExt;
use wasm_bindgen::prelude::*;

/// Converts a hexadecimal string to a regular string.
///
/// # Arguments
///
/// * `hex_string` - The hexadecimal string to convert.
///
/// # Returns
///
/// A regular string containing the converted value.
#[wasm_bindgen(js_name = "hexToString")]
pub fn hex_to_string_js_alias(hex_string: &str) -> String {
    hex_to_string(hex_string)
}

/// Converts a hexadecimal string to a Uint8Array.
///
/// # Arguments
///
/// * `hex_string` - The hexadecimal string to convert.
///
/// # Returns
///
/// A Uint8Array containing the converted value.
#[wasm_bindgen(js_name = "hexToUint8Array")]
pub fn hex_to_uint8_vec_js_alias(hex_string: &str) -> Vec<u8> {
    hex_to_uint8_vec(hex_string)
}

/// Converts a Uint8Array to a `Bytes` object.
///
/// # Arguments
///
/// * `uint8_array` - The Uint8Array to convert.
///
/// # Returns
///
/// A `Bytes` object containing the converted value.
#[wasm_bindgen(js_name = "uint8ArrayToBytes")]
pub fn uint8_array_to_bytes(uint8_array: js_sys::Uint8Array) -> Bytes {
    Bytes::from_uint8_array(uint8_array)
}

/// Converts motes to CSPR (Casper tokens).
///
/// # Arguments
///
/// * `motes` - The motes value to convert.
///
/// # Returns
///
/// A string representing the CSPR amount.
#[wasm_bindgen(js_name = "motesToCSPR")]
pub fn motes_to_cspr_js_alias(motes: &str) -> String {
    motes_to_cspr(motes)
}

/// Pretty prints a JSON value.
///
/// # Arguments
///
/// * `value` - The JSON value to pretty print.
/// * `verbosity` - An optional verbosity level for pretty printing.
///
/// # Returns
///
/// A pretty printed JSON value as a JsValue.
#[wasm_bindgen(js_name = "jsonPrettyPrint")]
pub fn json_pretty_print_js_alias(value: JsValue, verbosity: Option<Verbosity>) -> JsValue {
    use crate::helpers::json_pretty_print;

    let deserialized: Result<serde_json::Value, _> = value.into_serde();
    match deserialized {
        Ok(result) => {
            let pretty_printed = json_pretty_print(result, verbosity);
            JsValue::from_str(&pretty_printed)
        }
        Err(err) => {
            error(&format!("Error in json_pretty_print: {:?}", err));
            value
        }
    }
}

/// Converts a secret key to a corresponding public key.
///
/// # Arguments
///
/// * `secret_key` - The secret key in PEM format.
///
/// # Returns
///
/// A JsValue containing the corresponding public key.
/// If an error occurs during the conversion, JsValue::null() is returned.
#[wasm_bindgen(js_name = "privateToPublicKey")]
pub fn secret_to_public_key(secret_key: &str) -> JsValue {
    let secret_key_from_pem = secret_key_from_pem(secret_key);
    if let Err(err) = secret_key_from_pem {
        error(&format!("Error loading secret key: {:?}", err));
        return JsValue::null();
    }
    let public_key = PublicKey::from(&secret_key_from_pem.unwrap());
    JsValue::from_serde(&public_key).unwrap_or_else(|err| {
        error(&format!("Error serializing public key: {:?}", err));
        JsValue::null()
    })
}

/// Gets the current timestamp.
///
/// # Returns
///
/// A JsValue containing the current timestamp.
#[wasm_bindgen(js_name = "getTimestamp")]
pub fn get_timestamp() -> JsValue {
    get_current_timestamp(None).into()
}
