use casper_client::rpcs::results::PeerEntry as _PeerEntry;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Deserialize, Serialize)]
#[wasm_bindgen]
pub struct PeerEntry(_PeerEntry);

#[wasm_bindgen]
impl PeerEntry {
    #[wasm_bindgen(getter)]
    pub fn node_id(&self) -> String {
        self.0.node_id.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn address(&self) -> String {
        self.0.address.clone()
    }
}

impl From<_PeerEntry> for PeerEntry {
    fn from(peer_entry: _PeerEntry) -> Self {
        PeerEntry(peer_entry)
    }
}

impl From<PeerEntry> for _PeerEntry {
    fn from(peer_entry: PeerEntry) -> Self {
        peer_entry.0
    }
}
