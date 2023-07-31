use casper_types::account::AccountHash as _AccountHash;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct AccountHash(_AccountHash);

#[wasm_bindgen]
impl AccountHash {
    #[wasm_bindgen(constructor)]
    pub fn new(account_hash: JsValue) -> Result<AccountHash, JsValue> {
        let account_hash: _AccountHash =
            serde_wasm_bindgen::from_value(account_hash).map_err(|err| {
                JsValue::from_str(&format!("Failed to deserialize AccountHash: {:?}", err))
            })?;
        Ok(AccountHash(account_hash))
    }

    #[wasm_bindgen(js_name = toFormattedString)]
    pub fn to_formatted_string(&self) -> String {
        self.0.to_formatted_string()
    }

    #[wasm_bindgen(js_name = fromFormattedStr)]
    pub fn from_formatted_str(input: &str) -> Result<AccountHash, JsValue> {
        let account_hash = _AccountHash::from_formatted_str(input).map_err(|err| {
            JsValue::from_str(&format!(
                "Failed to parse AccountHash from formatted string: {:?}",
                err
            ))
        })?;
        Ok(AccountHash(account_hash))
    }
}

impl From<AccountHash> for _AccountHash {
    fn from(account_hash: AccountHash) -> Self {
        account_hash.0
    }
}

impl From<_AccountHash> for AccountHash {
    fn from(account_hash: _AccountHash) -> Self {
        AccountHash(account_hash)
    }
}
