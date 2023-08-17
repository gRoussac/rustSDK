use crate::helpers::get_current_timestamp;
use crate::helpers::hex_to_uint8_vec;
use crate::{debug::error, helpers::secret_key_from_pem, types::verbosity::Verbosity};
use casper_types::PublicKey;
use gloo_utils::format::JsValueSerdeExt;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "hexToUint8Array")]
pub fn hex_to_uint8_vec_js_alias(hex_string: &str) -> Vec<u8> {
    hex_to_uint8_vec(hex_string)
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
    get_current_timestamp(&None).into()
}
