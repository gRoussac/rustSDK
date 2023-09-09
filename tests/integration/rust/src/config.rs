use crate::tests::helpers::{get_current_block_hash, get_main_purse, install_cep78, read_pem_file};
use casper_wasm_sdk::{
    helpers::public_key_from_private_key,
    types::{public_key::PublicKey, verbosity::Verbosity},
};
use lazy_static::lazy_static;
use tokio::sync::Mutex;

pub const DEFAULT_NODE_ADDRESS: &str = "http://localhost:11101";
pub const CHAIN_NAME: &str = "casper-net-1";
pub const PRIVATE_KEY_NAME: &str = "secret_key.pem";
// read_pem_file will look PRIVATE_KEY_NAME to root directory if relative path is not found (relative to root)
pub const PRIVATE_KEY_NCTL_PATH: &str =
    "./../../../../NCTL/casper-node/utils/nctl/assets/net-1/users/user-1/";
pub const DEFAULT_TTL: &str = "30m";
pub const TTL: &str = "1h";
pub const HELLO_CONTRACT: &str = "hello.wasm";
pub const CEP78_CONTRACT: &str = "cep78.wasm";
pub const DEFAULT_DEPLOY: &str = "397acea5a765565c7d11839f2d30bf07a8e7740350467d3a358f596835645445";
pub const DEFAULT_CONTRACT_HASH: &str =
    "hash-2549777f17f32b3966ca616ca9060c05b8e3a531eff42b67815024a4ce237ed8";
pub const DEFAULT_DICT_UREF: &str =
    "uref-386f3d77417ac76f7c0b8d5ea8764cb42de8e529a091da8e96e5f3c88f17e530-007";
pub const DEFAULT_DICT_KEY: &str =
    "dictionary-74a0be85886de68de6dbbfbdbda326dcb8dced653adff0680e242830ede967bf";

#[derive(Clone, Debug)]
pub struct TestConfig {
    pub node_address: String,
    pub verbosity: Option<Verbosity>,
    pub account: String,
    pub private_key: String,
    pub chain_name: String,
    pub block_hash: String,
    pub purse_uref: String,
    pub account_hash: String,
    pub target_account: String,
}

lazy_static! {
    pub static ref CONFIG: Mutex<Option<TestConfig>> = Mutex::new(None);
    pub static ref BLOCK_HASH_INITIALIZED: Mutex<bool> = Mutex::new(false);
}

pub async fn initialize_test_config() -> Result<TestConfig, Box<dyn std::error::Error>> {
    let mut block_hash_initialized_guard = BLOCK_HASH_INITIALIZED.lock().await;
    if *block_hash_initialized_guard {
        return Err("initialize_test_config called after block_hash already initialized".into());
    }
    let block_hash = get_current_block_hash(DEFAULT_NODE_ADDRESS).await;
    *block_hash_initialized_guard = true;
    let private_key = read_pem_file(&format!("{PRIVATE_KEY_NCTL_PATH}{PRIVATE_KEY_NAME}"))?;
    let private_key_target_account = read_pem_file(&format!(
        "{}{PRIVATE_KEY_NAME}",
        PRIVATE_KEY_NCTL_PATH.replace("user-1", "user-2")
    ))?;
    let account = public_key_from_private_key(&private_key).unwrap();
    let target_account = public_key_from_private_key(&private_key_target_account).unwrap();
    let public_key = PublicKey::new(&account).unwrap();
    let account_hash = public_key.to_account_hash().to_formatted_string();
    let purse_uref = get_main_purse(DEFAULT_NODE_ADDRESS, &account).await;
    // let _ = install_cep78(&account, &private_key).await;
    let config = TestConfig {
        node_address: DEFAULT_NODE_ADDRESS.to_string(),
        verbosity: Some(Verbosity::High),
        account,
        private_key,
        chain_name: CHAIN_NAME.to_string(),
        block_hash,
        purse_uref,
        account_hash,
        target_account,
    };
    Ok(config)
}

pub async fn get_config() -> TestConfig {
    initialize_test_config_if_needed().await;
    CONFIG.lock().await.clone().unwrap()
}

async fn initialize_test_config_if_needed() {
    let mut config_guard = CONFIG.lock().await;
    if config_guard.is_none() {
        *config_guard = Some(initialize_test_config().await.unwrap());
    }
}
