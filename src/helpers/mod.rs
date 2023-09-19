use std::str::FromStr;

use crate::debug::error;
use crate::types::public_key::PublicKey;
use crate::types::sdk_error::SdkError;
use crate::types::verbosity::Verbosity;
use casper_client::cli::JsonArg;
use casper_types::cl_value::cl_value_to_json as cl_value_to_json_from_casper_types;
use casper_types::{
    CLValue, DeployBuilder, ErrorExt, PublicKey as CasperTypesPublicKey, SecretKey, TimeDiff,
    Timestamp,
};
use casper_types::{NamedArg, RuntimeArgs};
use chrono::{DateTime, NaiveDateTime, SecondsFormat, Utc};
use gloo_utils::format::JsValueSerdeExt;
use rust_decimal::prelude::*;
use serde::Serialize;
use serde_json::Value;
use wasm_bindgen::{JsCast, JsValue};

pub fn cl_value_to_json(cl_value: &CLValue) -> Option<Value> {
    cl_value_to_json_from_casper_types(cl_value)
}

pub fn get_current_timestamp(timestamp: Option<String>) -> String {
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

pub fn get_ttl_or_default(ttl: Option<&str>) -> String {
    // TODO Fix ttl `humantime::parse_duration` with get_current_ttl(&ttl)
    // log(&format!("ttl {:?}", ttl));
    if let Some(ttl) = ttl {
        ttl.to_string()
    } else {
        DeployBuilder::DEFAULT_TTL.to_string()
    }
}

pub fn parse_timestamp(value: &str) -> Result<Timestamp, SdkError> {
    Timestamp::from_str(value).map_err(|error| SdkError::FailedToParseTimestamp {
        context: "timestamp",
        error,
    })
}

pub fn parse_ttl(value: &str) -> Result<TimeDiff, SdkError> {
    TimeDiff::from_str(value).map_err(|error| SdkError::FailedToParseTimeDiff {
        context: "ttl",
        error,
    })
}

pub fn get_gas_price_or_default(gas_price: Option<u64>) -> u64 {
    gas_price.unwrap_or(DeployBuilder::DEFAULT_GAS_PRICE)
}

pub(crate) fn get_str_or_default(opt_str: Option<&String>) -> &str {
    opt_str.map(String::as_str).unwrap_or_default()
}

pub fn secret_key_from_pem(secret_key: &str) -> Result<SecretKey, ErrorExt> {
    SecretKey::from_pem(secret_key)
}

pub fn public_key_from_private_key(secret_key: &str) -> Result<String, ErrorExt> {
    let secret_key_from_pem = secret_key_from_pem(secret_key);
    let public_key = match secret_key_from_pem {
        Ok(secret_key) => CasperTypesPublicKey::from(&secret_key),
        Err(err) => {
            error(&format!("Error in public_key_from_private_key: {:?}", err));
            return Err(err);
        }
    };
    let public_key_test: PublicKey = public_key.into();
    Ok(public_key_test.to_string())
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

pub fn hex_to_string(hex_string: &str) -> String {
    match hex::decode(hex_string) {
        Ok(bytes) => String::from_utf8_lossy(&bytes).to_string(),
        Err(_) => hex_string.to_string(),
    }
}

pub fn motes_to_cspr(motes: &str) -> String {
    match Decimal::from_str(motes) {
        Ok(motes_decimal) => {
            let cspr_decimal = motes_decimal / Decimal::new(1_000_000_000, 0);
            let formatted_cspr = cspr_decimal.to_string();
            if formatted_cspr.ends_with(".00") {
                formatted_cspr.replace(".00", "")
            } else {
                formatted_cspr
            }
        }
        Err(_) => {
            eprintln!("Failed to parse input as Decimal");
            "Invalid input".to_string()
        }
    }
}

pub fn json_pretty_print<T>(value: T, verbosity: Option<Verbosity>) -> String
where
    T: Serialize,
{
    // log("json_pretty_print");
    if let Ok(deserialized) = serde_json::to_value(&value) {
        let result = match verbosity {
            Some(Verbosity::Low) | None => Ok(deserialized.to_string()),
            Some(Verbosity::Medium) => casper_types::json_pretty_print(&deserialized),
            Some(Verbosity::High) => serde_json::to_string_pretty(&deserialized),
        }
        .map_err(|err| error(&format!("Error in json_pretty_print: {}", err)));

        match result {
            Ok(result) => result,
            Err(err) => {
                error(&format!("Error in json_pretty_print: {:?}", err));
                String::from("")
            }
        }
    } else {
        error("Deserialization error into_serde of json_pretty_print");
        String::from("")
    }
}

pub(crate) fn insert_js_value_arg(args: &mut RuntimeArgs, js_value_arg: JsValue) -> &RuntimeArgs {
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

pub(crate) fn insert_arg(args: &mut RuntimeArgs, new_arg: String) -> &RuntimeArgs {
    match serde_json::from_str::<JsonArg>(&new_arg) {
        Ok(json_arg) => {
            if let Ok(named_arg) = NamedArg::try_from(json_arg.clone()) {
                args.insert_cl_value(named_arg.name(), named_arg.cl_value().clone());
            }
        }
        Err(err) => {
            error(&format!("Error deserializing JSON argument: {:?}", err));
            let _ = casper_client::cli::insert_arg(&new_arg, args);
        }
    }
    args
}
