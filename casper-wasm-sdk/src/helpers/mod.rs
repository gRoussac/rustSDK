use crate::js::externs::error;
use chrono::{DateTime, NaiveDateTime, SecondsFormat, Utc};
use gloo_utils::format::JsValueSerdeExt;
use serde::Serialize;
use wasm_bindgen::JsValue;

pub fn serialize_result<T, E>(result: Result<T, E>) -> JsValue
where
    T: Serialize,
    E: std::error::Error,
{
    match result {
        Ok(data) => {
            // Let's not use serde-wasm-bindgen for now but from_serde as per https://rustwasm.github.io/wasm-bindgen/reference/arbitrary-data-with-serde.html
            // use serde_wasm_bindgen::Serializer;
            // let serializer =
            //     Serializer::json_compatible().serialize_large_number_types_as_bigints(true);
            match JsValue::from_serde(&data) {
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
    let parsed_timestamp = timestamp.as_ref().and_then(|ts| ts.parse::<i64>().ok());
    let current_timestamp = parsed_timestamp
        .map(|parsed_time| {
            NaiveDateTime::from_timestamp_opt(parsed_time / 1000, 0)
                .map(|naive_time| DateTime::<Utc>::from_utc(naive_time, Utc))
                .unwrap_or_else(Utc::now)
        })
        .unwrap_or_else(Utc::now);
    current_timestamp.to_rfc3339_opts(SecondsFormat::Secs, true)
}

pub fn get_str_or_default(opt_str: Option<&String>) -> &str {
    opt_str.map(String::as_str).unwrap_or_default()
}
