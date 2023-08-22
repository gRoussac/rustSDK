use js_sys::Array;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize, Default)]
#[wasm_bindgen]
pub struct Path {
    path: Vec<String>,
}

#[wasm_bindgen]
impl Path {
    #[wasm_bindgen(constructor)]
    pub fn new(path: JsValue) -> Self {
        let path: Array = path.into();
        let path: Vec<String> = path
            .iter()
            .map(|value| {
                value
                    .as_string()
                    .unwrap_or_else(|| String::from("Invalid String"))
            })
            .collect();

        Path { path }
    }
}

impl From<Path> for Vec<String> {
    fn from(path: Path) -> Self {
        path.path
    }
}

impl From<Vec<String>> for Path {
    fn from(path: Vec<String>) -> Self {
        Path { path }
    }
}
