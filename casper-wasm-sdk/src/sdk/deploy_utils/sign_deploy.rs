#[cfg(target_arch = "wasm32")]
pub use crate::helpers::serialize_result;
pub use crate::types::deploy::Deploy;
pub use crate::SDK;
pub use casper_types::Deploy as _Deploy;
pub use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "sign_deploy")]
    pub fn sign_deploy_js_alias(&mut self, deploy: Deploy, secret_key: &str) -> JsValue {
        let deploy = sign_deploy(deploy, secret_key);
        serialize_result::<_Deploy, casper_types::Error>(Ok(deploy.into()))
    }
}

impl SDK {
    pub fn sign_deploy(&mut self, deploy: Deploy, secret_key: &str) -> Deploy {
        sign_deploy(deploy, secret_key)
    }
}

pub(crate) fn sign_deploy(mut deploy: Deploy, secret_key: &str) -> Deploy {
    //log("sign_deploy!");
    deploy.sign(secret_key)
}
