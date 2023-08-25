use casper_wasm_sdk::SDK;
use once_cell::sync::Lazy;
use sdk_tests::config::{get_test_config, TestConfig};

pub fn create_test_sdk() -> SDK {
    SDK::new()
}

pub static SDK: Lazy<SDK> = Lazy::new(create_test_sdk);
pub static CONFIG: Lazy<TestConfig> = Lazy::new(get_test_config);
pub const DEFAULT_TTL: &str = "30m";
pub const TTL: &str = "1h";
pub const CHAIN_NAME: &str = "integration-test";
pub const DEFAULT_SESSION_ACCOUNT: &str =
    "01d589b1ff893657417d180148829e2e0c509182f0f4678c2af7d1ddd58012ccd9";
