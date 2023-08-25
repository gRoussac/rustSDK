pub mod helpers;
pub mod integration_tests;
#[cfg(test)]
pub mod unit_tests;

#[cfg(not(test))]
pub async fn run_tests() {
    // integration_tests::test_module::test_get_peers().await;
    // integration_tests::test_module::test_hex_to_uint8_vec().await;
    // integration_tests::test_module::test_log().await;
    // integration_tests::test_module::test_error().await;
    // integration_tests::test_module::test_deploy_params().await;
    // integration_tests::test_module::test_deploy_params_defaults().await;
    // integration_tests::test_module::test_session_params().await;
    // integration_tests::test_module::test_payment_params().await;
    //integration_tests::test_module::test_deploy().await;
}
