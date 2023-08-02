use casper_client::cli::DeployStrParams as _DeployStrParams;
use once_cell::sync::OnceCell;
use wasm_bindgen::prelude::*;

use crate::{helpers::get_current_timestamp, js::externs::log};

#[wasm_bindgen]
#[derive(Default, Debug, Clone)]
pub struct DeployStrParams {
    secret_key: OnceCell<String>,
    timestamp: OnceCell<String>,
    ttl: OnceCell<String>,
    chain_name: OnceCell<String>,
    session_account: OnceCell<String>,
}

#[wasm_bindgen]
impl DeployStrParams {
    #[wasm_bindgen(constructor)]
    pub fn new(
        secret_key: String,
        chain_name: String,
        session_account: String,
        timestamp: Option<String>,
        ttl: Option<String>,
    ) -> Self {
        let current_timestamp = get_current_timestamp(&timestamp);

        let _ttl = OnceCell::new();
        if let Some(ttl_value) = ttl {
            _ttl.set(ttl_value).unwrap();
        } else {
            _ttl.set("30m".to_string()).unwrap();
        }

        // TODO Fix ttl `humantime::parse_duration` with get_current_ttl(&ttl)
        log(&format!("_ttl {:?}", _ttl));

        DeployStrParams {
            chain_name: OnceCell::from(chain_name),
            secret_key: OnceCell::from(secret_key),
            session_account: OnceCell::from(session_account),
            timestamp: OnceCell::from(current_timestamp),
            ttl: _ttl,
        }
    }

    // Getter and setter for secret_key field
    #[wasm_bindgen(getter)]
    pub fn secret_key(&self) -> Option<String> {
        self.secret_key.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_secret_key(&self, secret_key: String) {
        self.secret_key.set(secret_key).unwrap();
    }

    // Getter and setter for timestamp field
    #[wasm_bindgen(getter)]
    pub fn timestamp(&self) -> Option<String> {
        self.timestamp.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_timestamp(&self, timestamp: String) {
        self.timestamp.set(timestamp).unwrap();
    }

    // Getter and setter for ttl field
    #[wasm_bindgen(getter)]
    pub fn ttl(&self) -> Option<String> {
        self.ttl.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_ttl(&self, ttl: String) {
        self.ttl.set(ttl).unwrap();
    }

    // Getter and setter for chain_name field
    #[wasm_bindgen(getter)]
    pub fn chain_name(&self) -> Option<String> {
        self.chain_name.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_chain_name(&self, chain_name: String) {
        self.chain_name.set(chain_name).unwrap();
    }

    // Getter and setter for session_account field
    #[wasm_bindgen(getter)]
    pub fn session_account(&self) -> Option<String> {
        self.session_account.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_account(&self, session_account: String) {
        self.session_account.set(session_account).unwrap();
    }
}

// Convert DeployStrParams to casper_client::cli::DeployStrParams
pub fn deploy_str_params_to_casper_client(deploy_params: &DeployStrParams) -> _DeployStrParams<'_> {
    _DeployStrParams {
        secret_key: deploy_params.secret_key.get().unwrap().as_str(),
        timestamp: deploy_params.timestamp.get().unwrap().as_str(),
        ttl: deploy_params.ttl.get().unwrap().as_str(),
        chain_name: deploy_params.chain_name.get().unwrap().as_str(),
        session_account: deploy_params.session_account.get().unwrap().as_str(),
    }
}
