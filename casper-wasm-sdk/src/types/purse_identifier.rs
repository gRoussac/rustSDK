use super::{account_hash::AccountHash, uref::URef};
use casper_client::rpcs::PurseIdentifier as _PurseIdentifier;
//use casper_types::PublicKey;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct PurseIdentifier(_PurseIdentifier);

#[wasm_bindgen]
impl PurseIdentifier {
    // TODO PublicKey
    // #[wasm_bindgen(constructor)]
    // pub fn new_main_purse_under_publicKey(key: PublicKey) -> Self {
    //     _PurseIdentifier::MainPurseUnderPublicKey(key)
    // }

    pub fn new_main_purse_under_account_hash(account_hash: AccountHash) -> Self {
        PurseIdentifier(_PurseIdentifier::MainPurseUnderAccountHash(
            account_hash.into(),
        ))
    }

    pub fn new_purse_uref(uref: URef) -> Self {
        PurseIdentifier(_PurseIdentifier::PurseUref(uref.into()))
    }
}

// impl From<PurseIdentifier> for PublicKey {
//     fn from(purse_identifier: PurseIdentifier) -> Self {
//         match purse_identifier {
//             PurseIdentifier(_PurseIdentifier::MainPurseUnderPublicKey(key)) => key.into(),
//             _ => unimplemented!("Conversion not implemented for PurseIdentifier to Key"),
//         }
//     }
// }

impl From<PurseIdentifier> for _PurseIdentifier {
    fn from(purse_identifier: PurseIdentifier) -> Self {
        purse_identifier.0
    }
}

impl From<_PurseIdentifier> for PurseIdentifier {
    fn from(purse_identifier: _PurseIdentifier) -> Self {
        PurseIdentifier(purse_identifier)
    }
}

impl From<PurseIdentifier> for AccountHash {
    fn from(purse_identifier: PurseIdentifier) -> Self {
        match purse_identifier {
            PurseIdentifier(_PurseIdentifier::MainPurseUnderAccountHash(account_hash)) => {
                account_hash.into()
            }
            _ => unimplemented!("Conversion not implemented for PurseIdentifier to AccountHash"),
        }
    }
}

impl From<PurseIdentifier> for URef {
    fn from(purse_identifier: PurseIdentifier) -> Self {
        match purse_identifier {
            PurseIdentifier(_PurseIdentifier::PurseUref(uref)) => uref.into(),
            _ => unimplemented!("Conversion not implemented for PurseIdentifier to URef"),
        }
    }
}

// impl From<PublicKey> for PurseIdentifier {
//     fn from(key: PublicKey) -> Self {
//         PurseIdentifier(_PurseIdentifier::MainPurseUnderPublicKey(key.into()))
//     }
// }

impl From<AccountHash> for PurseIdentifier {
    fn from(account_hash: AccountHash) -> Self {
        PurseIdentifier(_PurseIdentifier::MainPurseUnderAccountHash(
            account_hash.into(),
        ))
    }
}

impl From<URef> for PurseIdentifier {
    fn from(uref: URef) -> Self {
        PurseIdentifier(_PurseIdentifier::PurseUref(uref.into()))
    }
}
