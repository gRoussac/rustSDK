#[cfg(target_arch = "wasm32")]
use crate::debug::error;
#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
use crate::{
    helpers::get_verbosity_or_default,
    types::{
        block_identifier::BlockIdentifierInput, public_key::PublicKey, sdk_error::SdkError,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    cli::get_account as get_account_cli, get_account as get_account_lib,
    rpcs::results::GetAccountResult, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::Deserialize;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Default)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getAccountOptions")]
pub struct GetAccountOptions {
    node_address: String,
    account_identifier: Option<String>,
    public_key: Option<PublicKey>,
    // account_hash: Option<AccountHash>, PR #99 Account identifier
    maybe_block_id_as_string: Option<String>,
    maybe_block_identifier: Option<BlockIdentifier>,
    verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_account_options")]
    pub fn get_account_options(&self, options: JsValue) -> GetAccountOptions {
        let options_result = options.into_serde::<GetAccountOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                GetAccountOptions::default()
            }
        }
    }

    #[wasm_bindgen(js_name = "get_account")]
    pub async fn get_account_js_alias(&mut self, options: GetAccountOptions) -> JsValue {
        let GetAccountOptions {
            node_address,
            account_identifier,
            public_key,
            // account_hash,
            maybe_block_id_as_string,
            maybe_block_identifier,
            verbosity,
        } = options;

        let public_key = if let Some(account_identifier) = account_identifier {
            PublicKey::new(&account_identifier).unwrap()
        } else if let Some(public_key) = public_key {
            public_key
        } else {
            error("Error: Missing account identifier or public key");
            return JsValue::null();
        };

        let maybe_block_identifier = if let Some(maybe_block_identifier) = maybe_block_identifier {
            Some(BlockIdentifierInput::BlockIdentifier(
                maybe_block_identifier,
            ))
        } else {
            maybe_block_id_as_string.map(BlockIdentifierInput::String)
        };

        serialize_result(
            self.get_account(&node_address, verbosity, maybe_block_identifier, public_key)
                .await,
        )
    }

    #[wasm_bindgen(js_name = "state_get_account_info")]
    pub async fn state_get_account_info_js_alias(&mut self, options: GetAccountOptions) -> JsValue {
        self.get_account_js_alias(options).await
    }
}

impl SDK {
    pub async fn get_account(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        public_key: PublicKey,
    ) -> Result<SuccessResponse<GetAccountResult>, SdkError> {
        //log("get_account!");

        if let Some(BlockIdentifierInput::String(maybe_block_id)) = maybe_block_identifier {
            get_account_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                node_address,
                get_verbosity_or_default(verbosity).into(),
                &maybe_block_id,
                &public_key.to_string(),
            )
            .await
            .map_err(SdkError::from)
        } else {
            let maybe_block_identifier =
                if let Some(BlockIdentifierInput::BlockIdentifier(maybe_block_identifier)) =
                    maybe_block_identifier
                {
                    Some(maybe_block_identifier)
                } else {
                    None
                };
            get_account_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                node_address,
                get_verbosity_or_default(verbosity).into(),
                maybe_block_identifier.map(Into::into),
                public_key.into(),
            )
            .await
            .map_err(SdkError::from)
        }
    }
}
