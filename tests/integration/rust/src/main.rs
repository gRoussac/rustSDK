mod tests;

#[tokio::main]
async fn main() {
    #[cfg(not(test))]
    crate::tests::run_tests().await;
}
