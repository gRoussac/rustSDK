use super::addr::transfer_addr::TransferAddr;
use super::addr::{dictionary_addr::DictionaryAddr, hash_addr::HashAddr, uref_addr::URefAddr};
use super::era_id::EraId;
use super::{account_hash::AccountHash, deploy_hash::DeployHash, uref::URef};
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

    #[wasm_bindgen(js_name = fromAccount)]
    pub fn from_account(key: AccountHash) -> Key {
        Key(_Key::Account(key.into()))
    }

    #[wasm_bindgen]
    #[wasm_bindgen(js_name = fromHash)]
    pub fn from_hash(key: HashAddr) -> Key {
        Key(_Key::Hash(key.into()))
    }

    #[wasm_bindgen(js_name = fromTransfer)]
    pub fn from_transfer(key: Vec<u8>) -> TransferAddr {
        // TODO Fix with TransferAddr as _TransferAddr, and [u8; 32]
        // Key(_Key::Transfer(key.into()))
        TransferAddr::from(key)
    }

    #[wasm_bindgen(js_name = fromEraInfo)]
    pub fn from_era_info(key: EraId) -> Key {
        Key(_Key::EraInfo(key.into()))
    }

    #[wasm_bindgen(js_name = fromBalance)]
    pub fn from_balance(key: URefAddr) -> Key {
        Key(_Key::Balance(key.into()))
    }

    #[wasm_bindgen(js_name = fromBid)]
    pub fn from_bid(key: AccountHash) -> Key {
        Key(_Key::Bid(key.into()))
    }

    #[wasm_bindgen(js_name = fromWithdraw)]
    pub fn from_withdraw(key: AccountHash) -> Key {
        Key(_Key::Withdraw(key.into()))
    }

    #[wasm_bindgen(js_name = fromDictionary)]
    pub fn from_dictionary(key: DictionaryAddr) -> Key {
        Key(_Key::Dictionary(key.into()))
    }

    #[wasm_bindgen(js_name = fromSystemContractRegistry)]
    pub fn from_system_contract_registry() -> Key {
        Key(_Key::SystemContractRegistry)
    }

    #[wasm_bindgen(js_name = fromEraSummary)]
    pub fn from_era_summary() -> Key {
        Key(_Key::EraSummary)
    }

    #[wasm_bindgen(js_name = fromUnbond)]
    pub fn from_unbond(key: AccountHash) -> Key {
        Key(_Key::Unbond(key.into()))
    }

    #[wasm_bindgen(js_name = fromChainspecRegistry)]
    pub fn from_chainspec_registry() -> Key {
        Key(_Key::ChainspecRegistry)
    }

    #[wasm_bindgen(js_name = fromChecksumRegistry)]
    pub fn from_checksum_registry() -> Key {
        Key(_Key::ChecksumRegistry)
    }
}

impl From<Key> for _Key {
    fn from(key: Key) -> Self {
        key.0
    }
}

impl From<_Key> for Key {
    fn from(key: _Key) -> Self {
        Key(key)
    }
}
