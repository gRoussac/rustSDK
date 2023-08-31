use crate::debug::error;
#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::types::digest::Digest;
use crate::types::global_state_identifier::GlobalStateIdentifier;
use crate::types::global_state_identifier::GlobalStateIdentifierInput;
use crate::{
    helpers::get_verbosity_or_default,
    types::{key::Key, path::Path, sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    cli::query_global_state as query_global_state_cli,
    query_global_state as query_global_state_lib, rpcs::results::QueryGlobalStateResult, JsonRpcId,
    SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(js_name = "queryGlobalStateOptions", getter_with_clone)]
pub struct QueryGlobalStateOptions {
    pub node_address: String,
    pub global_state_identifier_as_string: Option<String>,
    pub global_state_identifier: Option<GlobalStateIdentifier>,
    pub state_root_hash_as_string: Option<String>,
    pub state_root_hash: Option<Digest>,
    pub maybe_block_id_as_string: Option<String>,
    pub key_as_string: Option<String>,
    pub key: Option<Key>,
    pub path_as_string: Option<String>,
    pub path: Option<Path>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "query_global_state_options")]
    pub fn query_global_state_options(&self, options: JsValue) -> QueryGlobalStateOptions {
        let options_result = options.into_serde::<QueryGlobalStateOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                QueryGlobalStateOptions::default()
            }
        }
    }

    #[wasm_bindgen(js_name = "query_global_state")]
    pub async fn query_global_state_js_alias(
        &mut self,
        options: QueryGlobalStateOptions,
    ) -> JsValue {
        match self.query_global_state_js_alias_params(options) {
            Ok(params) => {
                let query_result = self.query_global_state(params).await;
                serialize_result(query_result)
            }
            Err(err) => {
                error(&format!("Error building parameters: {:?}", err));
                JsValue::null()
            }
        }
    }
}

#[derive(Debug, Clone)]
pub enum KeyIdentifierInput {
    Key(Key),
    String(String),
}

#[derive(Debug, Clone)]
pub enum PathIdentifierInput {
    Path(Path),
    String(String),
}

#[derive(Debug)]
pub struct QueryGlobalStateParams {
    pub node_address: String,
    pub key: KeyIdentifierInput,
    pub path: Option<PathIdentifierInput>,
    pub maybe_global_state_identifier: Option<GlobalStateIdentifierInput>,
    pub state_root_hash: Option<String>,
    pub maybe_block_id: Option<String>,
    pub verbosity: Option<Verbosity>,
}

impl SDK {
    pub fn query_global_state_js_alias_params(
        &mut self,
        options: QueryGlobalStateOptions,
    ) -> Result<QueryGlobalStateParams, SdkError> {
        let QueryGlobalStateOptions {
            node_address,
            verbosity,
            global_state_identifier_as_string,
            global_state_identifier,
            state_root_hash_as_string,
            state_root_hash,
            maybe_block_id_as_string,
            key_as_string,
            key,
            path_as_string,
            path,
        } = options;

        let maybe_global_state_identifier =
            if let Some(global_state_identifier) = global_state_identifier {
                Some(GlobalStateIdentifierInput::GlobalStateIdentifier(
                    global_state_identifier,
                ))
            } else {
                global_state_identifier_as_string.map(GlobalStateIdentifierInput::String)
            };

        let key = if let Some(key) = key {
            Some(KeyIdentifierInput::Key(key))
        } else if let Some(key_as_string) = key_as_string {
            Some(KeyIdentifierInput::String(key_as_string))
        } else {
            let err_msg = "Error: Missing Key as string or Key".to_string();
            error(&err_msg);
            return Err(SdkError::InvalidArgument {
                context: "query_global_state",
                error: err_msg,
            });
        };

        let maybe_path = if let Some(path) = path {
            Some(PathIdentifierInput::Path(path))
        } else {
            path_as_string.map(PathIdentifierInput::String)
        };

        let query_params = if let Some(hash) = state_root_hash {
            QueryGlobalStateParams {
                node_address: node_address.to_owned(),
                key: key.unwrap(),
                path: maybe_path.clone(),
                maybe_global_state_identifier: maybe_global_state_identifier.clone(),
                state_root_hash: Some(hash.to_string()),
                maybe_block_id: None,
                verbosity,
            }
        } else if let Some(hash) = state_root_hash_as_string {
            QueryGlobalStateParams {
                node_address: node_address.to_owned(),
                key: key.unwrap(),
                path: maybe_path.clone(),
                maybe_global_state_identifier: maybe_global_state_identifier.clone(),
                state_root_hash: Some(hash.to_string()),
                maybe_block_id: None,
                verbosity,
            }
        } else if let Some(maybe_block_id_as_string) = maybe_block_id_as_string {
            QueryGlobalStateParams {
                node_address: node_address.to_owned(),
                key: key.unwrap(),
                path: maybe_path.clone(),
                maybe_global_state_identifier: maybe_global_state_identifier.clone(),
                state_root_hash: None,
                maybe_block_id: Some(maybe_block_id_as_string),
                verbosity,
            }
        } else {
            QueryGlobalStateParams {
                node_address: node_address.to_owned(),
                key: key.unwrap(),
                path: maybe_path.clone(),
                maybe_global_state_identifier: maybe_global_state_identifier.clone(),
                state_root_hash: None,
                maybe_block_id: None,
                verbosity,
            }
        };
        Ok(query_params)
    }

    pub async fn query_global_state(
        &mut self,
        query_params: QueryGlobalStateParams,
    ) -> Result<SuccessResponse<QueryGlobalStateResult>, SdkError> {
        //log("query_global_state!");

        let QueryGlobalStateParams {
            node_address,
            key,
            path,
            maybe_global_state_identifier,
            state_root_hash,
            maybe_block_id,
            verbosity,
        } = query_params;

        let key = match key {
            KeyIdentifierInput::Key(key) => Some(key),
            KeyIdentifierInput::String(key_string) => match Key::from_formatted_str(&key_string) {
                Ok(key) => Some(key),
                Err(_) => None,
            },
        };

        if key.is_none() {
            let err = "Error: Missing key from formatted string".to_string();
            error(&err);
            return Err(SdkError::InvalidArgument {
                context: "query_global_state",
                error: err,
            });
        }

        let path = if let Some(path) = path {
            match path {
                PathIdentifierInput::Path(path) => path,
                PathIdentifierInput::String(path_string) => Path::new(path_string.into()),
            }
        } else {
            Path::new(String::from("").into())
        };

        if let Some(GlobalStateIdentifierInput::GlobalStateIdentifier(
            maybe_global_state_identifier,
        )) = maybe_global_state_identifier
        {
            query_global_state_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &node_address,
                get_verbosity_or_default(verbosity).into(),
                maybe_global_state_identifier.into(),
                key.unwrap().into(),
                path.into(),
            )
            .await
            .map_err(SdkError::from)
        } else if let Some(state_root_hash) = state_root_hash {
            query_global_state_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &node_address,
                get_verbosity_or_default(verbosity).into(),
                "",
                &state_root_hash,
                &key.unwrap().to_formatted_string(),
                &(path.to_string()),
            )
            .await
            .map_err(SdkError::from)
        } else {
            query_global_state_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &node_address,
                get_verbosity_or_default(verbosity).into(),
                &maybe_block_id.unwrap_or_default(),
                "",
                &key.unwrap().to_formatted_string(),
                &(path.to_string()),
            )
            .await
            .map_err(SdkError::from)
        }
    }
}
