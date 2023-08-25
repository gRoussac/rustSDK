use casper_wasm_sdk::types::verbosity::Verbosity;

pub struct TestConfig {
    pub node_address: String,
    pub verbosity: Option<Verbosity>,
}

pub fn get_test_config() -> TestConfig {
    TestConfig {
        node_address: "https://rpc.integration.casperlabs.io".to_string(),
        verbosity: Some(Verbosity::Low),
    }
}
