use casper_client::Verbosity as _Verbosity;
use wasm_bindgen::prelude::*;

#[derive(Debug)]
#[wasm_bindgen]
pub enum Verbosity {
    Low = 0,
    Medium = 1,
    High = 2,
}

impl From<Verbosity> for _Verbosity {
    fn from(wrapper: Verbosity) -> Self {
        match wrapper {
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
