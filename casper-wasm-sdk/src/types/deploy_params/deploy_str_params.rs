use crate::helpers::get_current_timestamp;
use crate::helpers::get_str_or_default;
use crate::helpers::get_ttl;
use casper_client::cli::DeployStrParams as _DeployStrParams;
use once_cell::sync::OnceCell;
use wasm_bindgen::prelude::*;

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
        chain_name: String,
        session_account: String,
        secret_key: Option<String>,
        timestamp: Option<String>,
        ttl: Option<String>,
    ) -> Self {
        let current_timestamp = get_current_timestamp(&timestamp);
        let ttl = get_ttl(ttl);
        let deploy_params = DeployStrParams::default();
        deploy_params.set_chain_name(chain_name);
        deploy_params.set_session_account(session_account);
        if let Some(secret_key) = secret_key {
            deploy_params.set_secret_key(secret_key);
        };
        deploy_params.set_timestamp(current_timestamp);
        deploy_params.set_ttl(ttl);
        deploy_params
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
        secret_key: get_str_or_default(deploy_params.secret_key.get()),
        timestamp: get_str_or_default(deploy_params.timestamp.get()),
        ttl: get_str_or_default(deploy_params.ttl.get()),
        chain_name: get_str_or_default(deploy_params.chain_name.get()),
        session_account: get_str_or_default(deploy_params.session_account.get()),
    }
}
