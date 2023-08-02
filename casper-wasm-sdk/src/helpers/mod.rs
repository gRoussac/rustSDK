use crate::js::externs::error;
use casper_client::Error;
use casper_types::Timestamp;
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

pub fn get_current_timestamp(timestamp: &Option<String>) -> String {
    let current_timestamp: String = match timestamp {
        Some(ts) if !ts.is_empty() => {
            // Attempt to parse the timestamp as a number
            if let Ok(parsed_time) = ts.parse::<u64>() {
                // Create a Timestamp object and use it to format the timestamp
                let timestamp = Timestamp::from(parsed_time);
                timestamp.to_string()
            } else {
                // If the timestamp couldn't be parsed, use the current time
                Timestamp::now().to_string()
            }
        }
        _ => {
            // If no timestamp is provided, use the current time
            Timestamp::now().to_string()
        }
    };

    current_timestamp
}
