#[cfg(target_arch = "wasm32")]
use crate::debug::error;
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
    rpcs::results::GetAccountResult as _GetAccountResult, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetAccountResult(_GetAccountResult);

#[cfg(target_arch = "wasm32")]
impl From<GetAccountResult> for _GetAccountResult {
    fn from(result: GetAccountResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetAccountResult> for GetAccountResult {
    fn from(result: _GetAccountResult) -> Self {
        GetAccountResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetAccountResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn account(&self) -> JsValue {
        JsValue::from_serde(&self.0.account).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn merkle_proof(&self) -> String {
        self.0.merkle_proof.clone()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getAccountOptions", getter_with_clone)]
pub struct GetAccountOptions {
    pub node_address: String,
    pub account_identifier: Option<String>,
    pub public_key: Option<PublicKey>,
    // account_hash: Option<AccountHash>, PR #99 Account identifier
    pub maybe_block_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub verbosity: Option<Verbosity>,
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
    pub async fn get_account_js_alias(
        &mut self,
        options: GetAccountOptions,
    ) -> Result<GetAccountResult, JsError> {
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
            match PublicKey::new(&account_identifier) {
                Ok(key) => key,
                Err(err) => {
                    let err = &format!(
                        "Error: Failed to create PublicKey from account identifier {:?}",
                        err
                    );
                    error(err);
                    return Err(JsError::new(err));
                }
            }
        } else if let Some(public_key) = public_key {
            public_key
        } else {
            let err = "Error: Missing account identifier or public key";
            error(err);
            return Err(JsError::new(err));
        };
        let maybe_block_identifier = if let Some(maybe_block_identifier) = maybe_block_identifier {
            Some(BlockIdentifierInput::BlockIdentifier(
                maybe_block_identifier,
            ))
        } else {
            maybe_block_id_as_string.map(BlockIdentifierInput::String)
        };

        let result = self
            .get_account(&node_address, verbosity, maybe_block_identifier, public_key)
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred: {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }

    #[wasm_bindgen(js_name = "state_get_account_info")]
    pub async fn state_get_account_info_js_alias(
        &mut self,
        options: GetAccountOptions,
    ) -> Result<GetAccountResult, JsError> {
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
    ) -> Result<SuccessResponse<_GetAccountResult>, SdkError> {
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
