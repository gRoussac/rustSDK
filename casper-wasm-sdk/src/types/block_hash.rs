use casper_types::bytesrepr::{FromBytes, ToBytes};
use casper_types::BlockHash as _BlockHash;

use wasm_bindgen::prelude::*;
#[wasm_bindgen]
pub struct BlockHash(_BlockHash);

#[wasm_bindgen]
impl BlockHash {
    #[wasm_bindgen(constructor)]
    pub fn new(hash: &[u8]) -> Self {
        let (block_hash, _) =
            _BlockHash::from_bytes(hash).expect("Failed to create BlockHash from bytes");
        BlockHash(block_hash)
    }

    #[wasm_bindgen(js_name = toBytes)]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.0.to_bytes().expect("Failed to serialize BlockHash")
    }
}

impl From<BlockHash> for _BlockHash {
    fn from(block_hash: BlockHash) -> Self {
        block_hash.0
    }
}

impl From<_BlockHash> for BlockHash {
    fn from(block_hash: _BlockHash) -> Self {
        BlockHash(block_hash)
    }
}
