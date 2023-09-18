use crate::types::deploy::Deploy;
use crate::SDK;
use casper_types::Deploy as _Deploy;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "sign_deploy")]
    pub fn sign_deploy_js_alias(&mut self, deploy: Deploy, secret_key: &str) -> Deploy {
        sign_deploy(deploy.into(), secret_key)
    }
}

impl SDK {
    pub fn sign_deploy(&mut self, deploy: _Deploy, secret_key: &str) -> Deploy {
        sign_deploy(deploy, secret_key)
    }
}

pub(crate) fn sign_deploy(deploy: _Deploy, secret_key: &str) -> Deploy {
    //log("sign_deploy!");
    let mut deploy: Deploy = deploy.into();
    deploy.sign(secret_key)
}
