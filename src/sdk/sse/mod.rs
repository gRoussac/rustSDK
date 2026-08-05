//! Node SSE client, CES contract-event parser, and wait/watch helpers.
//!
//! Gated by Cargo feature `SSE` (aliases: `sse`, `watcher`).

pub mod ces;
pub mod client;
pub mod event;
pub mod framing;
pub mod watcher;

pub use ces::{
    parse_schemas_from_bytes, parse_schemas_from_hex, CesEvent, CesParseResult, CesParser,
    ContractMetadata, Schema, Schemas, EVENTS_NAMED_KEY, EVENTS_SCHEMA_NAMED_KEY,
};
pub use client::SSEClient;
pub use event::{
    parse_raw_event, should_handle_event, ApiVersionEvent, EventName, RawEvent, SSEPayload,
};
pub use framing::{extract_frames, url_with_start_from, SSEFrame};
pub use watcher::*;
