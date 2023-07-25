mod error;
pub mod json_rpc;
pub mod rpcs;
pub mod types;
mod validation;
pub mod verbosity;

pub use error::Error;
pub use json_rpc::{JsonRpcId, SuccessResponse};
use rpcs::{
    common::BlockIdentifier,
    get_state_root_hash::{
        GetStateRootHashParams, GetStateRootHashResult, GET_STATE_ROOT_HASH_METHOD,
    },
};
pub use verbosity::Verbosity;

use json_rpc::JsonRpcCall;

pub async fn get_state_root_hash(
    rpc_id: JsonRpcId,
    node_address: &str,
    verbosity: Verbosity,
    maybe_block_identifier: Option<BlockIdentifier>,
) -> Result<SuccessResponse<GetStateRootHashResult>, Error> {
    let params = maybe_block_identifier.map(GetStateRootHashParams::new);
    JsonRpcCall::new(rpc_id, node_address, verbosity)
        .send_request(GET_STATE_ROOT_HASH_METHOD, params)
        .await
}
