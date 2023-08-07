use casper_types::URef;
use once_cell::sync::OnceCell;
use wasm_bindgen::prelude::*;

// Define structs for the different variants
#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct AccountNamedKey {
    key: OnceCell<String>,
    dictionary_name: OnceCell<String>,
    dictionary_item_key: OnceCell<String>,
}

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct ContractNamedKey {
    key: OnceCell<String>,
    dictionary_name: OnceCell<String>,
    dictionary_item_key: OnceCell<String>,
}

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct URefVariant {
    seed_uref: OnceCell<URef>,
    dictionary_item_key: OnceCell<String>,
}

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct DictionaryVariant {
    value: OnceCell<String>,
}

// Define individual enum variants using the corresponding structs
#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct DictionaryItemStrParams {
    account_named_key: Option<AccountNamedKey>,
    contract_named_key: Option<ContractNamedKey>,
    uref: Option<URefVariant>,
    dictionary: Option<DictionaryVariant>,
}

// Implement methods for each variant
#[wasm_bindgen]
impl DictionaryItemStrParams {}
