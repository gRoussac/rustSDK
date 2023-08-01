/* tslint:disable */
/* eslint-disable */
/**
* @param {string} hex_string
* @returns {Uint8Array}
*/
export function hexToUint8Array(hex_string: string): Uint8Array;
/**
* @param {string} s
*/
export function log(s: string): void;
/**
* @param {Uint8Array} key
* @returns {TransferAddr}
*/
export function fromTransfer(key: Uint8Array): TransferAddr;
/**
*/
export enum Verbosity {
  Low = 0,
  Medium = 1,
  High = 2,
}
/**
*/
export class AccessRights {
  free(): void;
/**
* @returns {number}
*/
  static NONE(): number;
/**
* @returns {number}
*/
  static READ(): number;
/**
* @returns {number}
*/
  static WRITE(): number;
/**
* @returns {number}
*/
  static ADD(): number;
/**
* @returns {number}
*/
  static READ_ADD(): number;
/**
* @returns {number}
*/
  static READ_WRITE(): number;
/**
* @returns {number}
*/
  static ADD_WRITE(): number;
/**
* @returns {number}
*/
  static READ_ADD_WRITE(): number;
/**
* @param {number} access_rights
*/
  constructor(access_rights: number);
/**
* @param {boolean} read
* @param {boolean} write
* @param {boolean} add
* @returns {AccessRights}
*/
  static from_bits(read: boolean, write: boolean, add: boolean): AccessRights;
/**
* @returns {boolean}
*/
  is_readable(): boolean;
/**
* @returns {boolean}
*/
  is_writeable(): boolean;
/**
* @returns {boolean}
*/
  is_addable(): boolean;
/**
* @returns {boolean}
*/
  is_none(): boolean;
}
/**
*/
export class AccountHash {
  free(): void;
/**
* @param {any} account_hash
*/
  constructor(account_hash: any);
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @param {string} input
* @returns {AccountHash}
*/
  static fromFormattedStr(input: string): AccountHash;
}
/**
*/
export class BlockHash {
  free(): void;
/**
* @param {Uint8Array} hash
*/
  constructor(hash: Uint8Array);
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
}
/**
*/
export class BlockIdentifier {
  free(): void;
/**
* @param {BlockIdentifier} block_identifier
*/
  constructor(block_identifier: BlockIdentifier);
/**
* @param {BlockHash} hash
* @returns {BlockIdentifier}
*/
  static from_hash(hash: BlockHash): BlockIdentifier;
/**
* @param {bigint} height
* @returns {BlockIdentifier}
*/
  static fromHeight(height: bigint): BlockIdentifier;
}
/**
*/
export class Deploy {
  free(): void;
/**
* @param {any} deploy
*/
  constructor(deploy: any);
}
/**
*/
export class DeployHash {
  free(): void;
/**
* @param {string} deploy_hash_hex_str
*/
  constructor(deploy_hash_hex_str: string);
/**
* @param {Digest} digest
* @returns {DeployHash}
*/
  static fromDigest(digest: Digest): DeployHash;
}
/**
*/
export class DictionaryAddr {
  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
/**
* @returns {Uint8Array}
*/
  to_vec(): Uint8Array;
}
/**
*/
export class DictionaryItemIdentifier {
  free(): void;
/**
* @param {URef} seed_uref
* @param {string} dictionary_item_key
*/
  constructor(seed_uref: URef, dictionary_item_key: string);
}
/**
*/
export class Digest {
  free(): void;
/**
* @param {string} digest_hex_str
*/
  constructor(digest_hex_str: string);
/**
* @param {Uint8Array} bytes
* @returns {Digest}
*/
  static fromDigest(bytes: Uint8Array): Digest;
}
/**
*/
export class EraId {
  free(): void;
/**
* @param {bigint} value
*/
  constructor(value: bigint);
/**
* @returns {bigint}
*/
  value(): bigint;
}
/**
*/
export class GlobalStateIdentifier {
  free(): void;
/**
* @param {GlobalStateIdentifier} global_state_identifier
*/
  constructor(global_state_identifier: GlobalStateIdentifier);
/**
* @param {BlockHash} block_hash
* @returns {GlobalStateIdentifier}
*/
  static fromBlockHash(block_hash: BlockHash): GlobalStateIdentifier;
/**
* @param {bigint} block_height
* @returns {GlobalStateIdentifier}
*/
  static fromBlockHeight(block_height: bigint): GlobalStateIdentifier;
/**
* @param {Digest} state_root_hash
* @returns {GlobalStateIdentifier}
*/
  static fromStateRootHash(state_root_hash: Digest): GlobalStateIdentifier;
}
/**
*/
export class HashAddr {
  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
/**
* @returns {Uint8Array}
*/
  to_vec(): Uint8Array;
}
/**
*/
export class Key {
  free(): void;
/**
* @param {Key} key
*/
  constructor(key: Key);
/**
* @param {URef} key
* @returns {Key}
*/
  static fromURef(key: URef): Key;
/**
* @param {DeployHash} key
* @returns {Key}
*/
  static fromDeployInfo(key: DeployHash): Key;
/**
* @param {AccountHash} key
* @returns {Key}
*/
  static fromAccount(key: AccountHash): Key;
/**
* @param {HashAddr} key
* @returns {Key}
*/
  static fromHash(key: HashAddr): Key;
/**
* @param {Uint8Array} key
* @returns {TransferAddr}
*/
  static fromTransfer(key: Uint8Array): TransferAddr;
/**
* @param {EraId} key
* @returns {Key}
*/
  static fromEraInfo(key: EraId): Key;
/**
* @param {URefAddr} key
* @returns {Key}
*/
  static fromBalance(key: URefAddr): Key;
/**
* @param {AccountHash} key
* @returns {Key}
*/
  static fromBid(key: AccountHash): Key;
/**
* @param {AccountHash} key
* @returns {Key}
*/
  static fromWithdraw(key: AccountHash): Key;
/**
* @param {DictionaryAddr} key
* @returns {Key}
*/
  static fromDictionary(key: DictionaryAddr): Key;
/**
* @returns {Key}
*/
  static fromSystemContractRegistry(): Key;
/**
* @returns {Key}
*/
  static fromEraSummary(): Key;
/**
* @param {AccountHash} key
* @returns {Key}
*/
  static fromUnbond(key: AccountHash): Key;
/**
* @returns {Key}
*/
  static fromChainspecRegistry(): Key;
/**
* @returns {Key}
*/
  static fromChecksumRegistry(): Key;
}
/**
*/
export class Path {
  free(): void;
/**
* @param {any} path
*/
  constructor(path: any);
}
/**
*/
export class PurseIdentifier {
  free(): void;
/**
* @param {AccountHash} account_hash
* @returns {PurseIdentifier}
*/
  static new_main_purse_under_account_hash(account_hash: AccountHash): PurseIdentifier;
/**
* @param {URef} uref
* @returns {PurseIdentifier}
*/
  static new_purse_uref(uref: URef): PurseIdentifier;
}
/**
*/
export class SDK {
  free(): void;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {DeployHash} deploy_hash
* @param {boolean} finalized_approvals
* @returns {Promise<any>}
*/
  get_deploy(node_address: string, verbosity: number, deploy_hash: DeployHash, finalized_approvals: boolean): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {DeployHash} deploy_hash
* @param {boolean} finalized_approvals
* @returns {Promise<any>}
*/
  info_get_deploy(node_address: string, verbosity: number, deploy_hash: DeployHash, finalized_approvals: boolean): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {BlockIdentifier | undefined} maybe_block_identifier
* @returns {Promise<any>}
*/
  get_era_summary(node_address: string, verbosity: number, maybe_block_identifier?: BlockIdentifier): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {BlockIdentifier | undefined} maybe_block_identifier
* @returns {Promise<any>}
*/
  get_block(node_address: string, verbosity: number, maybe_block_identifier?: BlockIdentifier): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {BlockIdentifier | undefined} maybe_block_identifier
* @returns {Promise<any>}
*/
  chain_get_block(node_address: string, verbosity: number, maybe_block_identifier?: BlockIdentifier): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @returns {Promise<any>}
*/
  get_chainspec(node_address: string, verbosity: number): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {Deploy} deploy
* @returns {Promise<any>}
*/
  put_deploy(node_address: string, verbosity: number, deploy: Deploy): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {Deploy} deploy
* @returns {Promise<any>}
*/
  account_put_deploy(node_address: string, verbosity: number, deploy: Deploy): Promise<any>;
/**
* @param {string} node_address
* @param {BlockIdentifier | undefined} block_identifier
* @param {number} verbosity
* @param {Deploy} deploy
* @returns {Promise<any>}
*/
  speculative_exec(node_address: string, block_identifier: BlockIdentifier | undefined, verbosity: number, deploy: Deploy): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {BlockIdentifier | undefined} maybe_block_identifier
* @param {string} account_identifier
* @returns {Promise<any>}
*/
  get_account(node_address: string, verbosity: number, maybe_block_identifier: BlockIdentifier | undefined, account_identifier: string): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {BlockIdentifier | undefined} maybe_block_identifier
* @param {string} account_identifier
* @returns {Promise<any>}
*/
  state_get_account_info(node_address: string, verbosity: number, maybe_block_identifier: BlockIdentifier | undefined, account_identifier: string): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {BlockIdentifier | undefined} maybe_block_identifier
* @returns {Promise<any>}
*/
  get_auction_info(node_address: string, verbosity: number, maybe_block_identifier?: BlockIdentifier): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {Digest} state_root_hash
* @param {DictionaryItemIdentifier} dictionary_item_identifier
* @returns {Promise<any>}
*/
  get_dictionary_item(node_address: string, verbosity: number, state_root_hash: Digest, dictionary_item_identifier: DictionaryItemIdentifier): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {Digest} state_root_hash
* @param {DictionaryItemIdentifier} dictionary_item_identifier
* @returns {Promise<any>}
*/
  state_get_dictionary_item(node_address: string, verbosity: number, state_root_hash: Digest, dictionary_item_identifier: DictionaryItemIdentifier): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @returns {Promise<any>}
*/
  list_rpcs(node_address: string, verbosity: number): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {GlobalStateIdentifier | undefined} maybe_global_state_identifier
* @param {PurseIdentifier} purse_identifier
* @returns {Promise<any>}
*/
  query_balance(node_address: string, verbosity: number, maybe_global_state_identifier: GlobalStateIdentifier | undefined, purse_identifier: PurseIdentifier): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @returns {Promise<any>}
*/
  get_validator_changes(node_address: string, verbosity: number): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {BlockIdentifier | undefined} maybe_block_identifier
* @returns {Promise<any>}
*/
  get_era_info(node_address: string, verbosity: number, maybe_block_identifier?: BlockIdentifier): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @returns {Promise<any>}
*/
  get_peers(node_address: string, verbosity: number): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {BlockIdentifier | undefined} maybe_block_identifier
* @returns {Promise<any>}
*/
  get_state_root_hash(node_address: string, verbosity: number, maybe_block_identifier?: BlockIdentifier): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {BlockIdentifier | undefined} maybe_block_identifier
* @returns {Promise<any>}
*/
  chain_get_state_root_hash(node_address: string, verbosity: number, maybe_block_identifier?: BlockIdentifier): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {GlobalStateIdentifier} global_state_identifier
* @param {Key} key
* @param {Path} path
* @returns {Promise<any>}
*/
  query_global_state(node_address: string, verbosity: number, global_state_identifier: GlobalStateIdentifier, key: Key, path: Path): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {BlockIdentifier | undefined} maybe_block_identifier
* @returns {Promise<any>}
*/
  get_block_transfers(node_address: string, verbosity: number, maybe_block_identifier?: BlockIdentifier): Promise<any>;
/**
* @returns {SDK}
*/
  static new(): SDK;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {Digest} state_root_hash
* @param {URef} purse
* @returns {Promise<any>}
*/
  get_balance(node_address: string, verbosity: number, state_root_hash: Digest, purse: URef): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @param {Digest} state_root_hash
* @param {URef} purse
* @returns {Promise<any>}
*/
  state_get_balance(node_address: string, verbosity: number, state_root_hash: Digest, purse: URef): Promise<any>;
/**
* @param {string} node_address
* @param {number} verbosity
* @returns {Promise<any>}
*/
  get_node_status(node_address: string, verbosity: number): Promise<any>;
}
/**
*/
export class TransferAddr {
  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
}
/**
*/
export class URef {
  free(): void;
/**
* @param {string} uref_hex_str
* @param {number} access_rights
*/
  constructor(uref_hex_str: string, access_rights: number);
/**
* @param {Uint8Array} bytes
* @param {number} access_rights
* @returns {URef}
*/
  static fromUint8Array(bytes: Uint8Array, access_rights: number): URef;
}
/**
*/
export class URefAddr {
  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
/**
* @returns {Uint8Array}
*/
  to_vec(): Uint8Array;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly hexToUint8Array: (a: number, b: number, c: number) => void;
  readonly __wbg_accounthash_free: (a: number) => void;
  readonly accounthash_new: (a: number, b: number) => void;
  readonly accounthash_toFormattedString: (a: number, b: number) => void;
  readonly accounthash_fromFormattedStr: (a: number, b: number, c: number) => void;
  readonly __wbg_deploy_free: (a: number) => void;
  readonly deploy_new: (a: number) => number;
  readonly deployhash_new: (a: number, b: number, c: number) => void;
  readonly deployhash_fromDigest: (a: number, b: number) => void;
  readonly digest_new: (a: number, b: number, c: number) => void;
  readonly digest_fromDigest: (a: number, b: number, c: number) => void;
  readonly __wbg_purseidentifier_free: (a: number) => void;
  readonly purseidentifier_new_main_purse_under_account_hash: (a: number) => number;
  readonly purseidentifier_new_purse_uref: (a: number) => number;
  readonly __wbg_uref_free: (a: number) => void;
  readonly uref_new: (a: number, b: number, c: number, d: number) => void;
  readonly uref_fromUint8Array: (a: number, b: number, c: number) => number;
  readonly __wbg_deployhash_free: (a: number) => void;
  readonly __wbg_digest_free: (a: number) => void;
  readonly log: (a: number, b: number) => void;
  readonly sdk_get_deploy: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly sdk_info_get_deploy: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly sdk_get_era_summary: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_get_block: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_chain_get_block: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_get_chainspec: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_put_deploy: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_account_put_deploy: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_speculative_exec: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly sdk_get_account: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly sdk_state_get_account_info: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly sdk_get_auction_info: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_get_dictionary_item: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly sdk_state_get_dictionary_item: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly sdk_list_rpcs: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_query_balance: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly sdk_get_validator_changes: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_get_era_info: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_get_peers: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_get_state_root_hash: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_chain_get_state_root_hash: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_query_global_state: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly sdk_get_block_transfers: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly __wbg_sdk_free: (a: number) => void;
  readonly sdk_new: () => number;
  readonly __wbg_accessrights_free: (a: number) => void;
  readonly accessrights_NONE: () => number;
  readonly accessrights_READ: () => number;
  readonly accessrights_WRITE: () => number;
  readonly accessrights_ADD: () => number;
  readonly accessrights_READ_ADD: () => number;
  readonly accessrights_READ_WRITE: () => number;
  readonly accessrights_ADD_WRITE: () => number;
  readonly accessrights_READ_ADD_WRITE: () => number;
  readonly accessrights_new: (a: number, b: number) => void;
  readonly accessrights_from_bits: (a: number, b: number, c: number) => number;
  readonly accessrights_is_readable: (a: number) => number;
  readonly accessrights_is_writeable: (a: number) => number;
  readonly accessrights_is_addable: (a: number) => number;
  readonly accessrights_is_none: (a: number) => number;
  readonly dictionaryaddr_new: (a: number, b: number, c: number) => void;
  readonly dictionaryaddr_to_vec: (a: number, b: number) => void;
  readonly hashaddr_new: (a: number, b: number, c: number) => void;
  readonly transferaddr_new: (a: number, b: number, c: number) => void;
  readonly fromTransfer: (a: number, b: number) => number;
  readonly urefaddr_new: (a: number, b: number, c: number) => void;
  readonly __wbg_blockhash_free: (a: number) => void;
  readonly blockhash_new: (a: number, b: number) => number;
  readonly blockhash_toBytes: (a: number, b: number) => void;
  readonly __wbg_blockidentifier_free: (a: number) => void;
  readonly blockidentifier_new: (a: number) => number;
  readonly blockidentifier_from_hash: (a: number) => number;
  readonly blockidentifier_fromHeight: (a: number) => number;
  readonly __wbg_dictionaryitemidentifier_free: (a: number) => void;
  readonly dictionaryitemidentifier_new: (a: number, b: number, c: number) => number;
  readonly __wbg_eraid_free: (a: number) => void;
  readonly eraid_new: (a: number) => number;
  readonly eraid_value: (a: number) => number;
  readonly globalstateidentifier_fromStateRootHash: (a: number) => number;
  readonly __wbg_key_free: (a: number) => void;
  readonly key_new: (a: number, b: number) => void;
  readonly key_fromURef: (a: number) => number;
  readonly key_fromDeployInfo: (a: number) => number;
  readonly key_fromAccount: (a: number) => number;
  readonly key_fromHash: (a: number) => number;
  readonly key_fromEraInfo: (a: number) => number;
  readonly key_fromBalance: (a: number) => number;
  readonly key_fromBid: (a: number) => number;
  readonly key_fromWithdraw: (a: number) => number;
  readonly key_fromDictionary: (a: number) => number;
  readonly key_fromSystemContractRegistry: () => number;
  readonly key_fromEraSummary: () => number;
  readonly key_fromUnbond: (a: number) => number;
  readonly key_fromChainspecRegistry: () => number;
  readonly key_fromChecksumRegistry: () => number;
  readonly __wbg_path_free: (a: number) => void;
  readonly path_new: (a: number) => number;
  readonly globalstateidentifier_fromBlockHeight: (a: number) => number;
  readonly hashaddr_to_vec: (a: number, b: number) => void;
  readonly urefaddr_to_vec: (a: number, b: number) => void;
  readonly globalstateidentifier_fromBlockHash: (a: number) => number;
  readonly key_fromTransfer: (a: number, b: number) => number;
  readonly __wbg_hashaddr_free: (a: number) => void;
  readonly __wbg_transferaddr_free: (a: number) => void;
  readonly __wbg_urefaddr_free: (a: number) => void;
  readonly __wbg_dictionaryaddr_free: (a: number) => void;
  readonly __wbg_globalstateidentifier_free: (a: number) => void;
  readonly globalstateidentifier_new: (a: number) => number;
  readonly sdk_get_balance: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly sdk_state_get_balance: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly sdk_get_node_status: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly wasm_bindgen__convert__closures__invoke1_mut__h85c6c3cba794dad3: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h6781a696866739b3: (a: number, b: number, c: number, d: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
