use super::{account_hash::AccountHash, addr::hash_addr::HashAddr, key::Key, uref::URef};
use casper_client::rpcs::DictionaryItemIdentifier as _DictionaryItemIdentifier;
use wasm_bindgen::prelude::*;

#[derive(Debug)]
#[wasm_bindgen]
pub struct DictionaryItemIdentifier(_DictionaryItemIdentifier);

#[wasm_bindgen]
impl DictionaryItemIdentifier {
    // static context
    #[wasm_bindgen(js_name = "newFromAccountInfo")]
    pub fn new_from_account_info(
        account_hash: AccountHash,
        dictionary_name: &str,
        dictionary_item_key: &str,
    ) -> Self {
        let key = Key::from_account(account_hash).to_formatted_string();
        DictionaryItemIdentifier(_DictionaryItemIdentifier::AccountNamedKey {
            key,
            dictionary_name: dictionary_name.to_string(),
            dictionary_item_key: dictionary_item_key.to_string(),
        })
    }

    // static context
    #[wasm_bindgen(js_name = "newFromContractInfo")]
    pub fn new_from_contract_info(
        contract_addr: HashAddr,
        dictionary_name: &str,
        dictionary_item_key: &str,
    ) -> Self {
        let key = Key::from_hash(contract_addr).to_formatted_string();
        DictionaryItemIdentifier(_DictionaryItemIdentifier::ContractNamedKey {
            key,
            dictionary_name: dictionary_name.to_string(),
            dictionary_item_key: dictionary_item_key.to_string(),
        })
    }

    // static context
    #[wasm_bindgen(js_name = "newFromSeedUref")]
    pub fn new_from_seed_uref(seed_uref: URef, dictionary_item_key: String) -> Self {
        DictionaryItemIdentifier(_DictionaryItemIdentifier::URef {
            seed_uref: seed_uref.into(),
            dictionary_item_key,
        })
    }

    // #[wasm_bindgen(js_name = newFromItemKey)]
    // pub fn new_from_item_key(item_key: Key) -> Result<JsValue, JsValue> {
    //     if item_key.as_dictionary().is_some() {
    //         Ok(JsValue::from(DictionaryItemIdentifier(
    //             _DictionaryItemIdentifier::Dictionary(item_key.to_formatted_string()),
    //         )))
    //     } else {
    //         Err(JsValue::from(Error::InvalidKeyVariant {
    //             expected_variant: "Key::Dictionary".to_string(),
    //             actual: JsValue::from(item_key.into()),
    //         }))
    //     }
    // }
}

impl From<DictionaryItemIdentifier> for _DictionaryItemIdentifier {
    fn from(dictionary_item_identifier: DictionaryItemIdentifier) -> Self {
        dictionary_item_identifier.0
    }
}

impl From<_DictionaryItemIdentifier> for DictionaryItemIdentifier {
    fn from(identifier: _DictionaryItemIdentifier) -> Self {
        DictionaryItemIdentifier(identifier)
    }
}
