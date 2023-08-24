#[cfg(target_arch = "wasm32")]
use crate::debug::error;
#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
#[cfg(target_arch = "wasm32")]
use crate::types::digest::Digest;
use crate::{
    helpers::get_verbosity_or_default,
    types::{digest::ToDigest, sdk_error::SdkError, uref::URef, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    cli::get_balance as get_balance_cli, get_balance as get_balance_lib,
    rpcs::results::GetBalanceResult, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::Deserialize;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[derive(Default, Debug, Deserialize, Clone)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getBalanceOptions")]
pub struct GetBalanceOptions {
    node_address: String,
    state_root_hash_as_string: Option<String>,
    state_root_hash: Option<Digest>,
    purse_uref_as_string: Option<String>,
    purse_uref: Option<URef>,
    verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_balance_options")]
    pub fn get_balance_options(&self, options: JsValue) -> GetBalanceOptions {
        let options_result = options.into_serde::<GetBalanceOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                GetBalanceOptions::default()
            }
        }
    }

    #[wasm_bindgen(js_name = "get_balance")]
    pub async fn get_balance_js_alias(&mut self, options: GetBalanceOptions) -> JsValue {
        let GetBalanceOptions {
            node_address,
            state_root_hash_as_string,
            state_root_hash,
            purse_uref_as_string,
            purse_uref,
            verbosity,
        } = options;

        let purse_uref = if let Some(purse_uref) = purse_uref {
            GetBalanceInput::PurseUref(purse_uref)
        } else if let Some(purse_uref_as_string) = purse_uref_as_string {
            GetBalanceInput::PurseUrefAsString(purse_uref_as_string)
        } else {
            error("Error: Missing purse uref as string or purse uref");
            return JsValue::null();
        };

        let result = if let Some(hash) = state_root_hash {
            self.get_balance(&node_address, hash, purse_uref, verbosity)
                .await
        } else if let Some(hash) = state_root_hash_as_string {
            self.get_balance(&node_address, hash.as_str(), purse_uref, verbosity)
                .await
        } else {
            error("Error: Missing state_root_hash");
            return JsValue::null();
        };
        serialize_result(result)
    }

    #[wasm_bindgen(js_name = "state_get_balance")]
    pub async fn state_get_balance_js_alias(&mut self, options: GetBalanceOptions) -> JsValue {
        self.get_balance_js_alias(options).await
    }
}

#[derive(Debug, Clone)]
pub enum GetBalanceInput {
    PurseUref(URef),
    PurseUrefAsString(String),
}

impl SDK {
    pub async fn get_balance(
        &mut self,
        node_address: &str,
        state_root_hash: impl ToDigest,
        purse_uref: GetBalanceInput,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<GetBalanceResult>, SdkError> {
        //log("get_balance!");
        match purse_uref {
            GetBalanceInput::PurseUref(purse_uref) => get_balance_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                node_address,
                get_verbosity_or_default(verbosity).into(),
                state_root_hash.to_digest().into(),
                purse_uref.into(),
            )
            .await
            .map_err(SdkError::from),
            GetBalanceInput::PurseUrefAsString(purse_uref) => {
                let state_root_hash_as_string: String = state_root_hash.to_digest().to_string();
                get_balance_cli(
                    &rand::thread_rng().gen::<i64>().to_string(),
                    node_address,
                    get_verbosity_or_default(verbosity).into(),
                    &state_root_hash_as_string,
                    &purse_uref,
                )
                .await
                .map_err(SdkError::from)
            }
        }
    }
}
