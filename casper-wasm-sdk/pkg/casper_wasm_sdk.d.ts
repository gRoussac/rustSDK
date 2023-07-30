/* tslint:disable */
/* eslint-disable */
/**
* @param {string} s
*/
export function log(s: string): void;
/**
*/
export enum Verbosity {
  Low = 0,
  Medium = 1,
  High = 2,
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
export class DeployHash {
  free(): void;
/**
* @param {string} hex_str
*/
  constructor(hex_str: string);
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
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
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
export class SDK {
  free(): void;
/**
* @returns {SDK}
*/
  static new(): SDK;
/**
* @param {string} node_address
* @param {BlockIdentifier} block_identifier
* @param {number} verbosity
* @returns {Promise<any>}
*/
  chain_get_block(node_address: string, block_identifier: BlockIdentifier, verbosity: number): Promise<any>;
/**
* @param {string} node_address
* @param {DeployHash} deploy_hash
* @param {boolean} finalized_approvals
* @param {number} verbosity
* @returns {Promise<any>}
*/
  info_get_deploy(node_address: string, deploy_hash: DeployHash, finalized_approvals: boolean, verbosity: number): Promise<any>;
/**
* @param {string} node_address
* @param {BlockIdentifier} block_identifier
* @param {number} verbosity
* @returns {Promise<any>}
*/
  get_state_root_hash(node_address: string, block_identifier: BlockIdentifier, verbosity: number): Promise<any>;
/**
* @param {string} node_address
* @param {string} account_identifier
* @param {BlockIdentifier} block_identifier
* @param {number} verbosity
* @returns {Promise<any>}
*/
  state_get_account_info(node_address: string, account_identifier: string, block_identifier: BlockIdentifier, verbosity: number): Promise<any>;
/**
* @param {string} node_address
* @param {Digest} state_root_hash
* @param {URef} purse
* @param {number} verbosity
* @returns {Promise<any>}
*/
  state_get_balance(node_address: string, state_root_hash: Digest, purse: URef, verbosity: number): Promise<any>;
/**
* @param {string} node_address
* @param {Digest} state_root_hash
* @param {DictionaryItemIdentifier} dictionary_item_identifier
* @param {number} verbosity
* @returns {Promise<any>}
*/
  state_get_dictionary_item(node_address: string, state_root_hash: Digest, dictionary_item_identifier: DictionaryItemIdentifier, verbosity: number): Promise<any>;
/**
* @param {string} node_address
* @param {GlobalStateIdentifier} global_state_identifier
* @param {Key} key
* @param {Path} path
* @param {number} verbosity
* @returns {Promise<any>}
*/
  query_global_state(node_address: string, global_state_identifier: GlobalStateIdentifier, key: Key, path: Path, verbosity: number): Promise<any>;
}
/**
*/
export class URef {
  free(): void;
/**
* @param {Uint8Array} address
* @param {number} access_rights
*/
  constructor(address: Uint8Array, access_rights: number);
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly log: (a: number, b: number) => void;
  readonly __wbg_blockhash_free: (a: number) => void;
  readonly blockhash_new: (a: number, b: number) => number;
  readonly blockhash_toBytes: (a: number, b: number) => void;
  readonly __wbg_blockidentifier_free: (a: number) => void;
  readonly blockidentifier_new: (a: number) => number;
  readonly blockidentifier_from_hash: (a: number) => number;
  readonly blockidentifier_fromHeight: (a: number) => number;
  readonly deployhash_new: (a: number, b: number, c: number) => void;
  readonly __wbg_dictionaryitemidentifier_free: (a: number) => void;
  readonly dictionaryitemidentifier_new: (a: number, b: number, c: number) => number;
  readonly __wbg_digest_free: (a: number) => void;
  readonly digest_new: (a: number, b: number, c: number) => void;
  readonly globalstateidentifier_fromStateRootHash: (a: number) => number;
  readonly __wbg_key_free: (a: number) => void;
  readonly key_new: (a: number, b: number) => void;
  readonly key_fromURef: (a: number) => number;
  readonly key_fromDeployInfo: (a: number) => number;
  readonly __wbg_path_free: (a: number) => void;
  readonly path_new: (a: number) => number;
  readonly __wbg_uref_free: (a: number) => void;
  readonly uref_new: (a: number, b: number, c: number) => number;
  readonly __wbg_sdk_free: (a: number) => void;
  readonly sdk_new: () => number;
  readonly sdk_chain_get_block: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_info_get_deploy: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly sdk_get_state_root_hash: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_state_get_account_info: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly sdk_state_get_balance: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly sdk_state_get_dictionary_item: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly sdk_query_global_state: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly globalstateidentifier_fromBlockHeight: (a: number) => number;
  readonly globalstateidentifier_fromBlockHash: (a: number) => number;
  readonly __wbg_deployhash_free: (a: number) => void;
  readonly __wbg_globalstateidentifier_free: (a: number) => void;
  readonly globalstateidentifier_new: (a: number) => number;
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
