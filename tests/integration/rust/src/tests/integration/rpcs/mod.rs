#[allow(dead_code)]
pub mod test_module {
    use crate::tests::{
        helpers::{
            create_test_sdk, CONFIG, DEFAULT_ACCOUNT_HASH, DEFAULT_CONTRACT_HASH, DEFAULT_DEPLOY,
            DEFAULT_PURSE_UREF, DEFAULT_SESSION_ACCOUNT,
        },
        integration_tests::test_module::WAIT_TIME,
    };
    use casper_wasm_sdk::{
        rpcs::{
            get_balance::GetBalanceInput,
            get_dictionary_item::DictionaryItemInput,
            query_global_state::{KeyIdentifierInput, PathIdentifierInput, QueryGlobalStateParams},
        },
        types::{
            block_identifier::BlockIdentifierInput, deploy_hash::DeployHash,
            deploy_params::dictionary_item_str_params::DictionaryItemStrParams, digest::Digest,
            global_state_identifier::GlobalStateIdentifier, public_key::PublicKey,
        },
    };
    use std::thread;

    pub async fn test_get_peers() {
        let peers = create_test_sdk()
            .get_peers(&CONFIG.node_address, CONFIG.verbosity)
            .await;
        let peers = peers.unwrap();
        assert!(!peers.result.api_version.to_string().is_empty());
        assert!(!peers.result.peers.is_empty());
    }

    pub async fn test_get_account(maybe_block_identifier: Option<BlockIdentifierInput>) {
        let public_key = PublicKey::new(DEFAULT_SESSION_ACCOUNT).unwrap();
        let get_account = create_test_sdk()
            .get_account(
                &CONFIG.node_address,
                public_key,
                maybe_block_identifier,
                CONFIG.verbosity,
            )
            .await;
        let get_account = get_account.unwrap();
        assert!(!get_account.result.api_version.to_string().is_empty());
        assert!(!get_account
            .result
            .account
            .account_hash()
            .to_string()
            .is_empty());
    }

    pub async fn test_get_auction_info(maybe_block_identifier: Option<BlockIdentifierInput>) {
        let get_auction_info = create_test_sdk()
            .get_auction_info(
                &CONFIG.node_address,
                maybe_block_identifier,
                CONFIG.verbosity,
            )
            .await;
        let get_auction_info = get_auction_info.unwrap();
        assert!(!get_auction_info.result.api_version.to_string().is_empty());
        assert!(!get_auction_info
            .result
            .auction_state
            .block_height()
            .to_string()
            .is_empty());
    }

    pub async fn test_get_balance() {
        let get_state_root_hash = create_test_sdk()
            .get_state_root_hash(&CONFIG.node_address, None, None)
            .await;
        thread::sleep(WAIT_TIME);
        let state_root_hash: Digest = get_state_root_hash
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();
        let purse_uref = GetBalanceInput::PurseUrefAsString(DEFAULT_PURSE_UREF.to_string());
        thread::sleep(WAIT_TIME);
        let get_balance = create_test_sdk()
            .get_balance(
                &CONFIG.node_address,
                state_root_hash,
                purse_uref,
                CONFIG.verbosity,
            )
            .await;
        thread::sleep(WAIT_TIME);
        let get_balance = get_balance.unwrap();
        assert!(!get_balance.result.api_version.to_string().is_empty());
        assert!(!get_balance.result.balance_value.to_string().is_empty());
    }

    pub async fn test_get_block_transfers(maybe_block_identifier: Option<BlockIdentifierInput>) {
        let get_block_transfers = create_test_sdk()
            .get_block_transfers(
                &CONFIG.node_address,
                maybe_block_identifier,
                CONFIG.verbosity,
            )
            .await;
        thread::sleep(WAIT_TIME);
        let get_block_transfers = get_block_transfers.unwrap();
        assert!(!get_block_transfers
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!get_block_transfers
            .result
            .block_hash
            .unwrap()
            .to_string()
            .is_empty());

        thread::sleep(WAIT_TIME);
    }

    pub async fn test_get_block(maybe_block_identifier: Option<BlockIdentifierInput>) {
        let get_block = create_test_sdk()
            .get_block(
                &CONFIG.node_address,
                maybe_block_identifier,
                CONFIG.verbosity,
            )
            .await;
        let get_block = get_block.unwrap();
        assert!(!get_block.result.api_version.to_string().is_empty());
        assert!(!get_block.result.block.unwrap().hash.to_string().is_empty());
    }

    pub async fn test_get_chainspec() {
        let get_chainspec = create_test_sdk()
            .get_chainspec(&CONFIG.node_address, CONFIG.verbosity)
            .await;
        thread::sleep(WAIT_TIME);
        let get_chainspec = get_chainspec.unwrap();
        assert!(!get_chainspec.result.api_version.to_string().is_empty());
        assert!(!get_chainspec.result.chainspec_bytes.to_string().is_empty());
        thread::sleep(WAIT_TIME);
    }

    pub async fn test_get_deploy() {
        let get_deploy = create_test_sdk()
            .get_deploy(
                &CONFIG.node_address,
                DeployHash::new(DEFAULT_DEPLOY).unwrap(),
                Some(true),
                CONFIG.verbosity,
            )
            .await;
        let get_deploy = get_deploy.unwrap();
        assert!(!get_deploy.result.api_version.to_string().is_empty());
        assert!(!get_deploy.result.deploy.to_string().is_empty());
    }

    pub async fn test_get_dictionary_item() {
        let get_state_root_hash = create_test_sdk()
            .get_state_root_hash(&CONFIG.node_address, None, None)
            .await;
        let state_root_hash: Digest = get_state_root_hash
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();
        thread::sleep(WAIT_TIME);

        let dictionary_name = "events";
        let dictionary_item_key = "0";
        let mut params = DictionaryItemStrParams::new();
        params.set_contract_named_key(DEFAULT_CONTRACT_HASH, dictionary_name, dictionary_item_key);
        let dictionary_item = DictionaryItemInput::Params(params);
        let get_dictionary_item = create_test_sdk()
            .get_dictionary_item(
                &CONFIG.node_address,
                state_root_hash,
                dictionary_item,
                CONFIG.verbosity,
            )
            .await;
        thread::sleep(WAIT_TIME);
        let get_dictionary_item = get_dictionary_item.unwrap();
        assert!(!get_dictionary_item
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!get_dictionary_item
            .result
            .stored_value
            .as_cl_value()
            .unwrap()
            .inner_bytes()
            .is_empty());
        thread::sleep(WAIT_TIME);
    }

    #[allow(deprecated)]
    pub async fn test_get_era_info(maybe_block_identifier: Option<BlockIdentifierInput>) {
        let get_era_info = create_test_sdk()
            .get_era_info(
                &CONFIG.node_address,
                maybe_block_identifier,
                CONFIG.verbosity,
            )
            .await;
        let get_era_info = get_era_info.unwrap();
        assert!(!get_era_info.result.api_version.to_string().is_empty());
        // TODO Fix ?
        // dbg!(get_era_info.result.era_summary);
        //test with maybe_block_identifier
    }

    pub async fn test_get_era_summary(maybe_block_identifier: Option<BlockIdentifierInput>) {
        let get_era_summary = create_test_sdk()
            .get_era_summary(
                &CONFIG.node_address,
                maybe_block_identifier,
                CONFIG.verbosity,
            )
            .await;
        thread::sleep(WAIT_TIME);
        let get_era_summary = get_era_summary.unwrap();
        assert!(!get_era_summary.result.api_version.to_string().is_empty());
        assert!(!get_era_summary
            .result
            .era_summary
            .block_hash
            .to_string()
            .is_empty());
        thread::sleep(WAIT_TIME);
    }

    pub async fn test_get_node_status() {
        let get_node_status = create_test_sdk()
            .get_node_status(&CONFIG.node_address, CONFIG.verbosity)
            .await;
        let get_node_status = get_node_status.unwrap();
        assert!(!get_node_status.result.api_version.to_string().is_empty());
        assert!(!get_node_status.result.chainspec_name.to_string().is_empty());
    }

    pub async fn test_get_state_root_hash() {
        let get_state_root_hash = create_test_sdk()
            .get_state_root_hash(&CONFIG.node_address, None, None)
            .await;
        thread::sleep(WAIT_TIME);
        let state_root_hash: Digest = get_state_root_hash
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();
        assert!(!state_root_hash.to_string().is_empty());
    }

    pub async fn test_get_validator_changes() {
        let validator_changes = create_test_sdk()
            .get_validator_changes(&CONFIG.node_address, CONFIG.verbosity)
            .await;
        let validator_changes = validator_changes.unwrap();
        assert!(!validator_changes.result.api_version.to_string().is_empty());
        // assert!(validator_changes.result.changes.is_empty());
    }

    pub async fn test_list_rpcs() {
        let list_rpcs = create_test_sdk()
            .list_rpcs(&CONFIG.node_address, CONFIG.verbosity)
            .await;
        let list_rpcs = list_rpcs.unwrap();
        assert!(!list_rpcs.result.api_version.to_string().is_empty());
        assert!(!list_rpcs.result.name.is_empty());
    }

    pub async fn test_query_balance(maybe_global_state_identifier: Option<GlobalStateIdentifier>) {
        let query_balance = create_test_sdk()
            .query_balance(
                &CONFIG.node_address,
                maybe_global_state_identifier,
                Some(DEFAULT_PURSE_UREF.to_string()),
                None,
                None,
                None,
                CONFIG.verbosity,
            )
            .await;
        let query_balance = query_balance.unwrap();
        assert!(!query_balance.result.api_version.to_string().is_empty());
        assert!(!query_balance.result.balance.to_string().is_empty());
    }

    pub async fn test_query_global_state(
        maybe_global_state_identifier: Option<GlobalStateIdentifier>,
    ) {
        thread::sleep(WAIT_TIME);
        let query_params: QueryGlobalStateParams = QueryGlobalStateParams {
            node_address: CONFIG.node_address.clone(),
            key: KeyIdentifierInput::String(DEFAULT_ACCOUNT_HASH.to_string()),
            path: Some(PathIdentifierInput::String("my-key-name".to_string())),
            maybe_global_state_identifier,
            state_root_hash: None,
            maybe_block_id: None,
            verbosity: CONFIG.verbosity,
        };
        let query_global_state = create_test_sdk().query_global_state(query_params).await;
        thread::sleep(WAIT_TIME);
        let query_global_state = query_global_state.unwrap();
        assert!(!query_global_state.result.api_version.to_string().is_empty());
        assert!(!query_global_state
            .result
            .stored_value
            .as_cl_value()
            .unwrap()
            .inner_bytes()
            .is_empty());
        thread::sleep(WAIT_TIME);
    }
}

#[cfg(test)]
mod tests {
    use super::test_module::*;
    use crate::tests::{helpers::DEFAULT_BLOCK_HASH, integration_tests::test_module::WAIT_TIME};
    use casper_wasm_sdk::types::{
        block_hash::BlockHash, block_identifier::BlockIdentifierInput,
        global_state_identifier::GlobalStateIdentifier,
    };
    use std::thread;
    use tokio::test;

    #[test]
    pub async fn test_get_peers_test() {
        thread::sleep(WAIT_TIME);
        test_get_peers().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_account_test() {
        thread::sleep(WAIT_TIME);
        test_get_peers().await;
        thread::sleep(WAIT_TIME);
    }
    // TODO Remove
    #[should_panic]
    #[test]
    pub async fn test_get_auction_info_test() {
        thread::sleep(WAIT_TIME);
        test_get_auction_info(None).await;
        thread::sleep(WAIT_TIME);
    }
    #[should_panic]
    #[test]
    pub async fn test_get_auction_info_test_with_block_identifier() {
        thread::sleep(WAIT_TIME);
        let maybe_block_identifier =
            Some(BlockIdentifierInput::String(DEFAULT_BLOCK_HASH.to_string()));
        test_get_auction_info(maybe_block_identifier).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_balance_test() {
        thread::sleep(WAIT_TIME);
        test_get_balance().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_block_transfers_test() {
        thread::sleep(WAIT_TIME);
        test_get_block_transfers(None).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_block_transfers_test_with_block_identifier() {
        thread::sleep(WAIT_TIME);
        let maybe_block_identifier =
            Some(BlockIdentifierInput::String(DEFAULT_BLOCK_HASH.to_string()));
        test_get_block_transfers(maybe_block_identifier).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_chainspec_test() {
        thread::sleep(WAIT_TIME);
        test_get_chainspec().await;
        thread::sleep(WAIT_TIME);
    }
    // TODO Remove
    #[should_panic]
    #[test]
    pub async fn test_get_deploy_test() {
        thread::sleep(WAIT_TIME);
        test_get_deploy().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_dictionary_item_test() {
        thread::sleep(WAIT_TIME);
        test_get_dictionary_item().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_era_info_test() {
        thread::sleep(WAIT_TIME);
        test_get_era_info(None).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_era_info_test_with_block_identifier() {
        thread::sleep(WAIT_TIME);
        let maybe_block_identifier =
            Some(BlockIdentifierInput::String(DEFAULT_BLOCK_HASH.to_string()));
        test_get_era_info(maybe_block_identifier).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_era_summary_test() {
        thread::sleep(WAIT_TIME);
        test_get_era_summary(None).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_era_summary_test_with_block_identifier() {
        thread::sleep(WAIT_TIME);
        let maybe_block_identifier =
            Some(BlockIdentifierInput::String(DEFAULT_BLOCK_HASH.to_string()));
        test_get_era_summary(maybe_block_identifier).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_node_status_test() {
        thread::sleep(WAIT_TIME);
        test_get_node_status().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_state_root_hash_test() {
        thread::sleep(WAIT_TIME);
        test_get_state_root_hash().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_validator_changes_test() {
        thread::sleep(WAIT_TIME);
        test_get_validator_changes().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_list_rpcs_test() {
        thread::sleep(WAIT_TIME);
        test_list_rpcs().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_query_balance_test_with_block_identifier() {
        thread::sleep(WAIT_TIME);
        let maybe_global_state_identifier = Some(GlobalStateIdentifier::from_block_hash(
            BlockHash::new(DEFAULT_BLOCK_HASH).unwrap(),
        ));
        test_query_balance(maybe_global_state_identifier).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_query_balance_test() {
        thread::sleep(WAIT_TIME);
        test_query_balance(None).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_query_global_state_test_with_block_identifier() {
        thread::sleep(WAIT_TIME);
        let maybe_global_state_identifier = Some(GlobalStateIdentifier::from_block_hash(
            BlockHash::new(DEFAULT_BLOCK_HASH).unwrap(),
        ));
        test_query_global_state(maybe_global_state_identifier).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_query_global_state_test() {
        thread::sleep(WAIT_TIME);
        test_query_global_state(None).await;
        thread::sleep(WAIT_TIME);
    }
}
