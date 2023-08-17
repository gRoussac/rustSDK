#[cfg(target_arch = "wasm32")]
pub use crate::helpers::serialize_result;
pub use crate::types::deploy::Deploy;
pub use crate::SDK;
pub use casper_types::Deploy as _Deploy;
pub use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    pub fn sign_deploy(&mut self, mut deploy: Deploy, secret_key: &str) -> JsValue {
        //log("sign_deploy!");
        deploy = deploy.sign(secret_key);
        serialize_result::<_Deploy, casper_types::Error>(Ok(deploy.into()))
    }
}
