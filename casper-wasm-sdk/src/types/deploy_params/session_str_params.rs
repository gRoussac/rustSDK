use super::args_simple::ArgsSimple;
use crate::helpers::get_str_or_default;
use js_sys::Array;
use once_cell::sync::OnceCell;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Default, Debug, Clone)]
pub struct SessionStrParams {
    session_hash: OnceCell<String>,
    session_name: OnceCell<String>,
    session_package_hash: OnceCell<String>,
    session_package_name: OnceCell<String>,
    session_path: OnceCell<String>,
    session_args_simple: OnceCell<ArgsSimple>,
    session_args_json: OnceCell<String>,
    session_args_complex: OnceCell<String>,
    session_version: OnceCell<String>,
    session_entry_point: OnceCell<String>,
    is_session_transfer: OnceCell<bool>,
}

#[wasm_bindgen]
impl SessionStrParams {
    #[wasm_bindgen(constructor)]
    pub fn new() -> SessionStrParams {
        SessionStrParams::default()
    }

    // Getter and setter for session_hash field
    #[wasm_bindgen(getter)]
    pub fn session_hash(&self) -> Option<String> {
        self.session_hash.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_hash(&self, session_hash: String) {
        self.session_hash.set(session_hash).unwrap();
    }

    // Getter and setter for session_name field
    #[wasm_bindgen(getter)]
    pub fn session_name(&self) -> Option<String> {
        self.session_name.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_name(&self, session_name: String) {
        self.session_name.set(session_name).unwrap();
    }

    // Getter and setter for session_package_hash field
    #[wasm_bindgen(getter)]
    pub fn session_package_hash(&self) -> Option<String> {
        self.session_package_hash.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_package_hash(&self, session_package_hash: String) {
        self.session_package_hash.set(session_package_hash).unwrap();
    }

    // Getter and setter for session_package_name field
    #[wasm_bindgen(getter)]
    pub fn session_package_name(&self) -> Option<String> {
        self.session_package_name.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_package_name(&self, session_package_name: String) {
        self.session_package_name.set(session_package_name).unwrap();
    }

    // Getter and setter for session_path field
    #[wasm_bindgen(getter)]
    pub fn session_path(&self) -> Option<String> {
        self.session_path.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_path(&self, session_path: String) {
        self.session_path.set(session_path).unwrap();
    }

    // Getter and setter for session_args_simple field
    #[wasm_bindgen(getter)]
    pub fn session_args_simple(&self) -> Option<Array> {
        let args_simple = self.session_args_simple.get()?;
        let array: Array = args_simple.args().iter().map(JsValue::from).collect();
        Some(array)
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_args_simple(&self, session_args_simple: Array) {
        let args_simple: ArgsSimple = session_args_simple.into_iter().collect();
        self.session_args_simple.set(args_simple).unwrap();
    }

    // Getter and setter for session_args_json field
    #[wasm_bindgen(getter)]
    pub fn session_args_json(&self) -> Option<String> {
        self.session_args_json.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_args_json(&self, session_args_json: String) {
        self.session_args_json.set(session_args_json).unwrap();
    }

    // Getter and setter for session_args_complex field
    #[wasm_bindgen(getter)]
    pub fn session_args_complex(&self) -> Option<String> {
        self.session_args_complex.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_args_complex(&self, session_args_complex: String) {
        self.session_args_complex.set(session_args_complex).unwrap();
    }

    // Getter and setter for session_version field
    #[wasm_bindgen(getter)]
    pub fn session_version(&self) -> Option<String> {
        self.session_version.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_version(&self, session_version: String) {
        self.session_version.set(session_version).unwrap();
    }

    // Getter and setter for session_entry_point field
    #[wasm_bindgen(getter)]
    pub fn session_entry_point(&self) -> Option<String> {
        self.session_entry_point.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_entry_point(&self, session_entry_point: String) {
        self.session_entry_point.set(session_entry_point).unwrap();
    }

    // Getter and setter for is_session_transfer field
    #[wasm_bindgen(getter)]
    pub fn is_session_transfer(&self) -> Option<bool> {
        self.is_session_transfer.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_is_session_transfer(&self, is_session_transfer: bool) {
        self.is_session_transfer.set(is_session_transfer).unwrap();
    }
}

// Convert SessionStrParams to casper_client::cli::SessionStrParams
pub fn session_str_params_to_casper_client(
    session_params: &SessionStrParams,
) -> casper_client::cli::SessionStrParams<'_> {
    let session_args_simple: Vec<&str> = session_params
        .session_args_simple
        .get()
        .map_or_else(Vec::new, |args_simple| {
            args_simple.args().iter().map(String::as_str).collect()
        });

    // Use the appropriate `with_` method based on available fields as SessionStrParams is private
    if let Some(session_hash) = session_params.session_hash.get() {
        return casper_client::cli::SessionStrParams::with_hash(
            session_hash.as_str(),
            get_str_or_default(session_params.session_entry_point.get()),
            session_args_simple,
            get_str_or_default(session_params.session_args_json.get()),
            get_str_or_default(session_params.session_args_complex.get()),
        );
    }

    if let Some(session_name) = session_params.session_name.get() {
        return casper_client::cli::SessionStrParams::with_name(
            session_name.as_str(),
            get_str_or_default(session_params.session_entry_point.get()),
            session_args_simple,
            get_str_or_default(session_params.session_args_json.get()),
            get_str_or_default(session_params.session_args_complex.get()),
        );
    }

    if let Some(session_package_hash) = session_params.session_package_hash.get() {
        return casper_client::cli::SessionStrParams::with_package_hash(
            session_package_hash.as_str(),
            get_str_or_default(session_params.session_version.get()),
            get_str_or_default(session_params.session_entry_point.get()),
            session_args_simple,
            get_str_or_default(session_params.session_args_json.get()),
            get_str_or_default(session_params.session_args_complex.get()),
        );
    }

    if let Some(session_package_name) = session_params.session_package_name.get() {
        return casper_client::cli::SessionStrParams::with_package_name(
            session_package_name.as_str(),
            get_str_or_default(session_params.session_version.get()),
            get_str_or_default(session_params.session_entry_point.get()),
            session_args_simple,
            get_str_or_default(session_params.session_args_json.get()),
            get_str_or_default(session_params.session_args_complex.get()),
        );
    }

    // Default to Transfer type of Deploy
    casper_client::cli::SessionStrParams::with_transfer(
        session_args_simple,
        get_str_or_default(session_params.session_args_json.get()),
        get_str_or_default(session_params.session_args_complex.get()),
    )
}
