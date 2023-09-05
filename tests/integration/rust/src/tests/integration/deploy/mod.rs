#[allow(dead_code)]
pub mod test_module {
    use crate::tests::helpers::{
        create_test_sdk, CHAIN_NAME, CONFIG, DEFAULT_SESSION_ACCOUNT, DEFAULT_TARGET_ACCOUNT,
        DEFAULT_TEST_KEY, TTL,
    };
    use casper_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    };

    pub async fn test_deploy() {
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let payment_amount = "5500000000";
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
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
                &CONFIG.node_address,
                deploy_params,
                session_params,
                payment_params,
                CONFIG.verbosity,
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
        let transfer_amount = "5500000000";
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount("10000");
        let transfer = create_test_sdk()
            .transfer(
                &CONFIG.node_address,
                transfer_amount,
                DEFAULT_TARGET_ACCOUNT,
                None,
                deploy_params,
                payment_params,
                CONFIG.verbosity,
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
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let payment_amount = "5500000000";
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
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
                &CONFIG.node_address,
                deploy_params,
                session_params,
                payment_params,
                None,
                CONFIG.verbosity,
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
        let transfer_amount = "5500000000";
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount("10000");
        let transfer = create_test_sdk()
            .speculative_transfer(
                &CONFIG.node_address,
                transfer_amount,
                DEFAULT_TARGET_ACCOUNT,
                None,
                deploy_params,
                payment_params,
                None,
                CONFIG.verbosity,
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
