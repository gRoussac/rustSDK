#[cfg(target_arch = "wasm32")]
use crate::helpers::serialize_result;
use crate::{helpers::get_verbosity_or_default, types::verbosity::Verbosity, SDK};
use casper_client::{list_rpcs, rpcs::results::ListRpcsResult, Error, JsonRpcId, SuccessResponse};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "list_rpcs")]
    pub async fn list_rpcs_js_alias(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
    ) -> JsValue {
        serialize_result(self.list_rpcs(node_address, verbosity).await)
    }
}

impl SDK {
    pub async fn list_rpcs(
        &mut self,
        node_address: &str,
        verbosity: Option<Verbosity>,
    ) -> Result<SuccessResponse<ListRpcsResult>, Error> {
        //log("list_rpcs!");
        list_rpcs(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            get_verbosity_or_default(verbosity).into(),
        )
        .await
    }
}
