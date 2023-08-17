use crate::{helpers::serialize_result, types::deploy::Deploy, SDK};
use casper_types::Deploy as _Deploy;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub fn sign_deploy(&mut self, mut deploy: Deploy, secret_key: &str) -> JsValue {
        //log("sign_deploy!");
        deploy = deploy.sign(secret_key);
        serialize_result::<_Deploy, casper_types::Error>(Ok(deploy.into()))
    }
}
