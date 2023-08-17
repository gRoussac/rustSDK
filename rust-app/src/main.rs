use casper_wasm_sdk::{
    debug::{error, log},
    helpers::hex_to_uint8_vec,
    types::verbosity::Verbosity,
    SDK,
};

#[tokio::main]
async fn main() {
    println!("Bye world!");
    let sdk = SDK::new();
    let peers = sdk
        .get_peers("https://rpc.integration.casperlabs.io", Verbosity::Low)
        .await;
    dbg!(peers.unwrap());

    let test =
        hex_to_uint8_vec("0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54");
    dbg!(test);
    // log("bound log to std");
    // error("bound error to std");
    // sdk.make_deploy(deploy_params, session_params, payment_params);
}
