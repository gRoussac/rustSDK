#[cfg(target_arch = "wasm32")]
use crate::rpcs::get_dictionary_item::GetDictionaryItemResult;
#[cfg(target_arch = "wasm32")]
use crate::types::{
    deploy_params::dictionary_item_str_params::DictionaryItemStrParams,
    dictionary_item_identifier::DictionaryItemIdentifier,
};
#[cfg(target_arch = "wasm32")]
use crate::{debug::error, types::digest::Digest};
use crate::{
    rpcs::get_dictionary_item::DictionaryItemInput,
    types::{digest::ToDigest, verbosity::Verbosity},
};
use crate::{types::sdk_error::SdkError, SDK};
use casper_client::{
    rpcs::results::GetDictionaryItemResult as _GetDictionaryItemResult, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[derive(Default, Debug, Deserialize, Clone, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "queryContractDictOptions", getter_with_clone)]
pub struct QueryContractDictOptions {
    // Not supported by get_dictionary_item
    // pub global_state_identifier: Option<GlobalStateIdentifier>,
    pub state_root_hash_as_string: Option<String>,
    pub state_root_hash: Option<Digest>,
    pub dictionary_item_params: Option<DictionaryItemStrParams>,
    pub dictionary_item_identifier: Option<DictionaryItemIdentifier>,
    pub node_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Deserialize query_contract_dict_options from a JavaScript object.
    #[wasm_bindgen(js_name = "query_contract_dict_options")]
    pub fn query_contract_dict_state_options(&self, options: JsValue) -> QueryContractDictOptions {
        let options_result = options.into_serde::<QueryContractDictOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!(
                    "Error deserializing query_contract_dict_options: {:?}",
                    err
                ));
                QueryContractDictOptions::default()
            }
        }
    }

    /// JavaScript alias for query_contract_dict with deserialized options.
    #[wasm_bindgen(js_name = "query_contract_dict")]
    pub async fn query_contract_dict_js_alias(
        &self,
        options: Option<QueryContractDictOptions>,
    ) -> Result<GetDictionaryItemResult, JsError> {
        let js_value_options =
            JsValue::from_serde::<QueryContractDictOptions>(&options.unwrap_or_default());
        if let Err(err) = js_value_options {
            let err = &format!("Error serializing options: {:?}", err);
            error(err);
            return Err(JsError::new(err));
        }
        let options = self.get_dictionary_item_options(js_value_options.unwrap());
        self.get_dictionary_item_js_alias(Some(options)).await
    }
}

impl SDK {
    /// Query a contract dictionary item.
    ///
    /// # Arguments
    ///
    /// * `state_root_hash` - State root hash.
    /// * `dictionary_item` - Dictionary item input.
    /// * `verbosity` - Optional verbosity level.
    /// * `node_address` - Optional node address.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `SuccessResponse<GetDictionaryItemResult>` or a `SdkError` in case of an error.
    pub async fn query_contract_dict(
        &self,
        state_root_hash: impl ToDigest,
        dictionary_item: DictionaryItemInput,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetDictionaryItemResult>, SdkError> {
        // log("query_contract_dict!");
        self.get_dictionary_item(state_root_hash, dictionary_item, verbosity, node_address)
            .await
            .map_err(SdkError::from)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{
        contract::get_dictionary_item,
        types::{
            deploy_params::dictionary_item_str_params::DictionaryItemStrParams, digest::Digest,
        },
    };
    use sdk_tests::config::DEFAULT_NODE_ADDRESS;

    #[tokio::test]
    async fn test_get_dictionary_item_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message = "builder error: relative URL without a base".to_string();

        // Act
        let result = sdk
            .get_dictionary_item(
                "7d3dc9c74fe93e83fe6cc7a9830ba223035ad4fd4fd464489640742069ca31ed", // get_dictionary_item does not support empty string as state_root_hash
                get_dictionary_item(false).await,
                None,
                None,
            )
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(&error_message));
    }

    #[tokio::test]
    async fn test_get_dictionary_item_with_state_root_hash() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let node_address = Some(DEFAULT_NODE_ADDRESS.to_string());

        let dictionary_item = get_dictionary_item(false).await;

        let state_root_hash: Digest = sdk
            .get_state_root_hash(None, verbosity, node_address.clone())
            .await
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();

        // Act
        let result = sdk
            .get_dictionary_item(state_root_hash, dictionary_item, verbosity, node_address)
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_dictionary_item_with_empty_state_root_hash() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let node_address = Some(DEFAULT_NODE_ADDRESS.to_string());
        let state_root_hash = "";

        // Act
        let result = sdk
            .get_dictionary_item(
                state_root_hash,
                get_dictionary_item(false).await,
                verbosity,
                node_address,
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_dictionary_item_with_valid_identifier_input() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let node_address = Some(DEFAULT_NODE_ADDRESS.to_string());
        let state_root_hash = "";

        // Act
        let result = sdk
            .get_dictionary_item(
                state_root_hash,
                get_dictionary_item(false).await,
                verbosity,
                node_address,
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_dictionary_item_with_valid_params_input() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let node_address = Some(DEFAULT_NODE_ADDRESS.to_string());
        let state_root_hash = "";

        // Act
        let result = sdk
            .get_dictionary_item(
                state_root_hash,
                get_dictionary_item(true).await,
                verbosity,
                node_address,
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_dictionary_item_with_invalid_params_input() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let node_address = Some(DEFAULT_NODE_ADDRESS.to_string());

        let error_message =
            "Failed to parse dictionary item address as a key: unknown prefix for key".to_string();

        let state_root_hash = "";
        let params = DictionaryItemStrParams::new();

        // Act
        let result = sdk
            .get_dictionary_item(
                state_root_hash,
                DictionaryItemInput::Params(params),
                verbosity,
                node_address,
            )
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(&error_message));
    }

    #[tokio::test]
    async fn test_get_dictionary_item_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None);
        let error_message =
            "error sending request for url (http://localhost/rpc): error trying to connect: tcp connect error: Connection refused (os error 111)".to_string();

        // Act
        let result = sdk
            .get_dictionary_item(
                "7d3dc9c74fe93e83fe6cc7a9830ba223035ad4fd4fd464489640742069ca31ed", // get_dictionary_item does not support empty string as state_root_hash
                get_dictionary_item(false).await,
                None,
                None,
            )
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(&error_message));
    }
}
