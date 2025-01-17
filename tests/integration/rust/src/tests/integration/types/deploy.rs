#[allow(dead_code)]
#[allow(deprecated)]
pub mod test_module_deploy {
    use crate::{
        config::{
            get_config, TestConfig, ARGS_JSON, CONTRACT_CEP78_KEY, DEFAULT_TTL, ENTRYPOINT_MINT,
            HELLO_CONTRACT, PAYMENT_AMOUNT, PAYMENT_TRANSFER_AMOUNT, TIMESTAMP_WAIT_TIME,
            TRANSFER_AMOUNT, TTL, WASM_PATH,
        },
        tests::helpers::read_wasm_file,
    };
    use casper_rust_wasm_sdk::{
        helpers::get_current_timestamp,
        types::{
            deploy::Deploy,
            deploy_params::{
                deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
                session_str_params::SessionStrParams,
            },
            hash::contract_hash::ContractHash,
            hash::contract_package_hash::ContractPackageHash,
            public_key::PublicKey,
        },
    };
    use std::thread;

    pub async fn test_deploy_type() {
        let config: TestConfig = get_config(true).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.secret_key.clone()),
            None,
            Some(TTL.to_string()),
            None,
        );
        let session_params = SessionStrParams::default();
        session_params
            .set_session_hash("fd5b4bee73d43371afbbd8556d3e289c87affd5691bc1e6ef7472cd066963cf7");
        session_params.set_session_entry_point(ENTRYPOINT_MINT);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);
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
        let config: TestConfig = get_config(true).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.secret_key.to_string()),
            None,
            Some(TTL.to_string()),
            None,
        );
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);
        let deploy = Deploy::with_transfer(
            TRANSFER_AMOUNT,
            &config.target_account,
            None,
            deploy_params,
            payment_params,
        )
        .unwrap();
        assert!(deploy.is_valid());
        assert!(deploy.is_transfer());
    }

    pub async fn test_deploy_type_with_ttl() {
        let config: TestConfig = get_config(true).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.secret_key.to_string()),
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
        let mut deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert_eq!(deploy.ttl(), TTL.to_string());
        deploy = deploy.with_ttl(DEFAULT_TTL, Some(config.secret_key.clone()));
        assert!(deploy.is_valid());
        assert_eq!(deploy.ttl(), DEFAULT_TTL.to_string());
    }

    pub async fn test_deploy_type_with_timestamp() {
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
        let mut deploy = Deploy::with_transfer(
            TRANSFER_AMOUNT,
            &config.target_account,
            None,
            deploy_params,
            payment_params,
        )
        .unwrap();
        assert!(deploy.is_valid());
        assert!(!deploy.timestamp().is_empty());
        let deploy_timestamp = &deploy.timestamp()[..19];
        // Do not remove this intentional sleep
        thread::sleep(TIMESTAMP_WAIT_TIME);

        let current_timestamp = &get_current_timestamp(None)[..19];
        assert_ne!(deploy_timestamp, current_timestamp);
        deploy = deploy.with_timestamp(current_timestamp, Some(config.secret_key.clone()));
        assert!(deploy.is_valid());
        assert_eq!(&deploy.timestamp()[..19], current_timestamp);
    }

    pub async fn test_deploy_type_with_chain_name() {
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
        let mut deploy = Deploy::with_transfer(
            TRANSFER_AMOUNT,
            &config.target_account,
            None,
            deploy_params,
            payment_params,
        )
        .unwrap();
        assert!(deploy.is_valid());
        assert_eq!(deploy.chain_name(), config.chain_name);
        deploy = deploy.with_chain_name("test", Some(config.secret_key.clone()));
        assert!(deploy.is_valid());
        assert_eq!(&deploy.chain_name(), "test");
    }

    pub async fn test_deploy_type_with_account() {
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
        let mut deploy = Deploy::with_transfer(
            TRANSFER_AMOUNT,
            &config.target_account,
            None,
            deploy_params,
            payment_params,
        )
        .unwrap();
        assert!(deploy.is_valid());
        assert_eq!(&deploy.account(), &config.account);
        deploy = deploy.with_account(PublicKey::new(&config.target_account).unwrap(), None);
        assert!(!deploy.is_valid());
        assert_eq!(&deploy.account(), &config.target_account);
    }

    pub async fn test_deploy_type_with_entry_point_name() {
        let config: TestConfig = get_config(true).await;
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
        let mut deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert_eq!(&deploy.entry_point_name(), ENTRYPOINT_MINT);
        deploy = deploy.with_entry_point_name("name", Some(config.secret_key.clone()));
        assert!(deploy.is_valid());
        assert_eq!(&deploy.entry_point_name(), "name");
    }

    pub async fn test_deploy_type_with_hash() {
        let config: TestConfig = get_config(true).await;
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
        let mut deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert!(deploy.is_stored_contract());

        let new_session_hash = "7b9f86fd244c604012002cde5961464bfd371539c5e6df4b42ada6108090421c";
        deploy = deploy.with_hash(
            ContractHash::new(new_session_hash).unwrap(),
            Some(config.secret_key.clone()),
        );
        assert!(deploy.is_valid());
        assert!(deploy.is_stored_contract());
        assert!(!deploy
            .to_json_string()
            .unwrap()
            .contains(&config.contract_cep78_key));
        assert!(deploy.to_json_string().unwrap().contains(new_session_hash));
    }

    pub async fn test_deploy_type_by_name() {
        let config: TestConfig = get_config(true).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.secret_key.clone()),
            None,
            Some(TTL.to_string()),
            None,
        );
        let session_params = SessionStrParams::default();
        session_params.set_session_entry_point(ENTRYPOINT_MINT);
        session_params.set_session_name(CONTRACT_CEP78_KEY);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);
        let deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert!(deploy.is_stored_contract());
        assert_eq!(deploy.by_name().unwrap().to_string(), CONTRACT_CEP78_KEY);
    }

    pub async fn test_deploy_type_with_package_hash() {
        let config: TestConfig = get_config(true).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.secret_key.clone()),
            None,
            Some(TTL.to_string()),
            None,
        );

        let session_params = SessionStrParams::default();

        session_params.set_session_package_hash(&config.contract_cep78_package_hash);
        session_params.set_session_entry_point(ENTRYPOINT_MINT);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        let mut deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert!(deploy.is_stored_contract_package());

        let new_session_package_hash =
            "10fed076cff22b4dc61f08d514cc89084a86fd8c4488cd280c1ca86641010937";
        deploy = deploy.with_package_hash(
            ContractPackageHash::new(new_session_package_hash).unwrap(),
            Some(config.secret_key.clone()),
        );
        assert!(deploy.is_valid());
        assert!(deploy.is_stored_contract_package());
        assert!(!deploy
            .to_json_string()
            .unwrap()
            .contains(&config.contract_cep78_package_hash));
        assert!(deploy
            .to_json_string()
            .unwrap()
            .contains(new_session_package_hash));
    }

    pub async fn test_deploy_type_with_module_bytes() {
        let config: TestConfig = get_config(true).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.secret_key.clone()),
            None,
            Some(TTL.to_string()),
            None,
        );
        let session_params = SessionStrParams::default();
        session_params.set_session_bytes(Vec::from([0]).into());
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);
        let mut deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());

        assert!(deploy
            .to_json_string()
            .unwrap()
            .contains("\"module_bytes\":\"00\""));
        let file_path = &format!("{WASM_PATH}{HELLO_CONTRACT}");
        let module_bytes = match read_wasm_file(file_path) {
            Ok(module_bytes) => module_bytes,
            Err(err) => {
                eprintln!("Error reading file: {:?}", err);
                return;
            }
        };
        deploy = deploy.with_module_bytes(module_bytes.into(), Some(config.secret_key.clone()));
        assert!(deploy.is_valid());
        assert!(deploy.is_module_bytes());
        assert!(!deploy
            .to_json_string()
            .unwrap()
            .contains("\"module_bytes\":\"00\""));
    }

    pub async fn test_deploy_type_with_secret_key() {
        let config: TestConfig = get_config(true).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            None,
            None,
            Some(TTL.to_string()),
            None,
        );
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);
        let mut deploy = Deploy::with_transfer(
            TRANSFER_AMOUNT,
            &config.target_account,
            None,
            deploy_params,
            payment_params,
        )
        .unwrap();
        assert!(!deploy.is_valid());
        assert_eq!(&deploy.account(), &config.account);
        deploy = deploy.with_secret_key(Some(config.secret_key.clone()));
        assert!(deploy.is_valid());
    }

    pub async fn test_deploy_type_with_standard_payment() {
        let config: TestConfig = get_config(true).await;
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
        let mut deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert_eq!(deploy.payment_amount(1_u8).to_string(), PAYMENT_AMOUNT);
        let new_payment_amount = "1111111111";
        deploy = deploy.with_standard_payment(new_payment_amount, None);
        assert!(!deploy.is_valid());
        assert_eq!(deploy.payment_amount(1_u8).to_string(), new_payment_amount);
    }

    pub async fn test_deploy_type_is_expired() {
        let config: TestConfig = get_config(true).await;
        let old_timestamp = "2023-09-05T16:53:46";
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.secret_key.clone()),
            Some(old_timestamp.to_string()),
            Some(TTL.to_string()),
            None,
        );
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);
        let mut deploy = Deploy::with_transfer(
            TRANSFER_AMOUNT,
            &config.target_account,
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
        deploy = deploy.with_timestamp(current_timestamp, Some(config.secret_key.clone()));
        assert!(deploy.is_valid());
        assert!(!deploy.timestamp().is_empty());
        assert!(!deploy.expired());
        assert_eq!(&deploy.timestamp()[..19], current_timestamp);
    }

    pub async fn test_deploy_type_sign() {
        let config: TestConfig = get_config(true).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            None,
            None,
            Some(TTL.to_string()),
            None,
        );
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);
        let mut deploy = Deploy::with_transfer(
            TRANSFER_AMOUNT,
            &config.target_account,
            None,
            deploy_params,
            payment_params,
        )
        .unwrap();
        assert!(!deploy.is_valid());
        assert!(deploy.has_valid_hash());
        let compute_approvals_hash = deploy.compute_approvals_hash();
        assert_eq!(&deploy.account(), &config.account);
        deploy = deploy.sign(&config.secret_key);
        assert!(deploy.is_valid());
        let new_compute_approvals_hash = deploy.compute_approvals_hash();
        assert_ne!(compute_approvals_hash, new_compute_approvals_hash);
    }

    pub async fn test_deploy_type_empty_args() {
        let config: TestConfig = get_config(true).await;
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
        let deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert!(deploy.args().is_empty());
    }

    pub async fn test_deploy_type_args() {
        let config: TestConfig = get_config(true).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.secret_key.clone()),
            None,
            Some(TTL.to_string()),
            None,
        );
        let mut session_params = SessionStrParams::default();
        session_params.set_session_hash(
            &config
                .contract_cep78_key
                .replace("entity-contract-", "hash-"),
        );
        session_params.set_session_entry_point(ENTRYPOINT_MINT);
        let args = Vec::from([
            "foo:Bool='true'".to_string(),
            "bar:String='value'".to_string(),
        ]);
        session_params.set_session_args(args.clone());
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);
        let deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert!(!deploy.args().is_empty());
        assert_eq!(deploy.args().len(), args.len());
    }

    pub async fn test_deploy_type_args_json() {
        let config: TestConfig = get_config(true).await;
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
        session_params.set_session_args_json(ARGS_JSON);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);
        let deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert!(!deploy.args().is_empty());
        assert_eq!(deploy.args().len(), 11);
    }

    pub async fn test_deploy_type_add_arg() {
        let config: TestConfig = get_config(true).await;
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
        let mut deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();
        assert!(deploy.is_valid());
        assert!(deploy.args().is_empty());
        deploy = deploy.add_arg("foo:bool='false".into(), Some(config.secret_key.clone()));
        assert!(deploy.is_valid());
        assert_eq!(deploy.args().len(), 1);
        let arg_json = r#"{"name": "bar", "type": "U256", "value": 1}"#; // No brackets only one arg
        deploy = deploy.add_arg(arg_json.into(), Some(config.secret_key.clone()));
        assert!(deploy.is_valid());
        assert_eq!(deploy.args().len(), 2);
    }

    pub async fn test_deploy_type_add_signature() {
        let config: TestConfig = get_config(true).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            None,
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
        let deploy =
            Deploy::with_payment_and_session(deploy_params, session_params, payment_params)
                .unwrap();

        assert!(!deploy.is_valid());
        assert!(deploy.has_valid_hash());

        assert!(!deploy
            .compute_approvals_hash()
            .unwrap()
            .to_string()
            .is_empty());

        let signature = "02ae4a8f1cd2c7480c3f7d70ba9aa74263703d404334981eec5f940545ebe3ad998996ba8819156086105109eb9bedeba4985d7c36c0beb66bf7ff8505548f3fed";
        let deploy_signed = deploy.add_signature(&config.account, signature);
        let approvals = deploy_signed.approvals();
        let first_approval = &approvals[0];
        assert_eq!(
            first_approval.signer().to_hex_string(),
            config.account.to_string()
        );
        assert_eq!(
            first_approval.signature().to_hex_string(),
            signature.to_string()
        );
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
    #[test]
    pub async fn test_deploy_type_add_signature_test() {
        test_deploy_type_add_signature().await;
    }
}
