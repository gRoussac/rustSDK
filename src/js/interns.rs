use crate::helpers::get_current_timestamp;
use crate::helpers::hex_to_uint8_vec;
use crate::types::cl::bytes::Bytes;
use crate::{
    debug::error, helpers::hex_to_string, helpers::motes_to_cspr, helpers::secret_key_from_pem,
    types::verbosity::Verbosity,
};
use casper_types::PublicKey;
use gloo_utils::format::JsValueSerdeExt;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "hexToString")]
pub fn hex_to_string_js_alias(hex_string: &str) -> String {
    hex_to_string(hex_string)
}

#[wasm_bindgen(js_name = "hexToUint8Array")]
pub fn hex_to_uint8_vec_js_alias(hex_string: &str) -> Vec<u8> {
    hex_to_uint8_vec(hex_string)
}

#[wasm_bindgen(js_name = "uint8ArrayToBytes")]
pub fn uint8_array_to_bytes(uint8_array: js_sys::Uint8Array) -> Bytes {
    Bytes::from_uint8_array(uint8_array)
}

#[wasm_bindgen(js_name = "motesToCSPR")]
pub fn motes_to_cspr_js_alias(motes: &str) -> String {
    motes_to_cspr(motes)
}

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

#[wasm_bindgen(js_name = "getTimestamp")]
pub fn get_timestamp() -> JsValue {
    get_current_timestamp(None).into()
}