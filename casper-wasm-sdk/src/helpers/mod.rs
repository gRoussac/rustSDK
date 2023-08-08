use crate::js::externs::{error, log};
use casper_client::cli::CliError;
use casper_types::Deploy;
use js_sys::Date;
use wasm_bindgen::JsValue;

pub fn serialize_result<T, E>(result: Result<T, E>) -> JsValue
where
    T: serde::Serialize + std::fmt::Debug,
    E: std::error::Error,
{
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

pub fn stringify_deploy(result: Result<Deploy, CliError>) -> JsValue {
    match result {
        Ok(deploy) => {
            let serialized_deploy = format!("{:?}", deploy);
            JsValue::from_str(&serialized_deploy)
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
