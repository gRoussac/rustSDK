use casper_types::{DeployHash as _DeployHash, Digest};
use wasm_bindgen::prelude::*;

#[derive(Debug)]
#[wasm_bindgen]
pub struct DeployHash(_DeployHash);

impl From<DeployHash> for _DeployHash {
    fn from(deploy_hash: DeployHash) -> Self {
        deploy_hash.0
    }
}

impl From<_DeployHash> for DeployHash {
    fn from(deploy_hash: _DeployHash) -> Self {
        DeployHash(deploy_hash)
    }
}

#[wasm_bindgen]
impl DeployHash {
    #[wasm_bindgen(constructor)]
    pub fn new(hex_str: &str) -> Result<DeployHash, JsValue> {
        let bytes = hex::decode(hex_str).map_err(|err| JsValue::from_str(&format!("{:?}", err)))?;
        let mut hash = [0u8; 32];
        hash.copy_from_slice(&bytes);
        Ok(DeployHash(Digest::from(hash).into()))
    }
}
