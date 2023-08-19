use casper_types::Deploy;
use casper_wasm_sdk::{
    debug::{error, log},
    helpers::hex_to_uint8_vec,
    types::{
        deploy_params::{
            deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
            session_str_params::SessionStrParams,
        },
        verbosity::Verbosity,
    },
    SDK,
};

#[tokio::main]
async fn main() {
    println!("Bye world!");
    let mut sdk = SDK::new();
    let peers = sdk
        .get_peers("https://rpc.integration.casperlabs.io", Verbosity::Low)
        .await;
    //dbg!(peers.unwrap());

    // let test = hex_to_uint8_vec("0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54");
    //  dbg!(test);
    // log("bound log to std");
    // error("bound error to std");
    // let deploy_params = DeployStrParams::new(
    //     "integration-test".to_string(),
    //     "01d589b1ff893657417d180148829e2e0c509182f0f4678c2af7d1ddd58012ccd9".to_string(),
    //     None,
    //     None,
    //     None,
    // );
    let deploy_params = DeployStrParams::default();
    deploy_params.set_chain_name("integration-test");
    deploy_params
        .set_session_account("01d589b1ff893657417d180148829e2e0c509182f0f4678c2af7d1ddd58012ccd9");
    // deploy_params.set_ttl(None);
    // deploy_params.set_timestamp(None);

    deploy_params.set_default_ttl();
    deploy_params.set_default_timestamp();

    let session_params = SessionStrParams::default();
    session_params
        .set_session_hash("9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477");
    session_params.set_session_entry_point("decimals");

    let payment_params = PaymentStrParams::default();
    payment_params.set_payment_amount("5500000000");

    let test_deploy: Deploy = sdk
        .make_deploy(deploy_params, session_params, payment_params)
        .unwrap();
    dbg!(test_deploy);
}
