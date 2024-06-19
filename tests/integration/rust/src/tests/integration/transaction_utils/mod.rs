#[allow(dead_code)]
pub mod test_module {
    use crate::config::{
        get_config, TestConfig, ENTRYPOINT_DECIMALS, PAYMENT_AMOUNT, PAYMENT_TRANSFER_AMOUNT,
        TRANSFER_AMOUNT, TTL,
    };
    use crate::tests::helpers::intern::create_test_sdk;
    use casper_rust_wasm_sdk::types::{
        addressable_entity_hash::AddressableEntityHash,
        transaction_params::{
            transaction_builder_params::TransactionBuilderParams,
            transaction_str_params::TransactionStrParams,
        },
    };

    pub async fn test_make_transaction() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&config.chain_name);
        transaction_params.set_initiator_addr(&config.account);
        transaction_params.set_ttl(Some(TTL.to_string()));
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let entity_hash: AddressableEntityHash =
            AddressableEntityHash::from_formatted_str(&config.contract_cep78_entity).unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_hash, ENTRYPOINT_DECIMALS);

        let make_transaction = create_test_sdk(Some(config))
            .make_transaction(builder_params, transaction_params)
            .unwrap();
        assert!(!make_transaction.hash().to_string().is_empty());
        assert!(!make_transaction
            .compute_approvals_hash()
            .unwrap()
            .to_string()
            .is_empty());
        assert!(
            make_transaction
                .entry_point()
                .to_string()
                .contains(ENTRYPOINT_DECIMALS),
            "Expected entry point to contain {} but it didn't",
            ENTRYPOINT_DECIMALS
        );
    }

    pub async fn test_make_transfer_transaction() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&config.chain_name);
        transaction_params.set_initiator_addr(&config.account);
        transaction_params.set_ttl(Some(TTL.to_string()));
        transaction_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        let make_transfer = create_test_sdk(Some(config.clone()))
            .make_transfer_transaction(
                None,
                &config.target_account,
                TRANSFER_AMOUNT,
                transaction_params,
                None,
            )
            .unwrap();
        assert!(!make_transfer.hash().to_string().is_empty());
        assert!(!make_transfer
            .compute_approvals_hash()
            .unwrap()
            .to_string()
            .is_empty());
        assert!(make_transfer.is_native());
    }

    pub async fn test_sign_transaction() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&config.chain_name);
        transaction_params.set_initiator_addr(&config.account);
        transaction_params.set_ttl(Some(TTL.to_string()));
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let entity_hash: AddressableEntityHash =
            AddressableEntityHash::from_formatted_str(&config.contract_cep78_entity).unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_hash, ENTRYPOINT_DECIMALS);

        let make_transaction = create_test_sdk(Some(config.clone()))
            .make_transaction(builder_params, transaction_params)
            .unwrap();
        let signed_transaction = create_test_sdk(Some(config.clone()))
            .sign_transaction(make_transaction, &config.to_owned().secret_key);
        assert!(signed_transaction.verify());
    }
}

#[cfg(test)]
mod tests {
    use super::test_module::*;
    use tokio::test;

    #[test]
    pub async fn test_make_transaction_test() {
        test_make_transaction().await;
    }

    #[test]
    pub async fn test_make_transfer_transaction_test() {
        test_make_transfer_transaction().await;
    }

    #[test]
    pub async fn test_sign_transaction_test() {
        test_sign_transaction().await;
    }
}
