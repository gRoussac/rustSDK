use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    pub fn log_with_prefix(s: &str);
}

#[wasm_bindgen]
pub fn log(s: &str) {
    let prefixed_s = format!("wasm {}", s);
    log_with_prefix(&prefixed_s);
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    pub fn error(s: &str);
}
