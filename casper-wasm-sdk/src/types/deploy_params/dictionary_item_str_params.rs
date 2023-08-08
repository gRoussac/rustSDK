use once_cell::sync::OnceCell;
use wasm_bindgen::prelude::*;

use crate::types::uref::URef;

#[derive(Debug, Clone)]
pub struct AccountNamedKey {
    key: OnceCell<String>,
    dictionary_name: OnceCell<String>,
    dictionary_item_key: OnceCell<String>,
}

#[derive(Debug, Clone)]
pub struct ContractNamedKey {
    key: OnceCell<String>,
    dictionary_name: OnceCell<String>,
    dictionary_item_key: OnceCell<String>,
}

#[derive(Debug, Clone)]
pub struct URefVariant {
    seed_uref: OnceCell<URef>,
    dictionary_item_key: OnceCell<String>,
}

#[derive(Debug, Clone)]
pub struct DictionaryVariant {
    value: OnceCell<String>,
}

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct DictionaryItemStrParams {
    account_named_key: Option<AccountNamedKey>,
    contract_named_key: Option<ContractNamedKey>,
    uref: Option<URefVariant>,
    dictionary: Option<DictionaryVariant>,
}

#[wasm_bindgen]
impl DictionaryItemStrParams {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        DictionaryItemStrParams {
            account_named_key: None,
            contract_named_key: None,
            uref: None,
            dictionary: None,
        }
    }

    pub fn set_account_named_key(
        &mut self,
        key: String,
        dictionary_name: String,
        dictionary_item_key: String,
    ) {
        self.account_named_key = Some(AccountNamedKey {
            key: OnceCell::new(),
            dictionary_name: OnceCell::new(),
            dictionary_item_key: OnceCell::new(),
        });

        if let Some(account_named_key) = &mut self.account_named_key {
            let _ = account_named_key.key.set(key);
            let _ = account_named_key.dictionary_name.set(dictionary_name);
            let _ = account_named_key
                .dictionary_item_key
                .set(dictionary_item_key);
        }
    }

    pub fn set_contract_named_key(
        &mut self,
        key: String,
        dictionary_name: String,
        dictionary_item_key: String,
    ) {
        self.contract_named_key = Some(ContractNamedKey {
            key: OnceCell::new(),
            dictionary_name: OnceCell::new(),
            dictionary_item_key: OnceCell::new(),
        });

        if let Some(contract_named_key) = &mut self.contract_named_key {
            let _ = contract_named_key.key.set(key);
            let _ = contract_named_key.dictionary_name.set(dictionary_name);
            let _ = contract_named_key
                .dictionary_item_key
                .set(dictionary_item_key);
        }
    }

    pub fn set_uref(&mut self, seed_uref: URef, dictionary_item_key: String) {
        self.uref = Some(URefVariant {
            seed_uref: OnceCell::new(),
            dictionary_item_key: OnceCell::new(),
        });

        if let Some(uref) = &mut self.uref {
            let _ = uref.seed_uref.set(seed_uref);
            let _ = uref.dictionary_item_key.set(dictionary_item_key);
        }
    }

    pub fn set_dictionary(&mut self, value: String) {
        self.dictionary = Some(DictionaryVariant {
            value: OnceCell::new(),
        });

        if let Some(dictionary) = &mut self.dictionary {
            let _ = dictionary.value.set(value);
        }
    }
}

impl Default for DictionaryItemStrParams {
    fn default() -> Self {
        Self::new()
    }
}
