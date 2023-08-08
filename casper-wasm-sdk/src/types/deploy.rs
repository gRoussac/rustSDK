use casper_types::{Deploy as _Deploy, ExecutableDeployItem, RuntimeArgs};
use serde::{
    ser::{SerializeMap, SerializeStruct},
    Serialize, Serializer,
};
use serde_json::{json, Value as JsonValue};
use wasm_bindgen::prelude::*;

use crate::js::externs::log;

#[derive(Debug, Clone)]
#[wasm_bindgen]
pub struct Deploy(_Deploy);

#[wasm_bindgen]
impl Deploy {
    #[wasm_bindgen(constructor)]
    pub fn new(deploy: JsValue) -> Deploy {
        let deploy: _Deploy = serde_wasm_bindgen::from_value(deploy)
            .map_err(|err| JsValue::from_str(&format!("Failed to deserialize Deploy: {:?}", err)))
            .unwrap();
        Deploy(deploy)
    }
}

impl From<Deploy> for _Deploy {
    fn from(deploy: Deploy) -> Self {
        deploy.0
    }
}

impl From<_Deploy> for Deploy {
    fn from(deploy: _Deploy) -> Self {
        Deploy(deploy)
    }
}

// Unfortunately a runtime argument in session Deploy (as ExecutableDeployItem::Transfer)
// does not serialize from u64 as JS Number so we need to stringify the value
impl Serialize for Deploy {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut obj = serializer.serialize_struct("Deploy", 6)?;
        obj.serialize_field("hash", &self.0.hash())?;
        obj.serialize_field("header", &self.0.header())?;
        obj.serialize_field("payment", &self.0.payment())?;
        obj.serialize_field("approvals", &self.0.approvals())?;
        obj.serialize_field("is_valid", &self.0.is_valid())?;

        let binding = self.0.session();
        let session = match binding {
            ExecutableDeployItem::Transfer { args } => {
                let mut args_array = RuntimeArgs::new();

                for named_arg in args.named_args() {
                    let key = named_arg.name();
                    let value = named_arg.cl_value();
                    if key == "id" {
                        let id_value = value
                            .clone()
                            .into_t::<Option<u64>>()
                            .map(|u64_value| {
                                u64_value
                                    .map(|u64_inner| u64_inner.to_string())
                                    .unwrap_or_else(|| {
                                        "Serialize error on named arg \"id\" u64 to String"
                                            .to_owned()
                                    })
                            })
                            .unwrap_or_else(|err| {
                                log(&format!(
                                    "Error converting named arg \"id\" value to String: {:?}",
                                    err
                                ));
                                "Serialize error on named arg \"id\"".to_owned()
                            });

                        args_array.insert(key, id_value).expect("Insertion failed");
                    } else {
                        args_array.insert_cl_value(key, value.clone());
                    }
                }

                ExecutableDeployItem::Transfer { args: args_array }
            }
            _ => binding.clone(),
        };

        obj.serialize_field("session", &session)?;
        obj.end()
    }
}
