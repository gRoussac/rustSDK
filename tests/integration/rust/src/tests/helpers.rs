use crate::{
    config::{CEP78_CONTRACT, CHAIN_NAME, DEFAULT_NODE_ADDRESS, PRIVATE_KEY_NAME},
    tests::integration_tests::test_module::WAIT_TIME,
};
use casper_wasm_sdk::types::{
    account_identifier,
    block_hash::BlockHash,
    deploy_hash::DeployHash,
    deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    },
    public_key::PublicKey,
    uref::URef,
};
use casper_wasm_sdk::SDK;
use lazy_static::lazy_static;
use std::io::{self, Read};
use std::path::{Path, PathBuf};
use std::{fs::File, thread};
use tokio::sync::Mutex;

pub fn create_test_sdk() -> SDK {
    SDK::new()
}

pub fn read_wasm_file(file_path: &str) -> Result<Vec<u8>, io::Error> {
    let root_path = Path::new("src/wasm/");
    let path = root_path.join(file_path);
    let mut file = File::open(path)?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)?;
    Ok(buffer)
}

pub fn read_pem_file(file_path: &str) -> Result<String, io::Error> {
    let mut path_buf = PathBuf::new();
    path_buf.push(file_path);
    if file_path.is_empty() || !path_buf.exists() {
        path_buf.clear();
        path_buf.push(PRIVATE_KEY_NAME);
    }
    let mut file = match File::open(&path_buf) {
        Ok(file) => file,
        Err(err) => {
            eprintln!("{}", err);
            panic!();
        }
    };
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

pub async fn get_current_block_hash(node_address: &str) -> String {
    let blokckhash = *create_test_sdk()
        .get_block(node_address, None, None)
        .await
        .unwrap()
        .result
        .block
        .unwrap()
        .hash();

    let blokckhash: BlockHash = blokckhash.into();
    blokckhash.to_string()
}

pub async fn get_main_purse(node_address: &str, account_identifier_as_string: &str) -> String {
    let purse_uref: URef = create_test_sdk()
        .get_account(
            node_address,
            None,
            Some(account_identifier_as_string.to_owned()),
            None,
            None,
        )
        .await
        .unwrap()
        .result
        .account
        .main_purse()
        .into();
    purse_uref.to_formatted_string()
}

lazy_static! {
    pub static ref CEP78_INSTALLED_GUARD: Mutex<bool> = Mutex::new(false);
    pub static ref CEP78_REINSTALL_GUARD: Mutex<bool> = Mutex::new(false);
}

pub async fn install_cep78(
    account: &str,
    private_key: &str,
) -> Result<(), Box<dyn std::error::Error>> {
    let mut cep78_reinstall_guard = CEP78_REINSTALL_GUARD.lock().await;
    if *cep78_reinstall_guard {
        return Err("CEP78 contract already installed".into());
    }
    *cep78_reinstall_guard = true;
    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        account,
        Some(private_key.to_string()),
        None,
        None,
    );
    let session_params = SessionStrParams::default();
    let args_json = r#"[
        {"name": "collection_name", "type": "String", "value": "enhanced-nft-1"},
        {"name": "collection_symbol", "type": "String", "value": "ENFT-1"},
        {"name": "total_token_supply", "type": "U64", "value": 10},
        {"name": "ownership_mode", "type": "U8", "value": 0},
        {"name": "nft_kind", "type": "U8", "value": 1},
        {"name": "json_schema", "type": "String", "value": "nft-schema"},
        {"name": "allow_minting", "type": "Bool", "value": true},
        {"name": "owner_reverse_lookup_mode", "type": "U8", "value": 0},
        {"name": "nft_metadata_kind", "type": "U8", "value": 2},
        {"name": "identifier_mode", "type": "U8", "value": 0},
        {"name": "metadata_mutability", "type": "U8", "value": 1}
        ]"#;
    session_params.set_session_args_json(args_json);
    let payment_amount = "25500000000";
    let payment_params = PaymentStrParams::default();
    payment_params.set_payment_amount(payment_amount);
    let file_path = CEP78_CONTRACT;
    let module_bytes = match read_wasm_file(file_path) {
        Ok(module_bytes) => module_bytes,
        Err(err) => {
            return Err(format!("Error reading file {}: {:?}", file_path, err).into());
        }
    };
    session_params.set_session_bytes(module_bytes.into());
    let sdk = create_test_sdk();
    let install = sdk
        .install(
            DEFAULT_NODE_ADDRESS,
            deploy_params,
            session_params,
            payment_params,
        )
        .await;
    assert!(!install
        .as_ref()
        .unwrap()
        .result
        .api_version
        .to_string()
        .is_empty());

    let deploy_hash = DeployHash::from(install.as_ref().unwrap().result.deploy_hash);
    let deploy_hash_as_string = deploy_hash.to_string();
    assert!(!deploy_hash_as_string.is_empty());
    dbg!(deploy_hash_as_string.clone());
    // thread::sleep(WAIT_TIME * 40);

    let get_deploy = sdk
        .get_deploy(DEFAULT_NODE_ADDRESS, deploy_hash, Some(true), None)
        .await;
    let get_deploy = get_deploy.unwrap();
    assert!(!get_deploy.result.api_version.to_string().is_empty());
    assert!(!get_deploy.result.deploy.to_string().is_empty());
    dbg!(get_deploy.result.deploy);
    dbg!(deploy_hash_as_string);
    Ok(())
}

pub async fn install_cep78_if_needed(account: &str, private_key: &str) {
    let mut install_guard = CEP78_INSTALLED_GUARD.lock().await;
    if !(*install_guard) {
        let _ = install_cep78(account, private_key).await;
        *install_guard = true;
    }
}
