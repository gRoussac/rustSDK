use casper_client::rpcs::common::BlockIdentifier as _BlockIdentifier;
use wasm_bindgen::prelude::*;

use super::block_hash::BlockHash;

#[derive(Debug)]
#[wasm_bindgen]
pub struct BlockIdentifier(_BlockIdentifier);

#[wasm_bindgen]
impl BlockIdentifier {
    #[wasm_bindgen(constructor)]
    pub fn new(block_identifier: BlockIdentifier) -> BlockIdentifier {
        block_identifier
    }

    pub fn from_hash(hash: BlockHash) -> Self {
        BlockIdentifier(_BlockIdentifier::Hash(hash.into()))
    }

    #[wasm_bindgen(js_name = fromHeight)]
    pub fn from_height(height: u64) -> Self {
        BlockIdentifier(_BlockIdentifier::Height(height))
    }
}

impl From<BlockIdentifier> for _BlockIdentifier {
    fn from(block_identifier: BlockIdentifier) -> Self {
        block_identifier.0
    }
}

impl From<_BlockIdentifier> for BlockIdentifier {
    fn from(block_identifier: _BlockIdentifier) -> Self {
        BlockIdentifier(block_identifier)
    }
}
