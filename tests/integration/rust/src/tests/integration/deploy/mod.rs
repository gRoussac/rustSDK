#[allow(dead_code)]
pub mod test_module {
    use crate::config::{
        get_config, TestConfig, ENTRYPOINT_MINT, PAYMENT_AMOUNT, PAYMENT_TRANSFER_AMOUNT,
        TRANSFER_AMOUNT, TTL,
    };
    use crate::tests::helpers::intern::create_test_sdk;
    use casper_rust_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    };

    pub async fn test_deploy() -> String {
        let config: TestConfig = get_config(false).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.secret_key.clone()),
            None,
            Some(TTL.to_string()),
            None,
        );
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(
            &config
                .contract_cep78_key
                .replace("entity-contract-", "hash-"),
        );
        session_params.set_session_entry_point(ENTRYPOINT_MINT);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);
        let deploy = create_test_sdk(Some(config.clone()))
            .deploy(deploy_params, session_params, payment_params, None, None)
            .await;
        assert!(!deploy
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());
        let deploy_hash = deploy.as_ref().unwrap().result.deploy_hash.to_hex_string();
        assert!(!deploy_hash.is_empty());
        deploy_hash
    }

    #[allow(deprecated)]
    pub async fn test_transfer() {
        let config: TestConfig = get_config(true).await;

        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.secret_key.clone()),
            None,
            Some(TTL.to_string()),
            None,
        );
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);
        let transfer = create_test_sdk(Some(config.clone()))
            .transfer(
                TRANSFER_AMOUNT,
                &config.target_account,
                None,
                deploy_params,
                payment_params,
                None,
                None,
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

    #[allow(deprecated)]
    pub async fn test_speculative_deploy() {
        let config: TestConfig = get_config(false).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.secret_key.clone()),
            None,
            Some(TTL.to_string()),
            None,
        );
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(
            &config
                .contract_cep78_key
                .replace("entity-contract-", "hash-"),
        );
        session_params.set_session_entry_point(ENTRYPOINT_MINT);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);
        let deploy = create_test_sdk(Some(config))
            .speculative_deploy(deploy_params, session_params, payment_params, None, None)
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

    #[allow(deprecated)]
    pub async fn test_speculative_transfer() {
        let config: TestConfig = get_config(true).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.secret_key.clone()),
            None,
            Some(TTL.to_string()),
            None,
        );
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);
        let transfer = create_test_sdk(Some(config.clone()))
            .speculative_transfer(
                TRANSFER_AMOUNT,
                &config.target_account,
                None,
                deploy_params,
                payment_params,
                None,
                None,
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
    use super::test_module::*;
    use tokio::test;

    #[test]
    pub async fn test_deploy_test() {
        test_deploy().await;
    }

    #[test]
    pub async fn test_transfer_test() {
        test_transfer().await;
    }

    #[test]
    #[ignore]
    pub async fn _test_speculative_deploy_test() {
        test_speculative_deploy().await;
    }

    #[test]
    #[ignore]
    pub async fn _test_speculative_transfer_test() {
        test_speculative_transfer().await;
    }
}
