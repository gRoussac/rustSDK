use casper_client::{
    get_state_root_hash, rpcs::common::BlockIdentifier, Error, JsonRpcId, SuccessResponse,
    Verbosity,
};
use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct SDK {}

#[wasm_bindgen]
impl SDK {
    pub fn new() -> Self {
        SDK {}
    }

    pub async fn get_state_root_hash(&mut self) -> String {
        log("Hello Web Assembly!".to_string());
        let state_root_hash = get_state_root_hash(
            JsonRpcId::from(rand::thread_rng().gen::<i64>()),
            "http://localhost:3000",
            Verbosity::High,
            Some(BlockIdentifier::Height(7)),
        )
        .await
        .unwrap();
        //println!("State root hash: {state_root_hash}");
        log(format!("State root hash: {state_root_hash}"));
        state_root_hash.to_string()
    }

    // pub async fn get_block(&mut self) -> String {
    //     log("Hello Web Assembly!".to_string());
    //     let block = get_block(
    //         JsonRpcId::from(rand::thread_rng().gen::<i64>()),
    //         "http://localhost:3000",
    //         Verbosity::High,
    //         Some(BlockIdentifier::Height(7)),
    //     )
    //     .await
    //     .unwrap();
    //     log(format!("chain_get_block: {block}"));
    //     block.to_string()
    // }
}

impl Default for SDK {
    fn default() -> Self {
        Self::new()
    }
}

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: String);
}
