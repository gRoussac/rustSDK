use casper_client::{
    get_account, get_balance, get_block, get_deploy, get_dictionary_item, get_state_root_hash,
    query_global_state,
    rpcs::{
        common::BlockIdentifier as _BlockIdentifier,
        results::{
            GetAccountResult, GetBalanceResult, GetBlockResult, GetDeployResult,
            GetDictionaryItemResult, GetStateRootHashResult, QueryGlobalStateResult,
        },
        DictionaryItemIdentifier as _DictionaryItemIdentifier,
        GlobalStateIdentifier as _GlobalStateIdentifier,
    },
    Error, JsonRpcId, SuccessResponse, Verbosity as _Verbosity,
};

use casper_types::{
    bytesrepr::{FromBytes, ToBytes},
    AccessRights, BlockHash as _BlockHash, DeployHash as _DeployHash, Digest as _Digest,
    Key as _Key, PublicKey, URef as _URef, URefAddr,
};
use js_sys::Array;
use rand::Rng;
use serde::Serialize;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct SDK {}

impl Default for SDK {
    fn default() -> Self {
        Self::new()
    }
}

#[wasm_bindgen]
impl SDK {
    pub fn new() -> Self {
        SDK {}
    }

    #[wasm_bindgen]
    pub async fn chain_get_block(
        &mut self,
        node_address: &str,
        block_identifier: BlockIdentifier,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("chain_get_block!");
        //log(&format!("block_identifier! {:?}", block_identifier));
        let result: Result<SuccessResponse<GetBlockResult>, Error> = get_block(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            Some(block_identifier.into()),
        )
        .await;
        serialize_result(result)
    }

    #[wasm_bindgen]
    pub async fn info_get_deploy(
        &mut self,
        node_address: &str,
        deploy_hash: DeployHash,
        finalized_approvals: bool,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("info_get_deploy!");
        let result: Result<SuccessResponse<GetDeployResult>, Error> = get_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            deploy_hash.into(),
            finalized_approvals,
        )
        .await;
        serialize_result(result)
    }

    #[wasm_bindgen]
    pub async fn get_state_root_hash(
        &mut self,
        node_address: &str,
        block_identifier: BlockIdentifier,
        verbosity: Verbosity,
    ) -> JsValue {
        //  log("state_root_hash!");
        let result: Result<SuccessResponse<GetStateRootHashResult>, Error> = get_state_root_hash(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            Some(block_identifier.into()),
        )
        .await;
        serialize_result(result)
    }

    #[wasm_bindgen]
    pub async fn state_get_account_info(
        &mut self,
        node_address: &str,
        account_identifier: String,
        block_identifier: BlockIdentifier,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("state_get_account_info!");
        let account_identifier_bytes: Vec<u8> = match hex::decode(account_identifier) {
            Ok(bytes) => bytes,
            Err(err) => {
                log(&format!("Error decoding account identifier: {:?}", err));
                return JsValue::null();
            }
        };
        let account_identifier = match PublicKey::from_bytes(&account_identifier_bytes) {
            Ok((public_key, remainder)) if remainder.is_empty() => public_key,
            _ => {
                // Handle the case when the account identifier has an unsupported format or other errors
                error("Error converting account identifier");
                return JsValue::null();
            }
        };

        let result: Result<SuccessResponse<GetAccountResult>, Error> = get_account(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            Some(block_identifier.into()),
            account_identifier,
        )
        .await;
        serialize_result(result)
    }

    #[wasm_bindgen]
    pub async fn state_get_balance(
        &mut self,
        node_address: &str,
        state_root_hash: Digest,
        purse: URef,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("state_get_balance!");
        let result: Result<SuccessResponse<GetBalanceResult>, Error> = get_balance(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            state_root_hash.into(),
            purse.into(),
        )
        .await;
        serialize_result(result)
    }

    #[wasm_bindgen]
    pub async fn state_get_dictionary_item(
        &mut self,
        node_address: &str,
        state_root_hash: Digest,
        dictionary_item_identifier: DictionaryItemIdentifier,
        verbosity: Verbosity,
    ) -> JsValue {
        // log("state_get_dictionary_item!".to_string());
        let result: Result<SuccessResponse<GetDictionaryItemResult>, Error> = get_dictionary_item(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            state_root_hash.into(),
            dictionary_item_identifier.into(),
        )
        .await;
        serialize_result(result)
    }

    #[wasm_bindgen]
    pub async fn query_global_state(
        &mut self,
        node_address: &str,
        global_state_identifier: GlobalStateIdentifier,
        key: Key,
        path: Path,
        verbosity: Verbosity,
    ) -> JsValue {
        //log("query_global_state!");
        let result: Result<SuccessResponse<QueryGlobalStateResult>, Error> = query_global_state(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            node_address,
            verbosity.into(),
            global_state_identifier.into(),
            key.into(),
            path.into(),
        )
        .await;
        serialize_result(result)
    }
}

#[wasm_bindgen]
pub struct DeployHash(_DeployHash);

// Implement conversions between _DeployHash and DeployHash
impl From<DeployHash> for _DeployHash {
    fn from(val: DeployHash) -> Self {
        val.0
    }
}

impl From<_DeployHash> for DeployHash {
    fn from(val: _DeployHash) -> Self {
        DeployHash(val)
    }
}

#[wasm_bindgen]
impl DeployHash {
    // Constructor to create an instance of DeployHash from a hexadecimal string
    #[wasm_bindgen(constructor)]
    pub fn new(hex_str: &str) -> Result<DeployHash, JsValue> {
        let bytes = hex::decode(hex_str).map_err(|err| JsValue::from_str(&format!("{:?}", err)))?;
        let mut hash = [0u8; 32];
        hash.copy_from_slice(&bytes);
        Ok(DeployHash(_Digest::from(hash).into()))
    }
}

macro_rules! impl_from_enum {
    ($from:ty, $to:ty; $($variant:ident),*) => {
        impl From<$from> for $to {
            fn from(val: $from) -> Self {
                match val {
                    $(
                        <$from>::$variant => <$to>::$variant,
                    )*
                }
            }
        }
    };
}

#[wasm_bindgen]
pub enum Verbosity {
    Low,
    Medium,
    High,
}

impl_from_enum!(Verbosity, _Verbosity; Low, Medium, High);

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

// Implement conversion between URef and URef
impl From<_URef> for URef {
    fn from(uref: _URef) -> Self {
        URef::new(uref.addr().to_vec(), uref.access_rights().bits())
    }
}

impl From<URef> for _URef {
    fn from(uref: URef) -> Self {
        let (address, _) = URefAddr::from_bytes(&uref.address).unwrap_or_else(|_| {
            panic!("Invalid URef address bytes"); // Handle the error as needed
        });

        _URef::new(
            address,
            AccessRights::from_bits(uref.access_rights).unwrap_or_else(|| {
                panic!("Invalid URef access rights"); // Handle the error as needed
            }),
        )
    }
}

#[derive(Debug)]
#[wasm_bindgen]
pub struct Digest {
    bytes: Vec<u8>,
}

#[wasm_bindgen]
impl Digest {
    #[wasm_bindgen(constructor)]
    pub fn new(bytes: Vec<u8>) -> Result<Digest, JsValue> {
        let mut digest_bytes = [0u8; _Digest::LENGTH];
        if bytes.len() != _Digest::LENGTH {
            return Err(JsValue::from_str("Invalid Digest length"));
        }
        digest_bytes.copy_from_slice(&bytes);
        Ok(Digest {
            bytes: digest_bytes.to_vec(),
        })
    }
}

impl From<_Digest> for Digest {
    fn from(digest: _Digest) -> Self {
        Digest {
            bytes: digest.value().to_vec(),
        }
    }
}

impl From<Digest> for _Digest {
    fn from(digest: Digest) -> Self {
        _Digest::try_from(digest.bytes.as_slice()).expect("Invalid Digest bytes")
    }
}

#[derive(Debug)]
#[wasm_bindgen]
pub struct GlobalStateIdentifier(_GlobalStateIdentifier);

#[wasm_bindgen]
impl GlobalStateIdentifier {
    // Constructor to create an instance of GlobalStateIdentifier
    #[wasm_bindgen(constructor)]
    pub fn new(global_state_identifier: GlobalStateIdentifier) -> GlobalStateIdentifier {
        global_state_identifier
    }

    // Constructor to create an instance of GlobalStateIdentifier from a block hash
    #[wasm_bindgen(js_name = fromBlockHash)]
    pub fn from_block_hash(block_hash: BlockHash) -> GlobalStateIdentifier {
        GlobalStateIdentifier(_GlobalStateIdentifier::BlockHash(block_hash.into()))
    }

    // Constructor to create an instance of GlobalStateIdentifier from a block height (u64)
    #[wasm_bindgen(js_name = fromBlockHeight)]
    pub fn from_block_height(block_height: u64) -> GlobalStateIdentifier {
        GlobalStateIdentifier(_GlobalStateIdentifier::BlockHeight(block_height))
    }

    // Constructor to create an instance of GlobalStateIdentifier from a state root hash (Digest)
    #[wasm_bindgen(js_name = fromStateRootHash)]
    pub fn from_state_root_hash(state_root_hash: Digest) -> GlobalStateIdentifier {
        GlobalStateIdentifier(_GlobalStateIdentifier::StateRootHash(
            state_root_hash.into(),
        ))
    }
}

// Implement conversion between GlobalStateIdentifier and _GlobalStateIdentifier
impl From<GlobalStateIdentifier> for _GlobalStateIdentifier {
    fn from(wrapper: GlobalStateIdentifier) -> Self {
        wrapper.0
    }
}

impl From<_GlobalStateIdentifier> for GlobalStateIdentifier {
    fn from(identifier: _GlobalStateIdentifier) -> Self {
        GlobalStateIdentifier(identifier)
    }
}

#[derive(Debug)]
#[wasm_bindgen]
pub struct BlockIdentifier(_BlockIdentifier);

#[wasm_bindgen]
impl BlockIdentifier {
    // Constructor to create an instance of GlobalStateIdentifier
    #[wasm_bindgen(constructor)]
    pub fn new(block_identifier: BlockIdentifier) -> BlockIdentifier {
        block_identifier
    }

    pub fn from_hash(hash: BlockHash) -> Self {
        BlockIdentifier(_BlockIdentifier::Hash(hash.into()))
    }

    // Constructor for creating an instance of BlockIdentifier from a block height (u64)
    #[wasm_bindgen(js_name = fromHeight)]
    pub fn from_height(height: u64) -> Self {
        BlockIdentifier(_BlockIdentifier::Height(height))
    }
}

// Implement conversion between BlockIdentifier and _BlockIdentifier
impl From<BlockIdentifier> for _BlockIdentifier {
    fn from(block_identifier: BlockIdentifier) -> Self {
        block_identifier.0
    }
}

impl From<_BlockIdentifier> for BlockIdentifier {
    fn from(block_identifier: _BlockIdentifier) -> Self {
        BlockIdentifier(block_identifier)
    }
}

#[derive(Debug)]
#[wasm_bindgen]
pub struct DictionaryItemIdentifier(_DictionaryItemIdentifier);

#[wasm_bindgen]
impl DictionaryItemIdentifier {
    // Constructor to create an instance of `DictionaryItemIdentifier`
    #[wasm_bindgen(constructor)]
    pub fn new(seed_uref: URef, dictionary_item_key: String) -> Self {
        let dictionary_item_identifier = _DictionaryItemIdentifier::URef {
            seed_uref: _URef::from(seed_uref),
            dictionary_item_key,
        };
        DictionaryItemIdentifier(dictionary_item_identifier)
    }
}

// Implement conversion between `DictionaryItemIdentifier` and `_DictionaryItemIdentifier`
impl From<DictionaryItemIdentifier> for _DictionaryItemIdentifier {
    fn from(dictionary_item_identifier: DictionaryItemIdentifier) -> Self {
        dictionary_item_identifier.0
    }
}

impl From<_DictionaryItemIdentifier> for DictionaryItemIdentifier {
    fn from(identifier: _DictionaryItemIdentifier) -> Self {
        DictionaryItemIdentifier(identifier)
    }
}

#[wasm_bindgen]
pub struct Key(_Key);

#[wasm_bindgen]
impl Key {
    #[wasm_bindgen(constructor)]
    pub fn new(key: Key) -> Result<Key, JsValue> {
        let key: _Key = key.into();
        Ok(Key(key))
    }

    #[wasm_bindgen(js_name = fromURef)]
    pub fn from_uref(key: URef) -> Key {
        Key(_Key::URef(key.into()))
    }

    #[wasm_bindgen(js_name = fromDeployInfo)]
    pub fn from_deploy_info(key: DeployHash) -> Key {
        Key(_Key::DeployInfo(key.into()))
    }
}

// Implement conversion between Key and _Key (if not already implemented)
impl From<Key> for _Key {
    fn from(wrapper: Key) -> Self {
        wrapper.0
    }
}

impl From<_Key> for Key {
    fn from(key: _Key) -> Self {
        Key(key)
    }
}

#[wasm_bindgen]
pub struct Path {
    path: Vec<String>,
}

#[wasm_bindgen]
impl Path {
    #[wasm_bindgen(constructor)]
    pub fn new(path: JsValue) -> Self {
        let path: Array = path.into();
        let path: Vec<String> = path
            .iter()
            .map(|value| {
                value
                    .as_string()
                    .unwrap_or_else(|| String::from("Invalid String"))
            })
            .collect();

        Path { path }
    }
}

impl From<Path> for Vec<String> {
    fn from(path: Path) -> Self {
        path.path
    }
}

impl From<Vec<String>> for Path {
    fn from(path: Vec<String>) -> Self {
        Path { path }
    }
}

// Define the struct for BlockHash
#[wasm_bindgen]
pub struct BlockHash(_BlockHash);

// Implement From for BlockHash
impl From<BlockHash> for _BlockHash {
    fn from(wrapper: BlockHash) -> Self {
        wrapper.0
    }
}

impl From<_BlockHash> for BlockHash {
    fn from(block_hash: _BlockHash) -> Self {
        BlockHash(block_hash)
    }
}

// Now define the methods for the BlockHash
#[wasm_bindgen]
impl BlockHash {
    // Constructor to create an instance of BlockHash from a byte array
    #[wasm_bindgen(constructor)]
    pub fn new(hash: &[u8]) -> Self {
        let (block_hash, _) =
            _BlockHash::from_bytes(hash).expect("Failed to create BlockHash from bytes");
        BlockHash(block_hash)
    }

    // Method to get the underlying bytes of the BlockHash
    #[wasm_bindgen(js_name = toBytes)]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.0.to_bytes().expect("Failed to serialize BlockHash")
    }
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    pub fn log_with_prefix(s: &str);
}

#[wasm_bindgen]
pub fn log(s: &str) {
    let prefixed_s = format!("wasm {}", s);
    log_with_prefix(&prefixed_s);
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    pub fn error(s: &str);
}

fn serialize_result<T: Serialize>(result: Result<T, Error>) -> JsValue {
    match result {
        Ok(data) => match serde_wasm_bindgen::to_value(&data) {
            Ok(json) => json,
            Err(err) => {
                error(&format!("Error serializing data to JSON: {:?}", err));
                JsValue::null()
            }
        },
        Err(err) => {
            error(&format!("Error occurred: {:?}", err));
            JsValue::null()
        }
    }
}
