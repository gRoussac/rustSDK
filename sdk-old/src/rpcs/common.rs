//! Common types associated with sending and receiving JSON-RPCs.

use crate::types::BlockHash;

use serde::{Deserialize, Serialize};

/// Enum of possible ways to identify a [`Block`].
#[derive(Copy, Clone, PartialOrd, Ord, PartialEq, Eq, Hash, Serialize, Deserialize, Debug)]
#[serde(deny_unknown_fields)]
pub enum BlockIdentifier {
    /// Identify the block by its hash.
    Hash(BlockHash),
    /// Identify the block by its height.
    Height(u64),
}
