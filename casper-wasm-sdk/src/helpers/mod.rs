use crate::js::externs::error;
use js_sys::Date;
use serde::Serialize;
use serde_wasm_bindgen::Serializer;
use wasm_bindgen::JsValue;

pub fn serialize_result<T, E>(result: Result<T, E>) -> JsValue
where
    T: Serialize,
    E: std::error::Error,
{
    match result {
        Ok(data) => {
            let serializer =
                Serializer::json_compatible().serialize_large_number_types_as_bigints(true);
            match data.serialize(&serializer) {
                Ok(json) => json,
                Err(err) => {
                    error(&format!("Error serializing data to JSON: {:?}", err));
                    JsValue::null()
                }
            }
        }
        Err(err) => {
            error(&format!("Error occurred: {:?}", err));
            JsValue::null()
        }
    }
}

pub fn get_current_timestamp(timestamp: &Option<String>) -> String {
    let current_timestamp: String = match timestamp {
        Some(ts) if !ts.is_empty() => {
            // Attempt to parse the timestamp as a number
            if let Ok(parsed_time) = ts.parse::<f64>() {
                // Create a JavaScript Date object and set its time
                let js_date = Date::new_0();
                js_date.set_time(parsed_time);
                // Get the RFC3339-like formatted timestamp
                js_date.to_iso_string().as_string().unwrap_or_default()
            } else {
                // If the timestamp couldn't be parsed, use the current time
                let js_date = Date::new_0();
                js_date.to_iso_string().as_string().unwrap_or_default()
            }
        }
        _ => {
            let js_date = Date::new_0();
            js_date.to_iso_string().as_string().unwrap_or_default()
        }
    };

    current_timestamp
}

pub fn get_str_or_default(opt_str: Option<&String>) -> &str {
    opt_str.map(String::as_str).unwrap_or_default()
}
