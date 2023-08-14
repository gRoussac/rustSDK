use crate::{js::externs::error, types::verbosity::Verbosity};
use gloo_utils::format::JsValueSerdeExt;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "hexToUint8Array")]
pub fn hex_to_uint8_vec(hex_string: &str) -> Vec<u8> {
    let mut bytes = Vec::with_capacity(hex_string.len() / 2);
    let mut hex_chars = hex_string.chars();
    while let (Some(a), Some(b)) = (hex_chars.next(), hex_chars.next()) {
        if let Ok(byte) = u8::from_str_radix(&format!("{}{}", a, b), 16) {
            bytes.push(byte);
        } else {
            // If an invalid hex pair is encountered, return an empty vector.
            return Vec::new();
        }
    }
    bytes
}

#[wasm_bindgen(js_name = "jsonPrettyPrint")]
pub fn json_pretty_print(value: JsValue, verbosity: Option<Verbosity>) -> JsValue {
    //log("json_pretty_print");
    if let Ok(deserialized) = value.into_serde::<serde_json::Value>() {
        let result = match verbosity {
            Some(Verbosity::Low) | None => Ok(deserialized.to_string()),
            Some(Verbosity::Medium) => casper_types::json_pretty_print(&deserialized),
            Some(Verbosity::High) => serde_json::to_string_pretty(&deserialized),
        }
        .map_err(|err| error(&format!("Error in json_pretty_print: {}", err)));

        match result {
            Ok(result) => result.into(),
            Err(err) => {
                error(&format!("Error in json_pretty_print: {:?}", err));
                JsValue::null()
            }
        }
    } else {
        error("Deserialization error into_serde of json_pretty_print");
        JsValue::null()
    }
}
