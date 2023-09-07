#[allow(dead_code)]
pub mod test_module_deploy {
    use crate::tests::{
        helpers::{
            read_wasm_file, CHAIN_NAME, DEFAULT_SESSION_ACCOUNT, DEFAULT_TARGET_ACCOUNT,
            DEFAULT_TEST_KEY, DEFAULT_TTL, TTL,
        },
        integration_tests::test_module::WAIT_TIME,
    };
    use casper_wasm_sdk::{
        helpers::get_current_timestamp,
        types::{
            contract_hash::ContractHash,
            contract_package_hash::ContractPackageHash,
            deploy_params::{
                deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
                session_str_params::SessionStrParams,
            },
        },
        types::{deploy::Deploy, public_key::PublicKey},
    };
    use std::thread;

    pub async fn test_deploy_type() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(session_hash);
        session_params.set_session_entry_point(entrypoint);
        let payment_amount = "5500000000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert!(deploy.has_valid_hash());
        assert!(!deploy
            .compute_approvals_hash()
            .unwrap()
            .to_string()
            .is_empty());
    }

    pub async fn test_deploy_type_transfer() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let payment_amount = "10000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let transfer_amount = "5500000000";
        let deploy = Deploy::with_transfer(
            transfer_amount,
            DEFAULT_TARGET_ACCOUNT,
            None,
            deploy_params,
            payment_params,
        )
        .unwrap();
        assert!(deploy.is_valid());
        assert!(deploy.is_transfer());
    }

    pub async fn test_deploy_type_with_ttl() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(session_hash);
        session_params.set_session_entry_point(entrypoint);
        let payment_amount = "5500000000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let mut deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert_eq!(deploy.ttl(), TTL.to_string());
        deploy = deploy.with_ttl(DEFAULT_TTL, Some(DEFAULT_TEST_KEY.to_string()));
        assert!(deploy.is_valid());
        assert_eq!(deploy.ttl(), DEFAULT_TTL.to_string());
    }

    pub async fn test_deploy_type_with_timestamp() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let payment_amount = "10000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let transfer_amount = "5500000000";
        let mut deploy = Deploy::with_transfer(
            transfer_amount,
            DEFAULT_TARGET_ACCOUNT,
            None,
            deploy_params,
            payment_params,
        )
        .unwrap();
        assert!(deploy.is_valid());
        assert!(!deploy.timestamp().is_empty());
        let deploy_timestamp = &deploy.timestamp()[..19];
        // Do not remove this intentional sleep
        thread::sleep(WAIT_TIME);

        let current_timestamp = &get_current_timestamp(None)[..19];
        assert_ne!(deploy_timestamp, current_timestamp);
        deploy = deploy.with_timestamp(current_timestamp, Some(DEFAULT_TEST_KEY.to_string()));
        assert!(deploy.is_valid());
        assert_eq!(&deploy.timestamp()[..19], current_timestamp);
    }

    pub async fn test_deploy_type_with_chain_name() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let payment_amount = "10000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let transfer_amount = "5500000000";
        let mut deploy = Deploy::with_transfer(
            transfer_amount,
            DEFAULT_TARGET_ACCOUNT,
            None,
            deploy_params,
            payment_params,
        )
        .unwrap();
        assert!(deploy.is_valid());
        assert_eq!(deploy.chain_name(), CHAIN_NAME);
        deploy = deploy.with_chain_name("test", Some(DEFAULT_TEST_KEY.to_string()));
        assert!(deploy.is_valid());
        assert_eq!(&deploy.chain_name(), "test");
    }

    pub async fn test_deploy_type_with_account() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let payment_amount = "10000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let transfer_amount = "5500000000";
        let mut deploy = Deploy::with_transfer(
            transfer_amount,
            DEFAULT_TARGET_ACCOUNT,
            None,
            deploy_params,
            payment_params,
        )
        .unwrap();
        assert!(deploy.is_valid());
        assert_eq!(&deploy.account(), DEFAULT_SESSION_ACCOUNT);
        deploy = deploy.with_account(PublicKey::new(DEFAULT_TARGET_ACCOUNT).unwrap(), None);
        assert!(!deploy.is_valid());
        assert_eq!(&deploy.account(), DEFAULT_TARGET_ACCOUNT);
    }

    pub async fn test_deploy_type_with_entry_point_name() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(session_hash);
        session_params.set_session_entry_point(entrypoint);
        let payment_amount = "5500000000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let mut deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert_eq!(&deploy.entry_point_name(), entrypoint);
        deploy = deploy.with_entry_point_name("name", Some(DEFAULT_TEST_KEY.to_string()));
        assert!(deploy.is_valid());
        assert_eq!(&deploy.entry_point_name(), "name");
    }

    pub async fn test_deploy_type_with_hash() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(session_hash);
        session_params.set_session_entry_point(entrypoint);
        let payment_amount = "5500000000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let mut deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert!(deploy.is_stored_contract());

        let new_session_hash = "7b9f86fd244c604012002cde5961464bfd371539c5e6df4b42ada6108090421c";
        deploy = deploy.with_hash(
            ContractHash::new(new_session_hash).unwrap(),
            Some(DEFAULT_TEST_KEY.to_string()),
        );
        assert!(deploy.is_valid());
        assert!(deploy.is_stored_contract());
        assert!(!deploy.to_json().unwrap().contains(session_hash));
        assert!(deploy.to_json().unwrap().contains(new_session_hash));
    }

    pub async fn test_deploy_type_by_name() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let entrypoint = "decimals";
        let session_name = "test";
        let session_params = SessionStrParams::default();
        session_params.set_session_entry_point(entrypoint);
        session_params.set_session_name("test");
        let payment_amount = "5500000000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert!(deploy.is_stored_contract());
        assert_eq!(
            deploy.by_name().unwrap().to_string(),
            session_name.to_string()
        );
    }

    pub async fn test_deploy_type_with_package_hash() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let session_package_hash =
            "93d38a928e5a9a3030e60dc207b478a746a4369f5dbaf20f085fe4e19f4b12d2";
        let entrypoint = "decimals";
        let session_params = SessionStrParams::default();
        session_params.set_session_package_hash(session_package_hash);
        session_params.set_session_entry_point(entrypoint);
        let payment_amount = "5500000000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let mut deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert!(deploy.is_stored_contract_package());

        let new_session_package_hash =
            "10631a7146f1a164fb4af24b71881704cccd9dc988e02f85cf332c8d9b88238a";
        deploy = deploy.with_package_hash(
            ContractPackageHash::new(new_session_package_hash).unwrap(),
            Some(DEFAULT_TEST_KEY.to_string()),
        );
        assert!(deploy.is_valid());
        assert!(deploy.is_stored_contract_package());
        assert!(!deploy.to_json().unwrap().contains(session_package_hash));
        assert!(deploy.to_json().unwrap().contains(new_session_package_hash));
    }

    pub async fn test_deploy_type_with_module_bytes() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let session_params = SessionStrParams::default();
        session_params.set_session_bytes(Vec::from([0]).into());
        let payment_amount = "5500000000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let mut deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());

        assert!(deploy
            .to_json()
            .unwrap()
            .contains("\"module_bytes\":\"00\""));
        let file_path = "contract.wasm";
        let module_bytes = match read_wasm_file(file_path) {
            Ok(module_bytes) => module_bytes,
            Err(err) => {
                eprintln!("Error reading file: {:?}", err);
                return;
            }
        };
        deploy = deploy.with_module_bytes(module_bytes.into(), Some(DEFAULT_TEST_KEY.to_string()));
        assert!(deploy.is_valid());
        assert!(deploy.is_module_bytes());
        assert!(!deploy
            .to_json()
            .unwrap()
            .contains("\"module_bytes\":\"00\""));
    }

    pub async fn test_deploy_type_with_secret_key() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            None,
            None,
            Some(TTL.to_string()),
        );
        let payment_amount = "10000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let transfer_amount = "5500000000";
        let mut deploy = Deploy::with_transfer(
            transfer_amount,
            DEFAULT_TARGET_ACCOUNT,
            None,
            deploy_params,
            payment_params,
        )
        .unwrap();
        assert!(!deploy.is_valid());
        assert_eq!(&deploy.account(), DEFAULT_SESSION_ACCOUNT);
        deploy = deploy.with_secret_key(Some(DEFAULT_TEST_KEY.to_string()));
        assert!(deploy.is_valid());
    }

    pub async fn test_deploy_type_with_standard_payment() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let session_package_hash =
            "93d38a928e5a9a3030e60dc207b478a746a4369f5dbaf20f085fe4e19f4b12d2";
        let entrypoint = "decimals";
        let session_params = SessionStrParams::default();
        session_params.set_session_package_hash(session_package_hash);
        session_params.set_session_entry_point(entrypoint);
        let payment_amount = "5500000000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let mut deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        let new_payment_amount = "1111111111";
        assert_eq!(deploy.payment_amount(1_u64).to_string(), payment_amount);
        deploy = deploy.with_standard_payment(new_payment_amount, None);
        assert!(!deploy.is_valid());
        assert_eq!(deploy.payment_amount(1_u64).to_string(), new_payment_amount);
    }

    pub async fn test_deploy_type_is_expired() {
        let old_timestamp = "2023-09-05T16:53:46";
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            Some(old_timestamp.to_string()),
            Some(TTL.to_string()),
        );
        let payment_amount = "10000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let transfer_amount = "5500000000";
        let mut deploy = Deploy::with_transfer(
            transfer_amount,
            DEFAULT_TARGET_ACCOUNT,
            None,
            deploy_params,
            payment_params,
        )
        .unwrap();
        assert!(deploy.is_valid());
        assert!(!deploy.timestamp().is_empty());
        assert!(deploy.expired());
        let deploy_timestamp = &deploy.timestamp()[..19];
        assert_eq!(deploy_timestamp, old_timestamp);

        let current_timestamp = &get_current_timestamp(None)[..19];
        assert_ne!(deploy_timestamp, current_timestamp);
        deploy = deploy.with_timestamp(current_timestamp, Some(DEFAULT_TEST_KEY.to_string()));
        assert!(deploy.is_valid());
        assert!(!deploy.timestamp().is_empty());
        assert!(!deploy.expired());
        assert_eq!(&deploy.timestamp()[..19], current_timestamp);
    }

    pub async fn test_deploy_type_sign() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            None,
            None,
            Some(TTL.to_string()),
        );
        let payment_amount = "10000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let transfer_amount = "5500000000";
        let mut deploy = Deploy::with_transfer(
            transfer_amount,
            DEFAULT_TARGET_ACCOUNT,
            None,
            deploy_params,
            payment_params,
        )
        .unwrap();
        assert!(!deploy.is_valid());
        assert!(deploy.has_valid_hash());
        let compute_approvals_hash = deploy.compute_approvals_hash();
        assert_eq!(&deploy.account(), DEFAULT_SESSION_ACCOUNT);
        deploy = deploy.sign(DEFAULT_TEST_KEY);
        assert!(deploy.is_valid());
        let new_compute_approvals_hash = deploy.compute_approvals_hash();
        assert_ne!(compute_approvals_hash, new_compute_approvals_hash);
    }

    pub async fn test_deploy_type_footprint() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let payment_amount = "10000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let transfer_amount = "5500000000";
        let deploy = Deploy::with_transfer(
            transfer_amount,
            DEFAULT_TARGET_ACCOUNT,
            None,
            deploy_params,
            payment_params,
        )
        .unwrap();
        assert!(deploy.is_valid());
        let footprint = deploy.footprint();
        assert!(!footprint.size_estimate.to_string().is_empty());
        assert!(footprint.is_transfer);
    }

    pub async fn test_deploy_type_empty_args() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(session_hash);
        session_params.set_session_entry_point(entrypoint);
        let payment_amount = "5500000000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert!(deploy.args().is_empty());
    }

    pub async fn test_deploy_type_args() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let mut session_params = SessionStrParams::default();
        session_params.set_session_hash(session_hash);
        session_params.set_session_entry_point(entrypoint);
        let args = Vec::from([
            "joe:bool='true'".to_string(),
            "bob:bool='false'".to_string(),
        ]);
        session_params.set_session_args(args.clone());
        let payment_amount = "5500000000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert!(!deploy.args().is_empty());
        assert_eq!(deploy.args().len(), args.len());
    }

    pub async fn test_deploy_type_args_json() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(session_hash);
        session_params.set_session_entry_point(entrypoint);
        let args_json = r#"[{"name": "joe", "type": "U256", "value": 1}]"#;
        session_params.set_session_args_json(args_json);
        let payment_amount = "5500000000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert!(!deploy.args().is_empty());
        assert_eq!(deploy.args().len(), 1);
    }

    pub async fn test_deploy_type_add_arg() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(session_hash);
        session_params.set_session_entry_point(entrypoint);
        let payment_amount = "5500000000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        let mut deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert!(deploy.args().is_empty());
        deploy = deploy.add_arg(
            "test:bool='false".into(),
            Some(DEFAULT_TEST_KEY.to_string()),
        );
        assert!(deploy.is_valid());
        assert_eq!(deploy.args().len(), 1);
        let arg_json = r#"{"name": "joe", "type": "U256", "value": 1}"#; // No brackets only one arg
        deploy = deploy.add_arg(arg_json.into(), Some(DEFAULT_TEST_KEY.to_string()));
        assert!(deploy.is_valid());
        assert_eq!(deploy.args().len(), 2);
    }
}

#[cfg(test)]
mod tests_deploy {
    use super::test_module_deploy::*;
    use tokio::test;

    #[test]
    pub async fn test_deploy_type_test() {
        test_deploy_type().await;
    }
    #[test]
    pub async fn test_deploy_type_transfer_test() {
        test_deploy_type_transfer().await;
    }
    #[test]
    pub async fn test_deploy_type_test_with_ttl_test() {
        test_deploy_type_with_ttl().await;
    }
    #[test]
    pub async fn test_deploy_type_test_with_timestamp_test() {
        test_deploy_type_with_timestamp().await;
    }
    #[test]
    pub async fn test_deploy_type_test_with_chain_name_test() {
        test_deploy_type_with_chain_name().await;
    }
    #[test]
    pub async fn test_deploy_type_test_with_account_test() {
        test_deploy_type_with_account().await;
    }
    #[test]
    pub async fn test_deploy_type_test_with_entry_point_name_test() {
        test_deploy_type_with_entry_point_name().await;
    }
    #[test]
    pub async fn test_deploy_type_test_with_hash_test() {
        test_deploy_type_with_hash().await;
    }
    #[test]
    pub async fn test_deploy_type_test_by_name_test() {
        test_deploy_type_by_name().await;
    }
    #[test]
    pub async fn test_deploy_type_test_with_package_hash_test() {
        test_deploy_type_with_package_hash().await;
    }
    #[test]
    pub async fn test_deploy_type_test_with_module_bytes_test() {
        test_deploy_type_with_module_bytes().await;
    }
    #[test]
    pub async fn test_deploy_type_test_with_secret_key_test() {
        test_deploy_type_with_secret_key().await;
    }
    #[test]
    pub async fn test_deploy_type_with_standard_payment_test() {
        test_deploy_type_with_standard_payment().await;
    }
    #[test]
    pub async fn test_deploy_type_is_expired_test() {
        test_deploy_type_is_expired().await;
    }
    #[test]
    pub async fn test_deploy_type_sign_test() {
        test_deploy_type_sign().await;
    }
    #[test]
    pub async fn test_deploy_type_footprint_test() {
        test_deploy_type_footprint().await;
    }
    #[test]
    pub async fn test_deploy_type_empty_args_test() {
        test_deploy_type_empty_args().await;
    }
    #[test]
    pub async fn test_deploy_type_args_test() {
        test_deploy_type_args().await;
    }
    #[test]
    pub async fn test_deploy_type_args_json_test() {
        test_deploy_type_args_json().await;
    }
    #[test]
    pub async fn test_deploy_type_add_arg_test() {
        test_deploy_type_add_arg().await;
    }
}