use crate::{
    helpers::{secret_key_from_pem, serialize_result},
    sdk::SDK,
    types::deploy::Deploy,
};
use casper_client::MAX_SERIALIZED_SIZE_OF_DEPLOY;
use casper_types::Deploy as _Deploy;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub fn sign_deploy(&mut self, deploy: Deploy, secret_key: &str) -> JsValue {
        //log("sign_deploy!");
        let mut deploy: _Deploy = deploy.into();
        deploy.sign(&secret_key_from_pem(secret_key).unwrap());
        assert_eq!(deploy.is_valid_size(MAX_SERIALIZED_SIZE_OF_DEPLOY), Ok(()));
        serialize_result::<casper_types::Deploy, casper_types::Error>(Ok(deploy))
    }
}
