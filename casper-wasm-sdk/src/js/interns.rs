use crate::debug::log;
use crate::helpers::get_current_timestamp;
use crate::helpers::hex_to_uint8_vec;
use crate::{debug::error, helpers::secret_key_from_pem, types::verbosity::Verbosity};
use casper_types::PublicKey;
use gloo_utils::format::JsValueSerdeExt;
use rust_decimal::prelude::*;
use std::str::FromStr;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "hexToString")]
pub fn hex_to_string_js_alias(hex_string: &str) -> String {
    match hex::decode(hex_string) {
        Ok(bytes) => String::from_utf8_lossy(&bytes).to_string(),
        Err(_) => hex_string.to_string(),
    }
}

#[wasm_bindgen(js_name = "hexToUint8Array")]
pub fn hex_to_uint8_vec_js_alias(hex_string: &str) -> Vec<u8> {
    hex_to_uint8_vec(hex_string)
}

#[wasm_bindgen(js_name = "motesToCSPR")]
pub fn motes_to_cspr_js_alias(motes: &str) -> String {
    match Decimal::from_str(motes) {
        Ok(motes_decimal) => {
            let cspr_decimal = motes_decimal / Decimal::new(1_000_000_000, 0);
            let cspr_f64 = cspr_decimal.to_f64().unwrap_or(0.0);
            let formatted_cspr = format!("{:.2}", cspr_f64);
            if formatted_cspr.ends_with(".00") {
                formatted_cspr.replace(".00", "")
            } else {
                formatted_cspr
            }
        }
        Err(_) => {
            error("Failed to parse input as Decimal");
            "Invalid input".to_string()
        }
    }
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
