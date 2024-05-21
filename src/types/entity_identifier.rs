use super::{account_hash::AccountHash, public_key::PublicKey};
use casper_client::rpcs::EntityIdentifier as _EntityIdentifier;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use std::fmt;
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct EntityIdentifier(_EntityIdentifier);

#[wasm_bindgen]
impl EntityIdentifier {
    #[wasm_bindgen(constructor)]
    pub fn new(formatted_str: &str) -> Result<EntityIdentifier, JsValue> {
        Self::from_formatted_str(formatted_str)
    }

    #[wasm_bindgen(js_name = "fromFormattedStr")]
    pub fn from_formatted_str(formatted_str: &str) -> Result<EntityIdentifier, JsValue> {
        if formatted_str.contains("account-hash") {
            let account_hash = AccountHash::from_formatted_str(formatted_str)?;
            Ok(Self::from_entity_under_account_hash(account_hash))
        } else {
            let public_key = PublicKey::new(formatted_str)?;
            Ok(Self::from_entity_under_public_key(public_key))
        }
    }

    #[wasm_bindgen(js_name = "fromPublicKey")]
    pub fn from_entity_under_public_key(key: PublicKey) -> Self {
        EntityIdentifier(_EntityIdentifier::PublicKey(key.into()))
    }

    #[wasm_bindgen(js_name = "fromAccountHash")]
    pub fn from_entity_under_account_hash(account_hash: AccountHash) -> Self {
        EntityIdentifier(_EntityIdentifier::AccountHash(account_hash.into()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }
}

impl fmt::Display for EntityIdentifier {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match &self.0 {
            _EntityIdentifier::PublicKey(key) => write!(f, "{}", PublicKey::from(key.clone())),
            _EntityIdentifier::AccountHash(hash) => write!(f, "{}", hash.to_formatted_string()),
            // TODO
            _EntityIdentifier::EntityAddr(_) => todo!(),
        }
    }
}

impl From<EntityIdentifier> for PublicKey {
    fn from(account_identifier: EntityIdentifier) -> Self {
        match account_identifier {
            EntityIdentifier(_EntityIdentifier::PublicKey(key)) => key.into(),
            _ => unimplemented!("Conversion not implemented for EntityIdentifier to Key"),
        }
    }
}

impl From<EntityIdentifier> for _EntityIdentifier {
    fn from(account_identifier: EntityIdentifier) -> Self {
        account_identifier.0
    }
}

impl From<_EntityIdentifier> for EntityIdentifier {
    fn from(account_identifier: _EntityIdentifier) -> Self {
        EntityIdentifier(account_identifier)
    }
}

impl From<EntityIdentifier> for AccountHash {
    fn from(account_identifier: EntityIdentifier) -> Self {
        match account_identifier {
            EntityIdentifier(_EntityIdentifier::AccountHash(account_hash)) => account_hash.into(),
            _ => unimplemented!("Conversion not implemented for EntityIdentifier to AccountHash"),
        }
    }
}

impl From<PublicKey> for EntityIdentifier {
    fn from(key: PublicKey) -> Self {
        EntityIdentifier(_EntityIdentifier::PublicKey(key.into()))
    }
}

impl From<AccountHash> for EntityIdentifier {
    fn from(account_hash: AccountHash) -> Self {
        EntityIdentifier(_EntityIdentifier::AccountHash(account_hash.into()))
    }
}
