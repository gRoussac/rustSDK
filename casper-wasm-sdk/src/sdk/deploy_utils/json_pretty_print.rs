use crate::{js::externs::error, sdk::SDK, types::verbosity::Verbosity};

use gloo_utils::format::JsValueSerdeExt;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub fn json_pretty_print(&mut self, value: JsValue, verbosity: Option<Verbosity>) -> JsValue {
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
}
