#[allow(dead_code)]
pub mod test_module {
    use crate::config::{get_config, TestConfig, TTL};
    use crate::tests::helpers::{create_test_sdk, install_cep78_if_needed};
    use casper_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    };

    pub async fn test_deploy() {
        let config: TestConfig = get_config().await;
        install_cep78_if_needed(&config.account, &config.private_key).await;
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let payment_amount = "5500000000";
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.private_key.clone()),
            None,
            Some(TTL.to_string()),
        );
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(session_hash);
        session_params.set_session_entry_point(entrypoint);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let deploy = create_test_sdk()
            .deploy(
                &config.node_address,
                deploy_params,
                session_params,
                payment_params,
                config.verbosity,
            )
            .await;
        assert!(!deploy
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!deploy
            .as_ref()
            .unwrap()
            .result
            .deploy_hash
            .to_string()
            .is_empty());
    }

    pub async fn test_transfer() {
        let config: TestConfig = get_config().await;
        let transfer_amount = "5500000000";
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.private_key.clone()),
            None,
            Some(TTL.to_string()),
        );
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount("10000");
        let transfer = create_test_sdk()
            .transfer(
                &config.node_address,
                transfer_amount,
                &config.target_account,
                None,
                deploy_params,
                payment_params,
                config.verbosity,
            )
            .await;
        assert!(!transfer
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!transfer
            .as_ref()
            .unwrap()
            .result
            .deploy_hash
            .to_string()
            .is_empty());
    }

    pub async fn test_speculative_deploy() {
        let config: TestConfig = get_config().await;
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let payment_amount = "5500000000";
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.private_key.clone()),
            None,
            Some(TTL.to_string()),
        );
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(session_hash);
        session_params.set_session_entry_point(entrypoint);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let deploy = create_test_sdk()
            .speculative_deploy(
                &config.node_address,
                deploy_params,
                session_params,
                payment_params,
                None,
                config.verbosity,
            )
            .await;
        assert!(!deploy
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!deploy
            .as_ref()
            .unwrap()
            .result
            .execution_result
            .block_hash
            .to_string()
            .is_empty());
    }

    pub async fn test_speculative_transfer() {
        let config: TestConfig = get_config().await;
        let transfer_amount = "5500000000";
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.private_key.clone()),
            None,
            Some(TTL.to_string()),
        );
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount("10000");
        let transfer = create_test_sdk()
            .speculative_transfer(
                &config.node_address,
                transfer_amount,
                &config.target_account,
                None,
                deploy_params,
                payment_params,
                None,
                config.verbosity,
            )
            .await;
        assert!(!transfer
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!transfer
            .as_ref()
            .unwrap()
            .result
            .execution_result
            .block_hash
            .to_string()
            .is_empty());
    }
}

#[cfg(test)]
mod tests {
    use crate::tests::integration_tests::test_module::WAIT_TIME;

    use super::test_module::*;
    use std::thread;
    use tokio::test;

    #[test]
    pub async fn test_deploy_test() {
        thread::sleep(WAIT_TIME);
        test_deploy().await;
        thread::sleep(WAIT_TIME);
    }

    #[test]
    pub async fn test_transfer_test() {
        thread::sleep(WAIT_TIME);
        test_transfer().await;
        thread::sleep(WAIT_TIME);
    }

    // TODO Remove
    #[should_panic]
    #[test]
    pub async fn test_speculative_deploy_test() {
        thread::sleep(WAIT_TIME);
        test_speculative_deploy().await;
        thread::sleep(WAIT_TIME);
    }

    // TODO Remove
    #[should_panic]
    #[test]
    pub async fn test_speculative_transfer_test() {
        thread::sleep(WAIT_TIME);
        test_speculative_transfer().await;
        thread::sleep(WAIT_TIME);
    }
}
