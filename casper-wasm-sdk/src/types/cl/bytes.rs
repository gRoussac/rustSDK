use core::ops::Deref;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Ord, PartialOrd, Eq, PartialEq, Debug, Default, Hash)]
pub struct Bytes(Vec<u8>);

#[wasm_bindgen]
impl Bytes {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Bytes(Vec::new())
    }
}

impl Deref for Bytes {
    type Target = [u8];

    fn deref(&self) -> &Self::Target {
        self.0.deref()
    }
}

// impl From<Vec<u8>> for Bytes {
//     fn from(vec: Vec<u8>) -> Self {
//         Bytes(vec)
//     }
// }

// impl From<Bytes> for Vec<u8> {
//     fn from(bytes: Bytes) -> Self {
//         bytes.0
//     }
// }

// impl From<&[u8]> for Bytes {
//     fn from(bytes: &[u8]) -> Self {
//         Bytes(bytes.to_vec())
//     }
// }

// impl CLTyped for Bytes {
//     fn cl_type() -> CLType {
//         <Vec<u8>>::cl_type()
//     }
// }

// impl AsRef<[u8]> for Bytes {
//     fn as_ref(&self) -> &[u8] {
//         self.0.as_ref()
//     }
// }
