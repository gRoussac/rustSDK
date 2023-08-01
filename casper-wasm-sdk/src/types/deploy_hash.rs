use super::digest::Digest;
use casper_types::Digest as _Digest;
use casper_types::{
    bytesrepr::{self, FromBytes, ToBytes},
    DeployHash as _DeployHash,
};
use wasm_bindgen::prelude::*;

#[derive(Debug)]
#[wasm_bindgen]
pub struct DeployHash(_DeployHash);

#[wasm_bindgen]
impl DeployHash {
    #[wasm_bindgen(constructor)]
    pub fn new(deploy_hash_hex_str: &str) -> Result<DeployHash, JsValue> {
        let bytes = hex::decode(deploy_hash_hex_str)
            .map_err(|err| JsValue::from_str(&format!("{:?}", err)))?;
        let mut hash = [0u8; _Digest::LENGTH];
        hash.copy_from_slice(&bytes);
        Self::from_digest(Digest::from(hash))
    }

    pub fn from_digest(digest: Digest) -> Result<DeployHash, JsValue> {
        Ok(_DeployHash::new(digest.into()).into())
    }
}

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

impl From<Digest> for DeployHash {
    fn from(digest: Digest) -> Self {
        _DeployHash::new(digest.into()).into()
    }
}

impl ToBytes for DeployHash {
    fn write_bytes(&self, writer: &mut Vec<u8>) -> Result<(), bytesrepr::Error> {
        self.0.write_bytes(writer)
    }

    fn serialized_length(&self) -> usize {
        self.0.serialized_length()
    }

    fn to_bytes(&self) -> Result<Vec<u8>, bytesrepr::Error> {
        self.0.to_bytes()
    }
}

impl FromBytes for DeployHash {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        let (digest, remainder) = Digest::from_bytes(bytes)?;
        Ok((DeployHash::from(digest), remainder))
    }
}
