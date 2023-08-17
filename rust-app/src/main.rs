use casper_wasm_sdk::{sdk::SDK, types::verbosity::Verbosity};

#[tokio::main]
async fn main() {
    println!("Bye world!");
    let mut sdk = SDK::new();
    let peers = sdk
        .get_peers("https://rpc.integration.casperlabs.io", Verbosity::High)
        .await;
    dbg!(&format!("{:?}", peers));
}
