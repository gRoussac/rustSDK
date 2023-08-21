use casper_client::Verbosity as _Verbosity;
use serde::Deserialize;
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Copy)]
#[wasm_bindgen]
pub enum Verbosity {
    Low = 0,
    Medium = 1,
    High = 2,
}

impl From<Verbosity> for u64 {
    fn from(verbosity: Verbosity) -> Self {
        match verbosity {
            Verbosity::Low => 0,
            Verbosity::Medium => 1,
            Verbosity::High => 2,
        }
    }
}

impl From<Verbosity> for _Verbosity {
    fn from(verbosity: Verbosity) -> Self {
        match verbosity {
            Verbosity::Low => _Verbosity::Low,
            Verbosity::Medium => _Verbosity::Medium,
            Verbosity::High => _Verbosity::High,
        }
    }
}

impl From<_Verbosity> for Verbosity {
    fn from(verbosity: _Verbosity) -> Self {
        match verbosity {
            _Verbosity::Low => Verbosity::Low,
            _Verbosity::Medium => Verbosity::Medium,
            _Verbosity::High => Verbosity::High,
        }
    }
}
