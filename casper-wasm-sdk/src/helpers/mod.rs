use crate::js::externs::error;
use casper_client::Error;
use serde::Serialize;
use wasm_bindgen::JsValue;

pub fn serialize_result<T: Serialize>(result: Result<T, Error>) -> JsValue {
    match result {
        Ok(data) => match serde_wasm_bindgen::to_value(&data) {
            Ok(json) => json,
            Err(err) => {
                error(&format!("Error serializing data to JSON: {:?}", err));
                JsValue::null()
            }
        },
        Err(err) => {
            error(&format!("Error occurred: {:?}", err));
            JsValue::null()
        }
    }
}
