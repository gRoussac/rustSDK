#[allow(hidden_glob_reexports)]
pub(crate) mod deploy;
pub mod rpcs;
pub use deploy::*;

pub(crate) mod deploy_utils;
pub(crate) use deploy_utils::*;

pub(crate) mod contract;
pub use contract::*;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct SDK {
    node_address: Option<String>,
}

impl Default for SDK {
    fn default() -> Self {
        Self::new(None)
    }
}

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(constructor)]
    pub fn new(node_address: Option<String>) -> Self {
        SDK { node_address }
    }
}

impl SDK {
    pub fn get_node_address(&self, node_address: Option<String>) -> String {
        node_address
            .as_ref()
            .cloned()
            .or_else(|| self.node_address.as_ref().map(String::to_owned))
            .unwrap_or_default()
    }
}
