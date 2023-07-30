use super::{block_hash::BlockHash, digest::Digest};
use casper_client::rpcs::GlobalStateIdentifier as _GlobalStateIdentifier;
use wasm_bindgen::prelude::*;

#[derive(Debug)]
#[wasm_bindgen]
pub struct GlobalStateIdentifier(_GlobalStateIdentifier);

#[wasm_bindgen]
impl GlobalStateIdentifier {
    #[wasm_bindgen(constructor)]
    pub fn new(global_state_identifier: GlobalStateIdentifier) -> GlobalStateIdentifier {
        global_state_identifier
    }

    #[wasm_bindgen(js_name = fromBlockHash)]
    pub fn from_block_hash(block_hash: BlockHash) -> GlobalStateIdentifier {
        GlobalStateIdentifier(_GlobalStateIdentifier::BlockHash(block_hash.into()))
    }

    #[wasm_bindgen(js_name = fromBlockHeight)]
    pub fn from_block_height(block_height: u64) -> GlobalStateIdentifier {
        GlobalStateIdentifier(_GlobalStateIdentifier::BlockHeight(block_height))
    }

    #[wasm_bindgen(js_name = fromStateRootHash)]
    pub fn from_state_root_hash(state_root_hash: Digest) -> GlobalStateIdentifier {
        GlobalStateIdentifier(_GlobalStateIdentifier::StateRootHash(
            state_root_hash.into(),
        ))
    }
}

impl From<GlobalStateIdentifier> for _GlobalStateIdentifier {
    fn from(wrapper: GlobalStateIdentifier) -> Self {
        wrapper.0
    }
}

impl From<_GlobalStateIdentifier> for GlobalStateIdentifier {
    fn from(identifier: _GlobalStateIdentifier) -> Self {
        GlobalStateIdentifier(identifier)
    }
}
