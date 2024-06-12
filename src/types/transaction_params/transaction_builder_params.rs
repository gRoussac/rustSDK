use crate::{
    debug::error,
    types::{
        account_hash::AccountHash, addressable_entity_hash::AddressableEntityHash,
        cl::bytes::Bytes, package_hash::PackageHash, public_key::PublicKey, uref::URef,
    },
};
use casper_client::cli::TransactionBuilderParams as _TransactionBuilderParams;
use casper_types::{transaction::TransferTarget as _TransferTarget, U512};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy, Debug)]
pub enum TransferTargetKind {
    PublicKey,
    AccountHash,
    URef,
}

#[wasm_bindgen]
#[derive(Clone, Debug)]
pub struct TransferTarget {
    kind: TransferTargetKind,
    public_key: Option<PublicKey>,
    account_hash: Option<AccountHash>,
    uref: Option<URef>,
}

#[wasm_bindgen]
#[derive(Clone, Debug, Default)]
pub struct TransactionBuilderParams {
    kind: TransactionKind,
    transaction_bytes: Option<Bytes>,
    maybe_source: Option<URef>,
    target: Option<TransferTarget>,
    amount: Option<U512>,
    maybe_id: Option<u64>,
    entity_hash: Option<AddressableEntityHash>,
    entity_alias: Option<String>,
    entry_point: Option<String>,
    package_hash: Option<PackageHash>,
    package_alias: Option<String>,
    maybe_entity_version: Option<u32>,
    public_key: Option<PublicKey>,
    delegation_rate: Option<u8>,
    delegator: Option<PublicKey>,
    validator: Option<PublicKey>,
    new_validator: Option<PublicKey>,
    minimum_delegation_amount: Option<u64>,
    maximum_delegation_amount: Option<u64>,
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, Default)]
pub enum TransactionKind {
    InvocableEntity,
    InvocableEntityAlias,
    Package,
    PackageAlias,
    #[default]
    Session,
    Transfer,
    AddBid,
    Delegate,
    Undelegate,
    Redelegate,
    WithdrawBid,
}

#[wasm_bindgen]
impl TransactionBuilderParams {
    #[wasm_bindgen(js_name = "newSession")]
    pub fn new_session(transaction_bytes: Option<Bytes>) -> TransactionBuilderParams {
        TransactionBuilderParams {
            kind: TransactionKind::Session,
            transaction_bytes,
            entry_point: None,
            maybe_source: None,
            target: None,
            amount: None,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: None,
            delegation_rate: None,
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newTransfer")]
    pub fn new_transfer(
        maybe_source: Option<URef>,
        target: TransferTarget,
        amount: &str,
        maybe_id: Option<u64>,
    ) -> TransactionBuilderParams {
        let amount = convert_amount(amount);
        TransactionBuilderParams {
            kind: TransactionKind::Transfer,
            transaction_bytes: None,
            entry_point: None,
            maybe_source,
            target: Some(target),
            amount,
            maybe_id,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: None,
            delegation_rate: None,
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newInvocableEntity")]
    pub fn new_invocable_entity(entity_hash: &str, entry_point: &str) -> TransactionBuilderParams {
        let addressable_entity_hash = match AddressableEntityHash::from_formatted_str(entity_hash) {
            Ok(hash) => Some(hash),
            Err(_err) => {
                // TODO Fix Jsvalue ret
                //  error(&format!("Error parsing entity hash: {}", err.as_string()));
                None
            }
        };
        TransactionBuilderParams {
            kind: TransactionKind::InvocableEntity,
            transaction_bytes: None,
            entry_point: Some(entry_point.to_string()),
            maybe_source: None,
            target: None,
            amount: None,
            maybe_id: None,
            entity_hash: addressable_entity_hash,
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: None,
            delegation_rate: None,
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newInvocableEntityAlias")]
    pub fn new_invocable_entity_alias(
        entity_alias: &str,
        entry_point: &str,
    ) -> TransactionBuilderParams {
        TransactionBuilderParams {
            kind: TransactionKind::InvocableEntityAlias,
            transaction_bytes: None,
            entry_point: Some(entry_point.to_string()),
            maybe_source: None,
            target: None,
            amount: None,
            maybe_id: None,
            entity_hash: None,
            entity_alias: Some(entity_alias.to_string()),
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: None,
            delegation_rate: None,
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newPackage")]
    pub fn new_package(
        package_hash: &str,
        entry_point: &str,
        maybe_entity_version: Option<String>,
    ) -> TransactionBuilderParams {
        let maybe_package_hash = match PackageHash::from_formatted_str(package_hash) {
            Ok(hash) => Some(hash),
            Err(_err) => {
                // TODO Fix Jsvalue ret
                //  error(&format!("Error parsing entity hash: {}", err.as_string()));
                None
            }
        };

        let maybe_entity_version_as_u32 = parse_maybe_entity_version(maybe_entity_version);

        TransactionBuilderParams {
            kind: TransactionKind::Package,
            transaction_bytes: None,
            entry_point: Some(entry_point.to_string()),
            maybe_source: None,
            target: None,
            amount: None,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: maybe_package_hash,
            package_alias: None,
            maybe_entity_version: maybe_entity_version_as_u32,
            public_key: None,
            delegation_rate: None,
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newPackageAlias")]
    pub fn new_package_alias(
        package_alias: &str,
        entry_point: &str,
        maybe_entity_version: Option<String>,
    ) -> TransactionBuilderParams {
        let maybe_entity_version_as_u32 = parse_maybe_entity_version(maybe_entity_version);
        TransactionBuilderParams {
            kind: TransactionKind::PackageAlias,
            transaction_bytes: None,
            entry_point: Some(entry_point.to_string()),
            maybe_source: None,
            target: None,
            amount: None,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: Some(package_alias.to_string()),
            maybe_entity_version: maybe_entity_version_as_u32,
            public_key: None,
            delegation_rate: None,
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newAddBid")]
    pub fn new_add_bid(
        public_key: PublicKey,
        delegation_rate: u8,
        amount: &str,
        minimum_delegation_amount: u64,
        maximum_delegation_amount: u64,
    ) -> TransactionBuilderParams {
        let cloned_amount = amount.to_string();
        let amount = U512::from_dec_str(&cloned_amount)
            .map_err(|err| {
                error(&format!("Error converting amount: {:?}", err));
            })
            .ok();
        TransactionBuilderParams {
            kind: TransactionKind::AddBid,
            transaction_bytes: None,
            entry_point: None,
            maybe_source: None,
            target: None,
            amount,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: Some(public_key),
            delegation_rate: Some(delegation_rate),
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: Some(minimum_delegation_amount),
            maximum_delegation_amount: Some(maximum_delegation_amount),
        }
    }

    #[wasm_bindgen(js_name = "newDelegate")]
    pub fn new_delegate(
        delegator: PublicKey,
        validator: PublicKey,
        amount: &str,
    ) -> TransactionBuilderParams {
        let amount = convert_amount(amount);
        TransactionBuilderParams {
            kind: TransactionKind::Delegate,
            transaction_bytes: None,
            entry_point: None,
            maybe_source: None,
            target: None,
            amount,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: None,
            delegation_rate: None,
            delegator: Some(delegator),
            validator: Some(validator),
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newUndelegate")]
    pub fn new_undelegate(
        delegator: PublicKey,
        validator: PublicKey,
        amount: &str,
    ) -> TransactionBuilderParams {
        let amount = convert_amount(amount);
        TransactionBuilderParams {
            kind: TransactionKind::Undelegate,
            transaction_bytes: None,
            entry_point: None,
            maybe_source: None,
            target: None,
            amount,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: None,
            delegation_rate: None,
            delegator: Some(delegator),
            validator: Some(validator),
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newRedelegate")]
    pub fn new_redelegate(
        delegator: PublicKey,
        validator: PublicKey,
        new_validator: PublicKey,
        amount: &str,
    ) -> TransactionBuilderParams {
        let amount = convert_amount(amount);
        TransactionBuilderParams {
            kind: TransactionKind::Redelegate,
            transaction_bytes: None,
            entry_point: None,
            maybe_source: None,
            target: None,
            amount,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: None,
            delegation_rate: None,
            delegator: Some(delegator),
            validator: Some(validator),
            new_validator: Some(new_validator),
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newWithdrawBid")]
    pub fn new_withdraw_bid(public_key: PublicKey, amount: &str) -> TransactionBuilderParams {
        let amount = convert_amount(amount);
        TransactionBuilderParams {
            kind: TransactionKind::WithdrawBid,
            transaction_bytes: None,
            entry_point: None,
            maybe_source: None,
            target: None,
            amount,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: Some(public_key),
            delegation_rate: None,
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }
}

// Convert TransactionBuilderParams to casper_client::cli::TransactionBuilderParams
pub fn transaction_builder_params_to_casper_client(
    transaction_params: &TransactionBuilderParams,
) -> _TransactionBuilderParams<'_> {
    match transaction_params.kind {
        TransactionKind::Session => _TransactionBuilderParams::Session {
            transaction_bytes: transaction_params
                .transaction_bytes
                .clone()
                .unwrap_or_default()
                .into(),
        },
        TransactionKind::Transfer => _TransactionBuilderParams::Transfer {
            maybe_source: transaction_params.maybe_source.clone().map(Into::into),
            target: transaction_params
                .target
                .as_ref()
                .map(|transaction| match transaction.kind {
                    TransferTargetKind::PublicKey => {
                        _TransferTarget::PublicKey(transaction.public_key.clone().unwrap().into())
                    }
                    TransferTargetKind::AccountHash => _TransferTarget::AccountHash(
                        transaction.account_hash.clone().unwrap().into(),
                    ),
                    TransferTargetKind::URef => {
                        _TransferTarget::URef(transaction.uref.clone().unwrap().into())
                    }
                })
                .unwrap(),
            amount: transaction_params.amount.unwrap_or_default(),
            maybe_id: transaction_params.maybe_id,
        },
        TransactionKind::InvocableEntity => _TransactionBuilderParams::InvocableEntity {
            entity_hash: transaction_params.entity_hash.unwrap().into(),
            entry_point: transaction_params
                .entry_point
                .as_deref()
                .unwrap_or_default(),
        },
        TransactionKind::InvocableEntityAlias => _TransactionBuilderParams::InvocableEntityAlias {
            entity_alias: transaction_params
                .entity_alias
                .as_deref()
                .unwrap_or_default(),
            entry_point: transaction_params
                .entry_point
                .as_deref()
                .unwrap_or_default(),
        },
        TransactionKind::Package => _TransactionBuilderParams::Package {
            package_hash: transaction_params.package_hash.unwrap().into(),
            maybe_entity_version: transaction_params.maybe_entity_version,
            entry_point: transaction_params
                .entry_point
                .as_deref()
                .unwrap_or_default(),
        },
        TransactionKind::PackageAlias => _TransactionBuilderParams::PackageAlias {
            package_alias: transaction_params
                .package_alias
                .as_deref()
                .unwrap_or_default(),
            maybe_entity_version: transaction_params.maybe_entity_version,
            entry_point: transaction_params
                .entry_point
                .as_deref()
                .unwrap_or_default(),
        },
        TransactionKind::AddBid => _TransactionBuilderParams::AddBid {
            public_key: transaction_params.public_key.clone().unwrap().into(),
            delegation_rate: transaction_params.delegation_rate.unwrap(),
            amount: transaction_params.amount.unwrap_or_default(),
            minimum_delegation_amount: transaction_params
                .minimum_delegation_amount
                .unwrap_or_default(),
            maximum_delegation_amount: transaction_params
                .maximum_delegation_amount
                .unwrap_or_default(),
        },
        TransactionKind::Delegate => _TransactionBuilderParams::Delegate {
            delegator: transaction_params.delegator.clone().unwrap().into(),
            validator: transaction_params.validator.clone().unwrap().into(),
            amount: transaction_params.amount.unwrap_or_default(),
        },
        TransactionKind::Undelegate => _TransactionBuilderParams::Undelegate {
            delegator: transaction_params.delegator.clone().unwrap().into(),
            validator: transaction_params.validator.clone().unwrap().into(),
            amount: transaction_params.amount.unwrap_or_default(),
        },
        TransactionKind::Redelegate => _TransactionBuilderParams::Redelegate {
            delegator: transaction_params.delegator.clone().unwrap().into(),
            validator: transaction_params.validator.clone().unwrap().into(),
            amount: transaction_params.amount.unwrap_or_default(),
            new_validator: transaction_params.new_validator.clone().unwrap().into(),
        },
        TransactionKind::WithdrawBid => _TransactionBuilderParams::WithdrawBid {
            public_key: transaction_params.public_key.clone().unwrap().into(),
            amount: transaction_params.amount.unwrap_or_default(),
        },
    }
}

fn parse_maybe_entity_version(maybe_entity_version: Option<String>) -> Option<u32> {
    maybe_entity_version.and_then(|version| {
        version
            .parse::<u32>()
            .map_err(|err| {
                error(&format!("Error parsing version: {}", err));
            })
            .ok()
    })
}

fn convert_amount(amount: &str) -> Option<U512> {
    let cloned_amount = amount.to_string();
    U512::from_dec_str(&cloned_amount)
        .map_err(|err| {
            error(&format!("Error converting amount: {:?}", err));
        })
        .ok()
}
