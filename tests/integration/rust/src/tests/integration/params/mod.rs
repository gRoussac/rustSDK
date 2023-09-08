#[allow(dead_code)]
pub mod test_module {
    use crate::config::{
        get_config, TestConfig, DEFAULT_CONTRACT_HASH, DEFAULT_DICT_KEY, DEFAULT_DICT_UREF,
        DEFAULT_TTL, TTL,
    };
    use casper_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, dictionary_item_str_params::DictionaryItemStrParams,
        payment_str_params::PaymentStrParams, session_str_params::SessionStrParams,
    };

    pub async fn test_deploy_params() {
        let config: TestConfig = get_config().await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            None,
            None,
            Some(TTL.to_string()),
        );
        assert_eq!(deploy_params.chain_name().unwrap(), config.chain_name);
        assert_eq!(deploy_params.ttl().unwrap(), TTL);
        assert_eq!(deploy_params.session_account().unwrap(), config.account);
        assert_eq!(deploy_params.secret_key(), None);
        assert!(deploy_params.timestamp().is_some());
    }

    pub async fn test_deploy_params_defaults() {
        let config: TestConfig = get_config().await;
        let deploy_params = DeployStrParams::default();
        deploy_params.set_chain_name(&config.chain_name);
        deploy_params.set_session_account(&config.account);

        assert_eq!(deploy_params.chain_name().unwrap(), config.chain_name);
        assert_eq!(deploy_params.session_account().unwrap(), config.account);
        assert!(deploy_params.timestamp().is_none());
        assert!(deploy_params.ttl().is_none());

        deploy_params.set_default_ttl();
        deploy_params.set_default_timestamp();
        assert!(deploy_params.timestamp().is_some());
        assert_eq!(deploy_params.ttl().unwrap(), DEFAULT_TTL);
    }

    pub fn test_session_params() {
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(session_hash);
        session_params.set_session_entry_point(entrypoint);
        assert_eq!(session_params.session_hash().unwrap(), session_hash);
        assert_eq!(session_params.session_entry_point().unwrap(), entrypoint);
    }

    pub fn test_payment_params() {
        let payment_amount = "5500000000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        assert_eq!(payment_params.payment_amount().unwrap(), payment_amount);
    }

    pub async fn test_dictionary_item_params() {
        let config: TestConfig = get_config().await;
        let mut dictionary_item_params = DictionaryItemStrParams::default();
        //  dictionary_item_params.
        assert!(dictionary_item_params.account_named_key().is_none());
        assert!(dictionary_item_params.contract_named_key().is_none());
        assert!(dictionary_item_params.uref().is_none());
        assert!(dictionary_item_params.dictionary().is_none());

        dictionary_item_params.set_account_named_key(&config.account_hash, "dict", "key");
        assert!(dictionary_item_params.account_named_key().is_some());
        dictionary_item_params.set_contract_named_key(DEFAULT_CONTRACT_HASH, "dict", "key");
        assert!(dictionary_item_params.contract_named_key().is_some());
        dictionary_item_params.set_uref(DEFAULT_DICT_UREF, "key");
        assert!(dictionary_item_params.uref().is_some());
        dictionary_item_params.set_dictionary(DEFAULT_DICT_KEY);
        assert!(dictionary_item_params.dictionary().is_some());
    }
}

#[cfg(test)]
mod tests {
    use super::test_module::*;
    #[test]
    pub fn test_session_params_test() {
        test_session_params();
    }
    #[test]
    pub fn test_payment_params_test() {
        test_payment_params();
    }
}

#[cfg(test)]
mod tests_async {
    use super::test_module::*;
    use tokio::test;
    #[test]
    pub async fn test_deploy_params_test() {
        test_deploy_params().await;
    }
    #[test]
    pub async fn test_deploy_params_defaults_test() {
        test_deploy_params_defaults().await;
    }

    #[test]
    pub async fn test_dictionary_item_params_test() {
        test_dictionary_item_params().await;
    }
}
