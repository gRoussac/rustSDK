#[allow(hidden_glob_reexports)]
pub(crate) mod deploy;
pub mod rpcs;
pub use deploy::*;

pub(crate) mod deploy_utils;
pub(crate) use deploy_utils::*;

pub(crate) mod contract;
pub use contract::*;

pub use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct SDK {}

impl Default for SDK {
    fn default() -> Self {
        Self::new()
    }
}

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        SDK {}
    }
}
