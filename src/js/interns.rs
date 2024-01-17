use crate::helpers::{
    get_blake2b_hash, get_current_timestamp, hex_to_uint8_vec,
    make_dictionary_item_key as make_dictionary_item_key_helper,
};
use crate::types::{cl::bytes::Bytes, key::Key};
use crate::{
    debug::error,
    helpers::{hex_to_string, motes_to_cspr, secret_key_from_pem},
    types::verbosity::Verbosity,
};
use casper_types::{PublicKey, U256};
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

/// Encodes the given metadata using the lower-level Blake2b hashing algorithm.
///
/// # Arguments
///
/// * `meta_data` - A string containing the metadata to be hashed.
///
/// # Returns
///
/// A JsValue containing the hash generated using the Blake2b algorithm.
#[wasm_bindgen(js_name = "encodeLowerBlake2b")]
pub fn encode_lower_blake2b(meta_data: &str) -> JsValue {
    get_blake2b_hash(meta_data).into()
}

/// Converts a key and value into a formatted dictionary item key for ditionaries queries.
///
/// # Arguments
///
/// * `key` - A string representation of a account/contract hash as a Key.
/// * `value` - A string representation of the value, for now restricted to parse as U256 or Key
///
/// # Returns
///
/// A string representing the formatted dictionary item key.
///
#[wasm_bindgen(js_name = "makeDictionaryItemKey")]
pub fn make_dictionary_item_key(key: Key, value: &str) -> String {
    // Try to parse value as U256, default to zero if unsuccessful
    let value_as_u256 = U256::from_dec_str(value).unwrap_or_default();

    // If value_as_u256 is zero, attempt to parse it as a key and return the result
    if value_as_u256 == U256::zero() {
        match Key::from_formatted_str(value) {
            Ok(value_as_key) => make_dictionary_item_key_helper(key, &value_as_key),
            Err(err) => {
                error(&format!("Error serializing key: {:?}", err));
                String::from("")
            }
        }
    } else {
        // Otherwise, proceed with the original key and parsed value_as_u256
        make_dictionary_item_key_helper(key, &value_as_u256)
    }
}
