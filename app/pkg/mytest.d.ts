/* tslint:disable */
/* eslint-disable */
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
* @param {bigint} block_identifier_height
* @returns {Promise<string>}
*/
  get_state_root_hash(node_address: string, block_identifier_height: bigint): Promise<string>;
/**
* @param {string} node_address
* @param {bigint} block_identifier_height
* @returns {Promise<string>}
*/
  chain_get_block(node_address: string, block_identifier_height: bigint): Promise<string>;
/**
* @param {string} node_address
* @param {_DeployHash} deploy_hash
* @param {boolean} finalized_approvals
* @returns {Promise<string>}
*/
  info_get_deploy(node_address: string, deploy_hash: _DeployHash, finalized_approvals: boolean): Promise<string>;
}
/**
*/
export class _DeployHash {
  free(): void;
}
/**
*/
export class _Verbosity {
  free(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_sdk_free: (a: number) => void;
  readonly sdk_new: () => number;
  readonly sdk_get_state_root_hash: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_chain_get_block: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_info_get_deploy: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly __wbg__verbosity_free: (a: number) => void;
  readonly __wbg__deployhash_free: (a: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly wasm_bindgen__convert__closures__invoke1_mut__h85c6c3cba794dad3: (a: number, b: number, c: number) => void;
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
