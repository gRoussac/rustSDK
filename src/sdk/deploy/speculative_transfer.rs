#[cfg(target_arch = "wasm32")]
use crate::rpcs::speculative_exec::SpeculativeExecResult;
#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
use crate::{
    debug::error,
    types::{
        block_identifier::BlockIdentifierInput,
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
        },
        sdk_error::SdkError,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    cli::make_transfer, rpcs::results::SpeculativeExecResult as _SpeculativeExecResult,
    SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// SDK functions related to speculative transfers.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Alias for speculative transfer.
    ///
    /// # Arguments
    ///
    /// * `amount` - The amount to transfer.
    /// * `target_account` - The target account.
    /// * `transfer_id` - An optional transfer ID (defaults to a random number).
    /// * `deploy_params` - The deployment parameters.
    /// * `payment_params` - The payment parameters.
    /// * `maybe_block_id_as_string` - An optional block ID as a string.
    /// * `maybe_block_identifier` - An optional block identifier.
    /// * `verbosity` - The verbosity level for logging (optional).
    /// * `node_address` - The address of the node to connect to (optional).
    ///
    /// # Returns
    ///
    /// A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
    #[allow(clippy::too_many_arguments)]
    #[wasm_bindgen(js_name = "speculative_transfer")]
    pub async fn speculative_transfer_js_alias(
        &self,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
        maybe_block_id_as_string: Option<String>,
        maybe_block_identifier: Option<BlockIdentifier>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SpeculativeExecResult, JsError> {
        let maybe_block_identifier = if let Some(maybe_block_identifier) = maybe_block_identifier {
            Some(BlockIdentifierInput::BlockIdentifier(
                maybe_block_identifier,
            ))
        } else {
            maybe_block_id_as_string.map(BlockIdentifierInput::String)
        };
        let result = self
            .speculative_transfer(
                amount,
                target_account,
                transfer_id,
                deploy_params,
                payment_params,
                maybe_block_identifier,
                verbosity,
                node_address,
            )
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }
}

/// SDK functions related to speculative transfers.
impl SDK {
    /// Perform a speculative transfer.
    ///
    /// # Arguments
    ///
    /// * `amount` - The amount to transfer.
    /// * `target_account` - The target account.
    /// * `transfer_id` - An optional transfer ID (defaults to a random number).
    /// * `deploy_params` - The deployment parameters.
    /// * `payment_params` - The payment parameters.
    /// * `maybe_block_identifier` - An optional block identifier.
    /// * `verbosity` - The verbosity level for logging (optional).
    /// * `node_address` - The address of the node to connect to (optional).
    ///
    /// # Returns
    ///
    /// A `Result` containing the result of the speculative transfer or a `SdkError` in case of an error.
    #[allow(clippy::too_many_arguments)]
    pub async fn speculative_transfer(
        &self,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_SpeculativeExecResult>, SdkError> {
        // log("speculative_transfer!");
        let transfer_id = if let Some(transfer_id) = transfer_id {
            transfer_id
        } else {
            rand::thread_rng().gen::<u64>().to_string()
        };
        let deploy = make_transfer(
            "",
            amount,
            target_account,
            &transfer_id,
            deploy_str_params_to_casper_client(&deploy_params),
            payment_str_params_to_casper_client(&payment_params),
            false,
        );

        if let Err(err) = deploy {
            let err_msg = format!("Error during speculative_transfer: {}", err);
            error(&err_msg);
            return Err(SdkError::from(err));
        }

        self.speculative_exec(
            deploy.unwrap().into(),
            maybe_block_identifier,
            verbosity,
            node_address,
        )
        .await
        .map_err(SdkError::from)
    }
}
