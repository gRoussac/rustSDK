use core::fmt;

use casper_client::{
    get_block, get_deploy, get_state_root_hash, rpcs::common::BlockIdentifier, JsonRpcId,
    Verbosity as _Verbosity,
};

use casper_types::DeployHash as _DeployHash;
use rand::Rng;
use wasm_bindgen::{
    convert::{FromWasmAbi, IntoWasmAbi},
    prelude::*,
};

static VERBOSITY: _Verbosity = _Verbosity::High;

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
        verbosity: Verbosity,
    ) -> String {
        log("state_root_hash!".to_string());
        log(format!("{node_address}"));
        log(format!("{block_identifier_height}"));
        log(format!("{:?}", VERBOSITY));
        let state_root_hash = get_state_root_hash(
            JsonRpcId::from(rand::thread_rng().gen::<i64>()),
            node_address,
            verbosity.into(),
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
        verbosity: Verbosity,
    ) -> String {
        log("chain_get_block!".to_string());
        let block = get_block(
            JsonRpcId::from(rand::thread_rng().gen::<i64>()),
            node_address,
            verbosity.into(),
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
        deploy_hash: DeployHash,
        finalized_approvals: bool,
        verbosity: Verbosity,
    ) -> String {
        log("info_get_deploy!".to_string());
        let info_get_deploy = get_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>()),
            node_address,
            verbosity.into(),
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
pub struct DeployHash(_DeployHash);

// Implement conversions between _DeployHash and DeployHash
impl From<DeployHash> for _DeployHash {
    fn from(val: DeployHash) -> Self {
        val.0
    }
}

impl From<_DeployHash> for DeployHash {
    fn from(val: _DeployHash) -> Self {
        DeployHash(val)
    }
}

// Implement wasm-bindgen traits for DeployHash
#[wasm_bindgen]
impl DeployHash {
    #[wasm_bindgen(constructor)]
    pub fn new(abi: Vec<u8>) -> Self {
        let mut bytes = [0u8; 32];
        bytes.copy_from_slice(&abi[..32]);
        DeployHash(_DeployHash::new(bytes.into()))
    }

    #[wasm_bindgen(js_name = intoAbi)]
    pub fn into_abi(&self) -> Vec<u8> {
        self.0.as_ref().to_vec()
    }
}

macro_rules! impl_from_enum {
    ($from:ty, $to:ty; $($variant:ident),*) => {
        impl From<$from> for $to {
            fn from(val: $from) -> Self {
                match val {
                    $(
                        <$from>::$variant => <$to>::$variant,
                    )*
                }
            }
        }
    };
}

#[wasm_bindgen]
pub enum Verbosity {
    Low,
    Medium,
    High,
}

impl_from_enum!(Verbosity, _Verbosity; Low, Medium, High);

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: String);
}
