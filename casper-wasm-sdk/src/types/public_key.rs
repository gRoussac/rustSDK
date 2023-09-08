use crate::{
    debug::error,
    types::{account_hash::AccountHash, purse_identifier::PurseIdentifier, uref::URef},
};
use casper_types::{
    bytesrepr::{self, FromBytes, ToBytes},
    PublicKey as _PublicKey,
};
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use std::fmt::{Display, Formatter, Result as FmtResult};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Deserialize, Clone, Serialize, PartialEq, Eq, PartialOrd, Ord)]
pub struct PublicKey(_PublicKey);

#[wasm_bindgen]
impl PublicKey {
    #[wasm_bindgen(constructor)]
    pub fn new(public_key_hex_str: &str) -> Result<PublicKey, JsValue> {
        let bytes = hex::decode(public_key_hex_str).map_err(|err| {
            error(&format!("PublicKey decode {:?}", err));
            JsValue::null()
        })?;
        let (public_key, _) = _PublicKey::from_bytes(&bytes).map_err(|err| {
            error(&format!("PublicKey from bytes {:?}", err));
            JsValue::null()
        })?;
        Ok(PublicKey(public_key))
    }

    #[wasm_bindgen(js_name = "fromUint8Array")]
    pub fn from_bytes(bytes: Vec<u8>) -> PublicKey {
        let (public_key, _) = _PublicKey::from_bytes(&bytes).unwrap();
        PublicKey(public_key)
    }

    #[wasm_bindgen(js_name = "toAccountHash")]
    pub fn to_account_hash(&self) -> AccountHash {
        AccountHash::from_public_key(self.0.clone().into())
    }

    #[wasm_bindgen(js_name = "toPurseUref")]
    pub fn to_purse_uref(&self) -> URef {
        PurseIdentifier::from_main_purse_under_public_key(self.0.clone().into()).into()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }
}

impl Display for PublicKey {
    fn fmt(&self, f: &mut Formatter) -> FmtResult {
        let bytes = self.0.to_bytes().unwrap_or_default();
        let hex_string = hex::encode(bytes);
        write!(f, "{}", hex_string)
    }
}

impl From<PublicKey> for _PublicKey {
    fn from(public_key: PublicKey) -> Self {
        public_key.0
    }
}

impl From<_PublicKey> for PublicKey {
    fn from(public_key: _PublicKey) -> Self {
        PublicKey(public_key)
    }
}

impl ToBytes for PublicKey {
    fn to_bytes(&self) -> Result<Vec<u8>, bytesrepr::Error> {
        self.0.to_bytes()
    }

    fn serialized_length(&self) -> usize {
        self.0.serialized_length()
    }

    fn write_bytes(&self, bytes: &mut Vec<u8>) -> Result<(), bytesrepr::Error> {
        self.0.write_bytes(bytes)
    }
}

impl FromBytes for PublicKey {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        let (public_key, remainder) = _PublicKey::from_bytes(bytes)?;
        Ok((PublicKey(public_key), remainder))
    }
}
