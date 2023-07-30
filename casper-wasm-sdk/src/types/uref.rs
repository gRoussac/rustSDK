use casper_types::{bytesrepr::FromBytes, AccessRights, URef as _URef, URefAddr};
use wasm_bindgen::prelude::*;

#[derive(Debug)]
#[wasm_bindgen]
pub struct URef {
    address: Vec<u8>,
    access_rights: u8,
}

#[wasm_bindgen]
impl URef {
    #[wasm_bindgen(constructor)]
    pub fn new(address: Vec<u8>, access_rights: u8) -> Self {
        URef {
            address,
            access_rights,
        }
    }
}

impl From<_URef> for URef {
    fn from(uref: _URef) -> Self {
        URef::new(uref.addr().to_vec(), uref.access_rights().bits())
    }
}

impl From<URef> for _URef {
    fn from(uref: URef) -> Self {
        let (address, _) = URefAddr::from_bytes(&uref.address).unwrap_or_else(|_| {
            panic!("Invalid URef address bytes");
        });

        _URef::new(
            address,
            AccessRights::from_bits(uref.access_rights).unwrap_or_else(|| {
                panic!("Invalid URef access rights");
            }),
        )
    }
}
