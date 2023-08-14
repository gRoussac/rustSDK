use crate::{helpers::serialize_result, js::externs::log, sdk::SDK, types::deploy::Deploy};
use casper_client::MAX_SERIALIZED_SIZE_OF_DEPLOY;
use casper_types::{Deploy as _Deploy, SecretKey};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub fn sign_deploy(&mut self, deploy: Deploy, secret_key: &str) -> JsValue {
        log("sign_deploy!");
        let mut deploy: _Deploy = deploy.into();

        let secret_key_result = SecretKey::from_pem(secret_key);
        if let Err(error) = secret_key_result {
            log(&format!("Error loading secret key: {:?}", error));
            return JsValue::null();
        }

        deploy.sign(&secret_key_result.unwrap());
        assert_eq!(deploy.is_valid_size(MAX_SERIALIZED_SIZE_OF_DEPLOY), Ok(()));
        serialize_result::<casper_types::Deploy, casper_types::Error>(Ok(deploy))
    }
}
