use crate::debug::error;
use casper_client::cli::JsonArg;
use casper_types::{DeployBuilder, ErrorExt, SecretKey};
use casper_types::{NamedArg, RuntimeArgs};
use chrono::{DateTime, NaiveDateTime, SecondsFormat, Utc};
use gloo_utils::format::JsValueSerdeExt;
use serde::Serialize;
use wasm_bindgen::{JsCast, JsValue};

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

pub fn get_ttl(ttl: Option<String>) -> String {
    // TODO Fix ttl `humantime::parse_duration` with get_current_ttl(&ttl)
    // log(&format!("ttl {:?}", ttl));
    if let Some(ttl) = ttl {
        ttl
    } else {
        DeployBuilder::DEFAULT_TTL.to_string()
    }
}

pub fn get_gas_price(gas_price: Option<u64>) -> u64 {
    gas_price.unwrap_or(DeployBuilder::DEFAULT_GAS_PRICE)
}

pub fn get_str_or_default(opt_str: Option<&String>) -> &str {
    opt_str.map(String::as_str).unwrap_or_default()
}

pub fn secret_key_from_pem(secret_key: &str) -> Result<SecretKey, ErrorExt> {
    SecretKey::from_pem(secret_key)
}

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

pub fn insert_arg(args: &mut RuntimeArgs, js_value_arg: JsValue) -> &RuntimeArgs {
    if js_sys::Object::instanceof(&js_value_arg) {
        let json_arg: Result<JsonArg, serde_json::Error> = js_value_arg.into_serde();
        let json_arg: Option<JsonArg> = match json_arg {
            Ok(arg) => Some(arg),
            Err(err) => {
                error(&format!("Error converting to JsonArg: {:?}", err));
                None
            }
        };
        if let Some(json_arg) = json_arg {
            let named_arg = NamedArg::try_from(json_arg);
            let named_arg: Option<NamedArg> = match named_arg {
                Ok(arg) => Some(arg),
                Err(err) => {
                    error(&format!("Error converting to NamedArg: {:?}", err));
                    None
                }
            };
            if let Some(named_arg) = named_arg {
                args.insert_cl_value(named_arg.name(), named_arg.cl_value().clone());
            }
        }
    } else if let Some(string_arg) = js_value_arg.as_string() {
        let simple_arg = string_arg;
        let _ = casper_client::cli::insert_arg(&simple_arg, args);
    } else {
        error("Error converting to JsonArg or Simple Arg");
    }
    args
}
