#[allow(dead_code)]
pub mod test_module {
    use crate::tests::helpers::{CHAIN_NAME, DEFAULT_SESSION_ACCOUNT, DEFAULT_TTL, TTL};
    use casper_wasm_sdk::{
        debug::{error, log},
        helpers::hex_to_uint8_vec,
        types::deploy_params::{
            deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
            session_str_params::SessionStrParams,
        },
    };
    use std::time;
    // TODO fix mutex bug https://github.com/hyperium/hyper/issues/2112 lazy_static not working
    pub const WAIT_TIME: std::time::Duration = time::Duration::from_millis(2000);

    pub async fn test_hex_to_uint8_vec() {
        let test: Vec<u8> =
            hex_to_uint8_vec("0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54");
        assert!(!test.is_empty());
        assert_eq!(test.len(), 33);
    }

    pub async fn test_error() {
        error("bound error to std");
    }

    pub async fn test_log() {
        log("bound log to std");
    }

    pub async fn test_deploy_params() {
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            None,
            None,
            Some(TTL.to_string()),
        );
        assert_eq!(deploy_params.chain_name().unwrap(), CHAIN_NAME);
        assert_eq!(deploy_params.ttl().unwrap(), TTL);
        assert_eq!(
            deploy_params.session_account().unwrap(),
            DEFAULT_SESSION_ACCOUNT
        );
        assert_eq!(deploy_params.secret_key(), None);
        assert!(deploy_params.timestamp().is_some());
    }

    pub async fn test_deploy_params_defaults() {
        let deploy_params = DeployStrParams::default();
        deploy_params.set_chain_name(CHAIN_NAME);
        deploy_params.set_session_account(DEFAULT_SESSION_ACCOUNT);

        assert_eq!(deploy_params.chain_name().unwrap(), CHAIN_NAME);
        assert_eq!(
            deploy_params.session_account().unwrap(),
            DEFAULT_SESSION_ACCOUNT
        );
        assert!(deploy_params.timestamp().is_none());
        assert!(deploy_params.ttl().is_none());

        deploy_params.set_default_ttl();
        deploy_params.set_default_timestamp();
        assert!(deploy_params.timestamp().is_some());
        assert_eq!(deploy_params.ttl().unwrap(), DEFAULT_TTL);
    }

    pub async fn test_session_params() {
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(session_hash);
        session_params.set_session_entry_point(entrypoint);
        assert_eq!(session_params.session_hash().unwrap(), session_hash);
        assert_eq!(session_params.session_entry_point().unwrap(), entrypoint);
    }

    pub async fn test_payment_params() {
        let payment_amount = "5500000000";
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);
        assert_eq!(payment_params.payment_amount().unwrap(), payment_amount);
    }
}

#[cfg(test)]
mod tests {
    use super::test_module::*;
    use tokio::test;

    #[test]
    pub async fn test_hex_to_uint8_vec_test() {
        test_hex_to_uint8_vec().await;
    }
    #[test]
    pub async fn test_error_test() {
        test_error().await;
    }
    #[test]
    pub async fn test_log_test() {
        test_log().await;
    }
    #[test]
    pub async fn test_deploy_params_test() {
        test_deploy_params().await;
    }
    #[test]
    pub async fn test_deploy_params_defaults_test() {
        test_deploy_params_defaults().await;
    }
    #[test]
    pub async fn test_session_params_test() {
        test_session_params().await;
    }
    #[test]
    pub async fn test_payment_params_test() {
        test_payment_params().await;
    }
}
