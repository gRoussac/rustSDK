use super::{deploy_hash::DeployHash, uref::URef};
use casper_types::Key as _Key;
use wasm_bindgen::prelude::*;

#[derive(Debug)]
#[wasm_bindgen]
pub struct Key(_Key);

#[wasm_bindgen]
impl Key {
    #[wasm_bindgen(constructor)]
    pub fn new(key: Key) -> Result<Key, JsValue> {
        let key: _Key = key.into();
        Ok(Key(key))
    }

    #[wasm_bindgen(js_name = fromURef)]
    pub fn from_uref(key: URef) -> Key {
        Key(_Key::URef(key.into()))
    }

    #[wasm_bindgen(js_name = fromDeployInfo)]
    pub fn from_deploy_info(key: DeployHash) -> Key {
        Key(_Key::DeployInfo(key.into()))
    }
}

impl From<Key> for _Key {
    fn from(wrapper: Key) -> Self {
        wrapper.0
    }
}

impl From<_Key> for Key {
    fn from(key: _Key) -> Self {
        Key(key)
    }
}
