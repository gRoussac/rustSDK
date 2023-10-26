#![cfg(not(test))]

pub mod config;
pub mod tests;
use lazy_static::lazy_static;
use tokio::sync::Mutex;

#[tokio::main]
async fn main() {
    // Run config initialize for run_tests
    //  let _ = async_main().await;
    tests::_run_tests_or_examples().await;
}

lazy_static! {
    pub static ref INITIALIZED: Mutex<bool> = Mutex::new(false);
}

// pub async fn async_main() -> Result<(), Box<dyn std::error::Error>> {
//     let mut initialized_guard = INITIALIZED.lock().await;
//     if !*initialized_guard {
//         let config = initialize_test_config().await?;
//         *CONFIG.lock().await = Some(config);
//         *initialized_guard = true;
//     }
//     Ok(())
// }
