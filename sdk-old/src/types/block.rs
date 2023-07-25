use std::fmt::{self, Display, Formatter};

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use casper_hashing::Digest;
use casper_types::bytesrepr::{self, ToBytes};

/// A cryptographic hash uniquely identifying a [`Block`].
///
/// # Note
///
/// The type of this field is currently the same for all versions of blocks, and furthermore it is
/// always a hash over the block's header.  However, *how* the hash is calculated can be different.
///
/// There are two separate functions to allow for validation of the block given the different
/// hash mechanisms: [`validate_block_hashes_v1`] and [`validate_block_hashes_v2`].
#[derive(
    Copy,
    Clone,
    Default,
    PartialOrd,
    Ord,
    PartialEq,
    Eq,
    Hash,
    Serialize,
    Deserialize,
    Debug,
    JsonSchema,
)]
#[serde(deny_unknown_fields)]
pub struct BlockHash(Digest);

impl BlockHash {
    /// Returns a new `BlockHash`.
    pub fn new(digest: Digest) -> Self {
        BlockHash(digest)
    }

    /// Returns a copy of the wrapped `Digest`.
    pub fn inner(&self) -> Digest {
        self.0
    }
}

impl Display for BlockHash {
    fn fmt(&self, formatter: &mut Formatter) -> fmt::Result {
        write!(formatter, "{}", self.0)
    }
}

// impl ToBytes for BlockHash {
//     fn write_bytes(&self, buffer: &mut Vec<u8>) -> Result<(), bytesrepr::Error> {
//         self.0.write_bytes(buffer)
//     }

//     fn to_bytes(&self) -> Result<Vec<u8>, bytesrepr::Error> {
//         self.0.to_bytes()
//     }

//     fn serialized_length(&self) -> usize {
//         self.0.serialized_length()
//     }
// }
