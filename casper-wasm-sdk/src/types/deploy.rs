use casper_types::Deploy as _Deploy;
use serde_wasm_bindgen;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone)]
#[wasm_bindgen]
pub struct Deploy(_Deploy);

#[wasm_bindgen]
impl Deploy {
    #[wasm_bindgen(constructor)]
    pub fn new(deploy: JsValue) -> Deploy {
        let deploy: _Deploy = serde_wasm_bindgen::from_value(deploy)
            .map_err(|err| JsValue::from_str(&format!("Failed to deserialize Deploy: {:?}", err)))
            .unwrap();
        Deploy(deploy)
    }
}

impl From<Deploy> for _Deploy {
    fn from(deploy: Deploy) -> Self {
        deploy.0
    }
}

impl From<_Deploy> for Deploy {
    fn from(deploy: _Deploy) -> Self {
        Deploy(deploy)
    }
}
