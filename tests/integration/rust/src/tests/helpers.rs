use casper_wasm_sdk::SDK;
use once_cell::sync::Lazy;
use sdk_tests::config::{get_test_config, TestConfig};

pub fn create_test_sdk() -> SDK {
    SDK::new()
}
pub static CONFIG: Lazy<TestConfig> = Lazy::new(get_test_config);
pub const DEFAULT_TTL: &str = "30m";
pub const TTL: &str = "1h";
pub const CHAIN_NAME: &str = "integration-test";
pub const DEFAULT_SESSION_ACCOUNT: &str =
    "01d589b1ff893657417d180148829e2e0c509182f0f4678c2af7d1ddd58012ccd9";
pub const DEFAULT_ACCOUNT_HASH: &str =
    "account-hash-6a8fc648a9efac10c32eddcbf8893b9554f57d061a8c472980c0b0cfa289f92d";
pub const DEFAULT_PURSE_UREF: &str =
    "uref-ec27c33bd8c257373c252561acb24ffdeb8b1ed611221cbfdb161aa02628b324-007";
#[cfg(test)]
pub const DEFAULT_BLOCK_HASH: &str =
    "0c44d568107aeb3bc898d8f1901efbd2d8e2754394235172546f5e409bc14aa1";
pub const DEFAULT_DEPLOY: &str = "397acea5a765565c7d11839f2d30bf07a8e7740350467d3a358f596835645445";
pub const DEFAULT_CONTRACT_HASH: &str =
    "hash-2549777f17f32b3966ca616ca9060c05b8e3a531eff42b67815024a4ce237ed8";
pub const DEFAULT_TARGET_ACCOUNT: &str =
    "0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54";
pub const DEFAULT_TEST_PRIVATE_KEY: &str = "-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIFQBgrG+PRSS0uehoYE15rjUP1J28UIjGWGvNpcsw+xU
-----END PRIVATE KEY-----";
