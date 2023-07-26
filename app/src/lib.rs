use core::fmt;

use casper_client::{
    get_block, get_deploy, get_state_root_hash, rpcs::common::BlockIdentifier, JsonRpcId, Verbosity,
};

use casper_types::DeployHash;
use rand::Rng;
use wasm_bindgen::prelude::*;

static VERBOSITY: Verbosity = Verbosity::High;

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
    #[wasm_bindgen]
    pub async fn get_state_root_hash(
        &mut self,
        node_address: &str,
        block_identifier_height: u64,
        //  verbosity: _Verbosity,
    ) -> String {
        log("state_root_hash!".to_string());
        log(format!("{node_address}"));
        log(format!("{block_identifier_height}"));
        log(format!("{:?}", VERBOSITY));
        let state_root_hash = get_state_root_hash(
            JsonRpcId::from(rand::thread_rng().gen::<i64>()),
            node_address,
            VERBOSITY,
            Some(BlockIdentifier::Height(block_identifier_height)),
        )
        .await
        .unwrap();
        println!("State root hash: {state_root_hash}");
        log(format!("State root hash: {state_root_hash}"));
        state_root_hash.to_string()
    }

    pub async fn chain_get_block(
        &mut self,
        node_address: &str,
        block_identifier_height: u64,
    ) -> String {
        log("chain_get_block!".to_string());
        let block = get_block(
            JsonRpcId::from(rand::thread_rng().gen::<i64>()),
            node_address,
            VERBOSITY,
            Some(BlockIdentifier::Height(block_identifier_height)),
        )
        .await
        .unwrap();
        log(format!("chain_get_block: {block}"));
        block.to_string()
    }

    pub async fn info_get_deploy(
        &mut self,
        node_address: &str,
        deploy_hash: _DeployHash,
        finalized_approvals: bool,
    ) -> String {
        log("info_get_deploy!".to_string());
        let info_get_deploy = get_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>()),
            node_address,
            VERBOSITY,
            deploy_hash.into(),
            finalized_approvals,
        )
        .await
        .unwrap();
        log(format!("info_get_deploy: {info_get_deploy}"));
        info_get_deploy.to_string()
    }
}

#[wasm_bindgen]
#[derive(Debug)]
// Newtype wrapper for the original `casper_client::Verbosity` enum
pub struct _Verbosity(Verbosity);

impl From<_Verbosity> for Verbosity {
    fn from(_verbosity: _Verbosity) -> Self {
        _verbosity.0
    }
}

impl From<Verbosity> for _Verbosity {
    fn from(verbosity: Verbosity) -> Self {
        _Verbosity(verbosity)
    }
}

impl fmt::Display for _Verbosity {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match &self.0 {
            Verbosity::Low => write!(f, "Verbosity level: Low"),
            Verbosity::Medium => write!(f, "Verbosity level: Medium"),
            Verbosity::High => write!(f, "Verbosity level: High"),
        }
    }
}

// Newtype wrapper for the original `casper_types::DeployHash` type
#[wasm_bindgen]
pub struct _DeployHash(DeployHash);

impl From<_DeployHash> for DeployHash {
    fn from(_deploy_hash: _DeployHash) -> Self {
        _deploy_hash.0
    }
}

impl From<DeployHash> for _DeployHash {
    fn from(deploy_hash: DeployHash) -> Self {
        _DeployHash(deploy_hash)
    }
}

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: String);
}
