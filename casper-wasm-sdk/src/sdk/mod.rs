use wasm_bindgen::prelude::*;
pub mod rpcs;

pub(crate) mod deploy;
pub use deploy::*;

pub(crate) mod deploy_utils;
pub use deploy_utils::*;

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
