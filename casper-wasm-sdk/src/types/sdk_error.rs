use casper_client::{cli::CliError, cli::JsonArgsError, Error};
use casper_types::{CLValueError, KeyFromStrError, UIntParseError, URefFromStrError};
use humantime::{DurationError, TimestampError};
use std::num::ParseIntError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum SdkError {
    #[error("failed to parse {context} as a key: {error}")]
    FailedToParseKey {
        context: &'static str,
        error: KeyFromStrError,
    },

    #[error("failed to parse {context} as a public key: {error}")]
    FailedToParsePublicKey {
        context: String,
        error: casper_types::crypto::Error,
    },

    #[error("failed to parse {context} as an account hash: {error}")]
    FailedToParseAccountHash {
        context: &'static str,
        error: casper_types::addressable_entity::FromStrError,
    },

    #[error("failed to parse '{context}' as a uref: {error}")]
    FailedToParseURef {
        context: &'static str,
        error: URefFromStrError,
    },

    #[error("failed to parse '{context}' as an integer: {error}")]
    FailedToParseInt {
        context: &'static str,
        error: ParseIntError,
    },

    #[error("failed to parse '{context}' as a time diff: {error}")]
    FailedToParseTimeDiff {
        context: &'static str,
        error: DurationError,
    },

    #[error("failed to parse '{context}' as a timestamp: {error}")]
    FailedToParseTimestamp {
        context: &'static str,
        error: TimestampError,
    },

    #[error("failed to parse '{context}' as u128, u256, or u512: {error:?}")]
    FailedToParseUint {
        context: &'static str,
        error: UIntParseError,
    },

    #[error("failed to parse '{context}' as a hash digest: {error:?}")]
    FailedToParseDigest {
        context: &'static str,
        error: casper_types::DigestError,
    },

    #[error("failed to parse state identifier")]
    FailedToParseStateIdentifier,

    #[error("conflicting arguments passed '{context}' {args:?}")]
    ConflictingArguments { context: String, args: Vec<String> },

    #[error("invalid CLValue error: {0}")]
    InvalidCLValue(String),

    #[error("invalid argument '{context}': {error}")]
    InvalidArgument {
        context: &'static str,
        error: String,
    },

    #[error("failed to parse json-args to JSON: {0}. They should be a JSON Array of Objects, each of the form {{\"name\":<String>,\"type\":<VALUE>,\"value\":<VALUE>}}")]
    FailedToParseJsonArgs(#[from] serde_json::Error),

    #[error(transparent)]
    JsonArgs(#[from] JsonArgsError),

    #[error(transparent)]
    Core(#[from] Error),
}

impl From<CLValueError> for SdkError {
    fn from(error: CLValueError) -> Self {
        match error {
            CLValueError::Serialization(bytesrepr_error) => SdkError::Core(bytesrepr_error.into()),
            CLValueError::Type(type_mismatch) => {
                SdkError::InvalidCLValue(type_mismatch.to_string())
            }
        }
    }
}

impl From<CliError> for SdkError {
    fn from(error: CliError) -> Self {
        match error {
            CliError::FailedToParseKey { context, error } => {
                SdkError::FailedToParseKey { context, error }
            }
            CliError::FailedToParsePublicKey { context, error } => {
                SdkError::FailedToParsePublicKey { context, error }
            }
            CliError::FailedToParseAccountHash { context, error } => {
                SdkError::FailedToParseAccountHash { context, error }
            }
            CliError::FailedToParseURef { context, error } => {
                SdkError::FailedToParseURef { context, error }
            }
            CliError::FailedToParseInt { context, error } => {
                SdkError::FailedToParseInt { context, error }
            }
            CliError::FailedToParseTimeDiff { context, error } => {
                SdkError::FailedToParseTimeDiff { context, error }
            }
            CliError::FailedToParseTimestamp { context, error } => {
                SdkError::FailedToParseTimestamp { context, error }
            }
            CliError::FailedToParseUint { context, error } => {
                SdkError::FailedToParseUint { context, error }
            }
            CliError::FailedToParseDigest { context, error } => {
                SdkError::FailedToParseDigest { context, error }
            }
            CliError::FailedToParseStateIdentifier => SdkError::FailedToParseStateIdentifier,
            CliError::ConflictingArguments { context, args } => {
                SdkError::ConflictingArguments { context, args }
            }
            CliError::InvalidCLValue(error) => SdkError::InvalidCLValue(error),
            CliError::InvalidArgument { context, error } => {
                SdkError::InvalidArgument { context, error }
            }
            CliError::FailedToParseJsonArgs(json_error) => {
                SdkError::FailedToParseJsonArgs(json_error)
            }
            CliError::JsonArgs(json_args_error) => SdkError::JsonArgs(json_args_error),
            CliError::Core(core_error) => SdkError::Core(core_error),
        }
    }
}
