use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    pub fn log_with_prefix(s: &str);
}

#[wasm_bindgen]
pub fn log(s: &str) {
    let prefixed_s = format!("log wasm {}", s);
    #[cfg(target_arch = "wasm32")]
    log_with_prefix(&prefixed_s);
    #[cfg(not(target_arch = "wasm32"))]
    println!("{}", prefixed_s);
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console, js_name = error)]
    pub fn error_with_prefix(s: &str);
}

#[wasm_bindgen]
pub fn error(s: &str) {
    let prefixed_s = format!("error wasm {}", s);
    #[cfg(target_arch = "wasm32")]
    error_with_prefix(&prefixed_s);
    #[cfg(not(target_arch = "wasm32"))]
    println!("{}", prefixed_s);
}
