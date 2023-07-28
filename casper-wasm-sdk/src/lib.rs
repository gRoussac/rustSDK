use casper_client::{
    get_block, get_deploy, get_state_root_hash, rpcs::common::BlockIdentifier, JsonRpcId,
    Verbosity as _Verbosity,
};
use casper_types::{DeployHash as _DeployHash, Digest};
use rand::Rng;
use serde_wasm_bindgen;
use wasm_bindgen::prelude::*;

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
    pub async fn chain_get_block(
        &mut self,
        node_address: &str,
        block_identifier_height: u64,
        verbosity: Verbosity,
    ) -> JsValue {
        log("chain_get_block!".to_string());
        match get_block(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            Some(BlockIdentifier::Height(block_identifier_height)),
        )
        .await
        {
            Ok(block_result) => match serde_wasm_bindgen::to_value(&block_result) {
                Ok(json) => json,
                Err(err) => {
                    error(format!("Error serializing block to JSON: {:?}", err));
                    JsValue::null()
                }
            },
            Err(err) => {
                error(format!("Error occurred in chain_get_block: {:?}", err));
                JsValue::null()
            }
        }
    }

    #[wasm_bindgen]
    pub async fn info_get_deploy(
        &mut self,
        node_address: &str,
        deploy_hash: DeployHash,
        finalized_approvals: bool,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("info_get_deploy!".to_string());
        match get_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            deploy_hash.into(),
            finalized_approvals,
        )
        .await
        {
            Ok(info_get_deploy) => match serde_wasm_bindgen::to_value(&info_get_deploy) {
                Ok(json) => json,
                Err(err) => {
                    error(format!("Error serializing block to JSON: {:?}", err));
                    JsValue::null()
                }
            },
            Err(err) => {
                error(format!("Error occurred in info_get_deploy: {:?}", err));
                JsValue::null()
            }
        }
    }

    #[wasm_bindgen]
    pub async fn get_state_root_hash(
        &mut self,
        node_address: &str,
        block_identifier_height: u64,
        verbosity: Verbosity,
    ) -> JsValue {
        //  log("state_root_hash!".to_string());
        match get_state_root_hash(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            Some(BlockIdentifier::Height(block_identifier_height)),
        )
        .await
        {
            Ok(state_root_hash) => match serde_wasm_bindgen::to_value(&state_root_hash) {
                Ok(json) => json,
                Err(err) => {
                    error(format!("Error serializing block to JSON: {:?}", err));
                    JsValue::null()
                }
            },
            Err(err) => {
                error(format!("Error occurred in chain_get_block: {:?}", err));
                JsValue::null()
            }
        }
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

#[wasm_bindgen]
impl DeployHash {
    // Constructor to create an instance of DeployHash from a hexadecimal string
    #[wasm_bindgen(constructor)]
    pub fn new(hex_str: &str) -> Result<DeployHash, JsValue> {
        let bytes = hex::decode(hex_str).map_err(|err| JsValue::from_str(&format!("{:?}", err)))?;
        let mut hash = [0u8; 32];
        hash.copy_from_slice(&bytes);
        Ok(DeployHash(Digest::from(hash).into()))
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

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    pub fn error(s: String);
}
