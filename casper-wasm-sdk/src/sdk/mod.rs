use wasm_bindgen::prelude::*;
pub mod deploy;
pub mod deploy_utils;
pub mod rpcs;

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
