use wasm_bindgen::prelude::*;

pub mod account_put_deploy;
pub mod chain_get_block;
pub mod get_state_root_hash;
pub mod info_get_deploy;
pub mod query_global_state;
pub mod state_get_account_info;
pub mod state_get_balance;
pub mod state_get_dictionary_item;

#[wasm_bindgen]
pub struct SDK {}

impl Default for SDK {
    fn default() -> Self {
        Self::new()
    }
}

#[wasm_bindgen]
impl SDK {
    pub fn new() -> Self {
        SDK {}
    }
}
