/* tslint:disable */
/* eslint-disable */
/**
* @param {string} hex_string
* @returns {string}
*/
export function hexToString(hex_string: string): string;
/**
* @param {string} hex_string
* @returns {Uint8Array}
*/
export function hexToUint8Array(hex_string: string): Uint8Array;
/**
* @param {Uint8Array} uint8_array
* @returns {Bytes}
*/
export function uint8ArrayToBytes(uint8_array: Uint8Array): Bytes;
/**
* @param {string} motes
* @returns {string}
*/
export function motesToCSPR(motes: string): string;
/**
* @param {any} value
* @param {number | undefined} verbosity
* @returns {any}
*/
export function jsonPrettyPrint(value: any, verbosity?: number): any;
/**
* @param {string} secret_key
* @returns {any}
*/
export function privateToPublicKey(secret_key: string): any;
/**
* @returns {any}
*/
export function getTimestamp(): any;
/**
* @param {Uint8Array} key
* @returns {TransferAddr}
*/
export function fromTransfer(key: Uint8Array): TransferAddr;
/**
* @param {string} s
*/
export function log(s: string): void;
/**
* @param {string} s
*/
export function error(s: string): void;
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
* @param {string} account_hash_hex_str
*/
  constructor(account_hash_hex_str: string);
/**
* @param {string} formatted_str
* @returns {AccountHash}
*/
  static fromFormattedStr(formatted_str: string): AccountHash;
/**
* @param {PublicKey} public_key
* @returns {AccountHash}
*/
  static fromPublicKey(public_key: PublicKey): AccountHash;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @param {Uint8Array} bytes
* @returns {AccountHash}
*/
  static fromUint8Array(bytes: Uint8Array): AccountHash;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class ArgsSimple {
  free(): void;
}
/**
*/
export class BlockHash {
  free(): void;
/**
* @param {string} block_hash_hex_str
*/
  constructor(block_hash_hex_str: string);
/**
* @param {Digest} digest
* @returns {BlockHash}
*/
  static fromDigest(digest: Digest): BlockHash;
/**
* @returns {any}
*/
  toJson(): any;
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
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class Bytes {
  free(): void;
/**
*/
  constructor();
/**
* @param {Uint8Array} uint8_array
* @returns {Bytes}
*/
  static fromUint8Array(uint8_array: Uint8Array): Bytes;
}
/**
*/
export class ContractHash {
  free(): void;
/**
* @param {string} input
*/
  constructor(input: string);
/**
* @param {string} input
* @returns {ContractHash}
*/
  static fromFormattedStr(input: string): ContractHash;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @param {Uint8Array} bytes
* @returns {ContractHash}
*/
  static fromUint8Array(bytes: Uint8Array): ContractHash;
}
/**
*/
export class ContractPackageHash {
  free(): void;
/**
* @param {string} input
*/
  constructor(input: string);
/**
* @param {string} input
* @returns {ContractPackageHash}
*/
  static fromFormattedStr(input: string): ContractPackageHash;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @param {Uint8Array} bytes
* @returns {ContractPackageHash}
*/
  static fromUint8Array(bytes: Uint8Array): ContractPackageHash;
}
/**
*/
export class Deploy {
  free(): void;
/**
* @param {any} deploy
*/
  constructor(deploy: any);
/**
* @returns {any}
*/
  toJson(): any;
/**
* @returns {string}
*/
  to_json(): string;
/**
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {PaymentStrParams} payment_params
* @returns {Deploy}
*/
  static withPaymentAndSession(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams): Deploy;
/**
* @param {string} amount
* @param {string} target_account
* @param {string | undefined} transfer_id
* @param {DeployStrParams} deploy_params
* @param {PaymentStrParams} payment_params
* @returns {Deploy}
*/
  static withTransfer(amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams): Deploy;
/**
* @param {string} ttl
* @param {string | undefined} secret_key
* @returns {Deploy}
*/
  withTTL(ttl: string, secret_key?: string): Deploy;
/**
* @param {string} timestamp
* @param {string | undefined} secret_key
* @returns {Deploy}
*/
  withTimestamp(timestamp: string, secret_key?: string): Deploy;
/**
* @param {string} chain_name
* @param {string | undefined} secret_key
* @returns {Deploy}
*/
  withChainName(chain_name: string, secret_key?: string): Deploy;
/**
* @param {PublicKey} account
* @param {string | undefined} secret_key
* @returns {Deploy}
*/
  withAccount(account: PublicKey, secret_key?: string): Deploy;
/**
* @param {string} entry_point_name
* @param {string | undefined} secret_key
* @returns {Deploy}
*/
  withEntryPointName(entry_point_name: string, secret_key?: string): Deploy;
/**
* @param {ContractHash} hash
* @param {string | undefined} secret_key
* @returns {Deploy}
*/
  withHash(hash: ContractHash, secret_key?: string): Deploy;
/**
* @param {ContractPackageHash} package_hash
* @param {string | undefined} secret_key
* @returns {Deploy}
*/
  withPackageHash(package_hash: ContractPackageHash, secret_key?: string): Deploy;
/**
* @param {Bytes} module_bytes
* @param {string | undefined} secret_key
* @returns {Deploy}
*/
  withModuleBytes(module_bytes: Bytes, secret_key?: string): Deploy;
/**
* @param {string | undefined} secret_key
* @returns {Deploy}
*/
  withSecretKey(secret_key?: string): Deploy;
/**
* @param {string} amount
* @param {string | undefined} secret_key
* @returns {Deploy}
*/
  withStandardPayment(amount: string, secret_key?: string): Deploy;
/**
* @param {any} payment
* @param {string | undefined} secret_key
* @returns {Deploy}
*/
  withPayment(payment: any, secret_key?: string): Deploy;
/**
* @param {any} session
* @param {string | undefined} secret_key
* @returns {Deploy}
*/
  withSession(session: any, secret_key?: string): Deploy;
/**
* @returns {boolean}
*/
  validateDeploySize(): boolean;
/**
* @returns {boolean}
*/
  isValid(): boolean;
/**
* @returns {boolean}
*/
  hasValidHash(): boolean;
/**
* @returns {boolean}
*/
  isExpired(): boolean;
/**
* @param {string} secret_key
* @returns {Deploy}
*/
  sign(secret_key: string): Deploy;
/**
* @returns {any}
*/
  footprint(): any;
/**
* @returns {any}
*/
  approvalsHash(): any;
/**
* @returns {boolean}
*/
  isTransfer(): boolean;
/**
* @param {number} phase
* @returns {boolean}
*/
  isStandardPayment(phase: number): boolean;
/**
* @returns {boolean}
*/
  isStoredContract(): boolean;
/**
* @returns {boolean}
*/
  isStoredContractPackage(): boolean;
/**
* @returns {boolean}
*/
  isModuleBytes(): boolean;
/**
* @returns {boolean}
*/
  isByName(): boolean;
/**
* @returns {string | undefined}
*/
  byName(): string | undefined;
/**
* @returns {string}
*/
  entryPointName(): string;
/**
* @returns {string}
*/
  TTL(): string;
/**
* @returns {string}
*/
  Timestamp(): string;
/**
* @returns {string}
*/
  chainName(): string;
/**
* @returns {string}
*/
  account(): string;
/**
* @param {bigint} conv_rate
* @returns {string}
*/
  paymentAmount(conv_rate: bigint): string;
/**
* @returns {any}
*/
  args(): any;
/**
* @param {any} js_value_arg
* @param {string | undefined} secret_key
* @returns {Deploy}
*/
  addArg(js_value_arg: any, secret_key?: string): Deploy;
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
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class DeployStrParams {
  free(): void;
/**
* @param {string} chain_name
* @param {string} session_account
* @param {string | undefined} secret_key
* @param {string | undefined} timestamp
* @param {string | undefined} ttl
*/
  constructor(chain_name: string, session_account: string, secret_key?: string, timestamp?: string, ttl?: string);
/**
*/
  setDefaultTimestamp(): void;
/**
*/
  setDefaultTTL(): void;
/**
*/
  chain_name: string;
/**
*/
  secret_key: string;
/**
*/
  session_account: string;
/**
*/
  timestamp?: string;
/**
*/
  ttl?: string;
}
/**
*/
export class DictionaryAddr {
  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
}
/**
*/
export class DictionaryItemIdentifier {
  free(): void;
/**
* @param {string} account_hash
* @param {string} dictionary_name
* @param {string} dictionary_item_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromAccountInfo(account_hash: string, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
/**
* @param {string} contract_addr
* @param {string} dictionary_name
* @param {string} dictionary_item_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromContractInfo(contract_addr: string, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
/**
* @param {string} seed_uref
* @param {string} dictionary_item_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromSeedUref(seed_uref: string, dictionary_item_key: string): DictionaryItemIdentifier;
/**
* @param {string} dictionary_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromDictionaryKey(dictionary_key: string): DictionaryItemIdentifier;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class DictionaryItemStrParams {
  free(): void;
/**
*/
  constructor();
/**
* @param {string} key
* @param {string} dictionary_name
* @param {string} dictionary_item_key
*/
  setAccountNamedKey(key: string, dictionary_name: string, dictionary_item_key: string): void;
/**
* @param {string} key
* @param {string} dictionary_name
* @param {string} dictionary_item_key
*/
  setContractNamedKey(key: string, dictionary_name: string, dictionary_item_key: string): void;
/**
* @param {string} seed_uref
* @param {string} dictionary_item_key
*/
  setUref(seed_uref: string, dictionary_item_key: string): void;
/**
* @param {string} value
*/
  setDictionary(value: string): void;
/**
* @returns {any}
*/
  toJson(): any;
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
* @param {string} digest_hex_str
* @returns {Digest}
*/
  static fromString(digest_hex_str: string): Digest;
/**
* @param {Uint8Array} bytes
* @returns {Digest}
*/
  static fromDigest(bytes: Uint8Array): Digest;
/**
* @returns {any}
*/
  toJson(): any;
/**
* @returns {string}
*/
  toString(): string;
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
export class GetAccountResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly account: any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly merkle_proof: string;
}
/**
*/
export class GetAuctionInfoResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly auction_state: any;
}
/**
*/
export class GetBalanceResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly balance_value: any;
/**
*/
  readonly merkle_proof: string;
}
/**
*/
export class GetBlockResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly block: any;
}
/**
*/
export class GetBlockTransfersResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly block_hash: BlockHash | undefined;
/**
*/
  readonly transfers: any;
}
/**
*/
export class GetChainspecResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly chainspec_bytes: any;
}
/**
*/
export class GetDeployResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly deploy: Deploy;
/**
*/
  readonly execution_info: any;
}
/**
*/
export class GetDictionaryItemResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly dictionary_key: string;
/**
*/
  readonly merkle_proof: string;
/**
*/
  readonly stored_value: any;
}
/**
*/
export class GetEraInfoResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly era_summary: any;
}
/**
*/
export class GetEraSummaryResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly era_summary: any;
}
/**
*/
export class GetNodeStatusResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly available_block_range: any;
/**
*/
  readonly block_sync: any;
/**
*/
  readonly build_version: string;
/**
*/
  readonly chainspec_name: string;
/**
*/
  readonly last_added_block_info: any;
/**
*/
  readonly last_progress: any;
/**
*/
  readonly next_upgrade: any;
/**
*/
  readonly our_public_signing_key: PublicKey | undefined;
/**
*/
  readonly peers: any;
/**
*/
  readonly reactor_state: any;
/**
*/
  readonly round_length: any;
/**
*/
  readonly starting_state_root_hash: Digest;
/**
*/
  readonly uptime: any;
}
/**
*/
export class GetPeersResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly peers: any;
}
/**
*/
export class GetStateRootHashResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly state_root_hash: Digest | undefined;
/**
*/
  readonly state_root_hash_as_string: string;
}
/**
*/
export class GetValidatorChangesResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly changes: any;
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
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class HashAddr {
  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
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
* @returns {any}
*/
  toJson(): any;
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
  static fromDictionaryAddr(key: DictionaryAddr): Key;
/**
* @returns {DictionaryAddr | undefined}
*/
  asDictionaryAddr(): DictionaryAddr | undefined;
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
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @param {any} input
* @returns {Key}
*/
  static fromFormattedString(input: any): Key;
/**
* @param {URef} seed_uref
* @param {Uint8Array} dictionary_item_key
* @returns {Key}
*/
  static fromDictionaryKey(seed_uref: URef, dictionary_item_key: Uint8Array): Key;
/**
* @returns {boolean}
*/
  isDictionaryKey(): boolean;
/**
* @returns {AccountHash | undefined}
*/
  intoAccount(): AccountHash | undefined;
/**
* @returns {HashAddr | undefined}
*/
  intoHash(): HashAddr | undefined;
/**
* @returns {URefAddr | undefined}
*/
  asBalance(): URefAddr | undefined;
/**
* @returns {URef | undefined}
*/
  intoURef(): URef | undefined;
/**
* @returns {Key | undefined}
*/
  urefToHash(): Key | undefined;
/**
* @returns {Key | undefined}
*/
  withdrawToUnbond(): Key | undefined;
}
/**
*/
export class ListRpcsResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly name: string;
/**
*/
  readonly schema: any;
}
/**
*/
export class Path {
  free(): void;
/**
* @param {any} path
*/
  constructor(path: any);
/**
* @param {any} path
* @returns {Path}
*/
  static fromArray(path: any): Path;
/**
* @returns {any}
*/
  toJson(): any;
/**
* @returns {string}
*/
  toString(): string;
/**
* @returns {boolean}
*/
  is_empty(): boolean;
}
/**
*/
export class PaymentStrParams {
  free(): void;
/**
* @param {string | undefined} payment_amount
* @param {string | undefined} payment_hash
* @param {string | undefined} payment_name
* @param {string | undefined} payment_package_hash
* @param {string | undefined} payment_package_name
* @param {string | undefined} payment_path
* @param {Array<any> | undefined} payment_args_simple
* @param {string | undefined} payment_args_json
* @param {string | undefined} payment_args_complex
* @param {string | undefined} payment_version
* @param {string | undefined} payment_entry_point
*/
  constructor(payment_amount?: string, payment_hash?: string, payment_name?: string, payment_package_hash?: string, payment_package_name?: string, payment_path?: string, payment_args_simple?: Array<any>, payment_args_json?: string, payment_args_complex?: string, payment_version?: string, payment_entry_point?: string);
/**
*/
  payment_amount: string;
/**
*/
  payment_args_complex: string;
/**
*/
  payment_args_json: string;
/**
*/
  payment_args_simple: Array<any>;
/**
*/
  payment_entry_point: string;
/**
*/
  payment_hash: string;
/**
*/
  payment_name: string;
/**
*/
  payment_package_hash: string;
/**
*/
  payment_package_name: string;
/**
*/
  payment_path: string;
/**
*/
  payment_version: string;
}
/**
*/
export class PeerEntry {
  free(): void;
/**
*/
  readonly address: string;
/**
*/
  readonly node_id: string;
}
/**
*/
export class PublicKey {
  free(): void;
/**
* @param {string} public_key_hex_str
*/
  constructor(public_key_hex_str: string);
/**
* @param {Uint8Array} bytes
* @returns {PublicKey}
*/
  static fromUint8Array(bytes: Uint8Array): PublicKey;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class PurseIdentifier {
  free(): void;
/**
* @param {PublicKey} key
*/
  constructor(key: PublicKey);
/**
* @param {AccountHash} account_hash
* @returns {PurseIdentifier}
*/
  static fromAccountHash(account_hash: AccountHash): PurseIdentifier;
/**
* @param {URef} uref
* @returns {PurseIdentifier}
*/
  static fromURef(uref: URef): PurseIdentifier;
}
/**
*/
export class PutDeployResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly deploy_hash: DeployHash;
}
/**
*/
export class QueryBalanceResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly balance: any;
}
/**
*/
export class QueryGlobalStateResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly block_header: any;
/**
*/
  readonly merkle_proof: string;
/**
*/
  readonly stored_value: any;
}
/**
*/
export class SDK {
  free(): void;
/**
* @param {any} options
* @returns {getBalanceOptions}
*/
  get_balance_options(options: any): getBalanceOptions;
/**
* @param {getBalanceOptions} options
* @returns {Promise<GetBalanceResult>}
*/
  get_balance(options: getBalanceOptions): Promise<GetBalanceResult>;
/**
* @param {getBalanceOptions} options
* @returns {Promise<GetBalanceResult>}
*/
  state_get_balance(options: getBalanceOptions): Promise<GetBalanceResult>;
/**
* @param {any} options
* @returns {queryBalanceOptions}
*/
  query_balance_options(options: any): queryBalanceOptions;
/**
* @param {queryBalanceOptions} options
* @returns {Promise<QueryBalanceResult>}
*/
  query_balance(options: queryBalanceOptions): Promise<QueryBalanceResult>;
/**
* @param {any} options
* @returns {queryGlobalStateOptions}
*/
  query_global_state_options(options: any): queryGlobalStateOptions;
/**
* @param {queryGlobalStateOptions} options
* @returns {Promise<QueryGlobalStateResult>}
*/
  query_global_state(options: queryGlobalStateOptions): Promise<QueryGlobalStateResult>;
/**
* @param {Deploy} deploy
* @param {string} secret_key
* @returns {Deploy}
*/
  sign_deploy(deploy: Deploy, secret_key: string): Deploy;
/**
* @param {string} node_address
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {string} payment_amount
* @returns {Promise<PutDeployResult>}
*/
  call_entrypoint(node_address: string, deploy_params: DeployStrParams, session_params: SessionStrParams, payment_amount: string): Promise<PutDeployResult>;
/**
* @param {string} node_address
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {PaymentStrParams} payment_params
* @param {BlockIdentifier | undefined} maybe_block_identifier
* @param {number | undefined} verbosity
* @returns {Promise<SpeculativeExecResult>}
*/
  speculative_deploy(node_address: string, deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams, maybe_block_identifier?: BlockIdentifier, verbosity?: number): Promise<SpeculativeExecResult>;
/**
* @param {any} options
* @returns {getBlockTransfersOptions}
*/
  get_block_transfers_options(options: any): getBlockTransfersOptions;
/**
* @param {getBlockTransfersOptions} options
* @returns {Promise<GetBlockTransfersResult>}
*/
  get_block_transfers(options: getBlockTransfersOptions): Promise<GetBlockTransfersResult>;
/**
* @param {any} options
* @returns {getDeployOptions}
*/
  get_deploy_options(options: any): getDeployOptions;
/**
* @param {getDeployOptions} options
* @returns {Promise<GetDeployResult>}
*/
  get_deploy(options: getDeployOptions): Promise<GetDeployResult>;
/**
* @param {getDeployOptions} options
* @returns {Promise<GetDeployResult>}
*/
  info_get_deploy(options: getDeployOptions): Promise<GetDeployResult>;
/**
* @param {any} options
* @returns {getSpeculativeExecOptions}
*/
  speculative_exec_options(options: any): getSpeculativeExecOptions;
/**
* @param {getSpeculativeExecOptions} options
* @returns {Promise<SpeculativeExecResult>}
*/
  speculative_exec(options: getSpeculativeExecOptions): Promise<SpeculativeExecResult>;
/**
* @param {string} node_address
* @param {string} amount
* @param {string} target_account
* @param {string | undefined} transfer_id
* @param {DeployStrParams} deploy_params
* @param {PaymentStrParams} payment_params
* @param {number | undefined} verbosity
* @returns {Promise<PutDeployResult>}
*/
  transfer(node_address: string, amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams, verbosity?: number): Promise<PutDeployResult>;
/**
* @param {any} options
* @returns {getAuctionInfoOptions}
*/
  get_auction_info_options(options: any): getAuctionInfoOptions;
/**
* @param {getAuctionInfoOptions} options
* @returns {Promise<GetAuctionInfoResult>}
*/
  get_auction_info(options: getAuctionInfoOptions): Promise<GetAuctionInfoResult>;
/**
* @param {any} options
* @returns {getBlockOptions}
*/
  get_block_options(options: any): getBlockOptions;
/**
* @param {getBlockOptions} options
* @returns {Promise<GetBlockResult>}
*/
  get_block(options: getBlockOptions): Promise<GetBlockResult>;
/**
* @param {getBlockOptions} options
* @returns {Promise<GetBlockResult>}
*/
  chain_get_block(options: getBlockOptions): Promise<GetBlockResult>;
/**
* @param {any} options
* @returns {getEraSummaryOptions}
*/
  get_era_summary_options(options: any): getEraSummaryOptions;
/**
* @param {getEraSummaryOptions} options
* @returns {Promise<GetEraSummaryResult>}
*/
  get_era_summary(options: getEraSummaryOptions): Promise<GetEraSummaryResult>;
/**
* @param {any} options
* @returns {getStateRootHashOptions}
*/
  get_state_root_hash_options(options: any): getStateRootHashOptions;
/**
* @param {getStateRootHashOptions} options
* @returns {Promise<GetStateRootHashResult>}
*/
  get_state_root_hash(options: getStateRootHashOptions): Promise<GetStateRootHashResult>;
/**
* @param {getStateRootHashOptions} options
* @returns {Promise<GetStateRootHashResult>}
*/
  chain_get_state_root_hash(options: getStateRootHashOptions): Promise<GetStateRootHashResult>;
/**
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {PaymentStrParams} payment_params
* @returns {Deploy}
*/
  make_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams): Deploy;
/**
* @param {string} amount
* @param {string} target_account
* @param {string | undefined} transfer_id
* @param {DeployStrParams} deploy_params
* @param {PaymentStrParams} payment_params
* @returns {Deploy}
*/
  make_transfer(amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams): Deploy;
/**
* @param {string} node_address
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {PaymentStrParams} payment_params
* @param {number | undefined} verbosity
* @returns {Promise<PutDeployResult>}
*/
  deploy(node_address: string, deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams, verbosity?: number): Promise<PutDeployResult>;
/**
* @param {string} node_address
* @param {number | undefined} verbosity
* @returns {Promise<GetNodeStatusResult>}
*/
  get_node_status(node_address: string, verbosity?: number): Promise<GetNodeStatusResult>;
/**
* @param {string} node_address
* @param {number | undefined} verbosity
* @returns {Promise<GetPeersResult>}
*/
  get_peers(node_address: string, verbosity?: number): Promise<GetPeersResult>;
/**
* @param {string} node_address
* @param {number | undefined} verbosity
* @returns {Promise<ListRpcsResult>}
*/
  list_rpcs(node_address: string, verbosity?: number): Promise<ListRpcsResult>;
/**
*/
  constructor();
/**
* @param {string} node_address
* @param {Deploy} deploy
* @param {number | undefined} verbosity
* @returns {Promise<PutDeployResult>}
*/
  put_deploy(node_address: string, deploy: Deploy, verbosity?: number): Promise<PutDeployResult>;
/**
* @param {string} node_address
* @param {Deploy} deploy
* @param {number | undefined} verbosity
* @returns {Promise<PutDeployResult>}
*/
  account_put_deploy(node_address: string, deploy: Deploy, verbosity?: number): Promise<PutDeployResult>;
/**
* @param {string} node_address
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {string} payment_amount
* @returns {Promise<PutDeployResult>}
*/
  install(node_address: string, deploy_params: DeployStrParams, session_params: SessionStrParams, payment_amount: string): Promise<PutDeployResult>;
/**
* @param {string} node_address
* @param {string} amount
* @param {string} target_account
* @param {string | undefined} transfer_id
* @param {DeployStrParams} deploy_params
* @param {PaymentStrParams} payment_params
* @param {string | undefined} maybe_block_id_as_string
* @param {BlockIdentifier | undefined} maybe_block_identifier
* @param {number | undefined} verbosity
* @returns {Promise<SpeculativeExecResult>}
*/
  speculative_transfer(node_address: string, amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams, maybe_block_id_as_string?: string, maybe_block_identifier?: BlockIdentifier, verbosity?: number): Promise<SpeculativeExecResult>;
/**
* @param {any} options
* @returns {getAccountOptions}
*/
  get_account_options(options: any): getAccountOptions;
/**
* @param {getAccountOptions} options
* @returns {Promise<GetAccountResult>}
*/
  get_account(options: getAccountOptions): Promise<GetAccountResult>;
/**
* @param {getAccountOptions} options
* @returns {Promise<GetAccountResult>}
*/
  state_get_account_info(options: getAccountOptions): Promise<GetAccountResult>;
/**
* @param {string} node_address
* @param {number | undefined} verbosity
* @returns {Promise<GetChainspecResult>}
*/
  get_chainspec(node_address: string, verbosity?: number): Promise<GetChainspecResult>;
/**
* @param {any} options
* @returns {getDictionaryItemOptions}
*/
  get_dictionary_item_options(options: any): getDictionaryItemOptions;
/**
* @param {getDictionaryItemOptions} options
* @returns {Promise<GetDictionaryItemResult>}
*/
  get_dictionary_item(options: getDictionaryItemOptions): Promise<GetDictionaryItemResult>;
/**
* @param {getDictionaryItemOptions} options
* @returns {Promise<GetDictionaryItemResult>}
*/
  state_get_dictionary_item(options: getDictionaryItemOptions): Promise<GetDictionaryItemResult>;
/**
* @param {any} options
* @returns {getEraInfoOptions}
*/
  get_era_info_options(options: any): getEraInfoOptions;
/**
* @param {getEraInfoOptions} options
* @returns {Promise<GetEraInfoResult>}
*/
  get_era_info(options: getEraInfoOptions): Promise<GetEraInfoResult>;
/**
* @param {string} node_address
* @param {number | undefined} verbosity
* @returns {Promise<GetValidatorChangesResult>}
*/
  get_validator_changes(node_address: string, verbosity?: number): Promise<GetValidatorChangesResult>;
/**
* @param {any} options
* @returns {queryContractDictOptions}
*/
  query_contract_dict_options(options: any): queryContractDictOptions;
/**
* @param {queryContractDictOptions} options
* @returns {Promise<GetDictionaryItemResult>}
*/
  query_contract_dict(options: queryContractDictOptions): Promise<GetDictionaryItemResult>;
/**
* @param {any} options
* @returns {queryContractKeyOptions}
*/
  query_contract_key_options(options: any): queryContractKeyOptions;
/**
* @param {queryContractKeyOptions} options
* @returns {Promise<QueryGlobalStateResult>}
*/
  query_contract_key(options: queryContractKeyOptions): Promise<QueryGlobalStateResult>;
}
/**
*/
export class SessionStrParams {
  free(): void;
/**
* @param {string | undefined} session_hash
* @param {string | undefined} session_name
* @param {string | undefined} session_package_hash
* @param {string | undefined} session_package_name
* @param {string | undefined} session_path
* @param {Bytes | undefined} session_bytes
* @param {Array<any> | undefined} session_args_simple
* @param {string | undefined} session_args_json
* @param {string | undefined} session_args_complex
* @param {string | undefined} session_version
* @param {string | undefined} session_entry_point
* @param {boolean | undefined} is_session_transfer
*/
  constructor(session_hash?: string, session_name?: string, session_package_hash?: string, session_package_name?: string, session_path?: string, session_bytes?: Bytes, session_args_simple?: Array<any>, session_args_json?: string, session_args_complex?: string, session_version?: string, session_entry_point?: string, is_session_transfer?: boolean);
/**
*/
  is_session_transfer: boolean;
/**
*/
  session_args_complex: string;
/**
*/
  session_args_json: string;
/**
*/
  session_args_simple: Array<any>;
/**
*/
  session_bytes: Bytes;
/**
*/
  session_entry_point: string;
/**
*/
  session_hash: string;
/**
*/
  session_name: string;
/**
*/
  session_package_hash: string;
/**
*/
  session_package_name: string;
/**
*/
  session_path: string;
/**
*/
  session_version: string;
}
/**
*/
export class SpeculativeExecResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly block_hash: BlockHash;
/**
*/
  readonly execution_result: any;
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
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class URefAddr {
  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
}
/**
*/
export class getAccountOptions {
  free(): void;
/**
*/
  account_identifier?: string;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address: string;
/**
*/
  public_key?: PublicKey;
/**
*/
  verbosity?: number;
}
/**
*/
export class getAuctionInfoOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address: string;
/**
*/
  verbosity?: number;
}
/**
*/
export class getBalanceOptions {
  free(): void;
/**
*/
  node_address: string;
/**
*/
  purse_uref?: URef;
/**
*/
  purse_uref_as_string?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: number;
}
/**
*/
export class getBlockOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address: string;
/**
*/
  verbosity?: number;
}
/**
*/
export class getBlockTransfersOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address: string;
/**
*/
  verbosity?: number;
}
/**
*/
export class getDeployOptions {
  free(): void;
/**
*/
  deploy_hash?: DeployHash;
/**
*/
  deploy_hash_as_string?: string;
/**
*/
  finalized_approvals?: boolean;
/**
*/
  node_address: string;
/**
*/
  verbosity?: number;
}
/**
*/
export class getDictionaryItemOptions {
  free(): void;
/**
*/
  dictionary_item_identifier?: DictionaryItemIdentifier;
/**
*/
  dictionary_item_params?: DictionaryItemStrParams;
/**
*/
  node_address: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: number;
}
/**
*/
export class getEraInfoOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address: string;
/**
*/
  verbosity?: number;
}
/**
*/
export class getEraSummaryOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address: string;
/**
*/
  verbosity?: number;
}
/**
*/
export class getSpeculativeExecOptions {
  free(): void;
/**
*/
  deploy?: Deploy;
/**
*/
  deploy_as_string?: string;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address: string;
/**
*/
  verbosity?: number;
}
/**
*/
export class getStateRootHashOptions {
  free(): void;
/**
*/
  block_id_as_string?: string;
/**
*/
  block_identifier?: BlockIdentifier;
/**
*/
  node_address: string;
/**
*/
  verbosity?: number;
}
/**
*/
export class queryBalanceOptions {
  free(): void;
/**
*/
  global_state_identifier?: GlobalStateIdentifier;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  node_address: string;
/**
*/
  purse_identifier?: PurseIdentifier;
/**
*/
  purse_identifier_as_string?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: number;
}
/**
*/
export class queryContractDictOptions {
  free(): void;
/**
*/
  dictionary_item_identifier?: DictionaryItemIdentifier;
/**
*/
  dictionary_item_params?: DictionaryItemStrParams;
/**
*/
  node_address: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: number;
}
/**
*/
export class queryContractKeyOptions {
  free(): void;
/**
*/
  contract_key?: Key;
/**
*/
  contract_key_as_string?: string;
/**
*/
  global_state_identifier?: GlobalStateIdentifier;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  node_address: string;
/**
*/
  path?: Path;
/**
*/
  path_as_string?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: number;
}
/**
*/
export class queryGlobalStateOptions {
  free(): void;
/**
*/
  global_state_identifier?: GlobalStateIdentifier;
/**
*/
  key?: Key;
/**
*/
  key_as_string?: string;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  node_address: string;
/**
*/
  path?: Path;
/**
*/
  path_as_string?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_dictionaryaddr_free: (a: number) => void;
  readonly dictionaryaddr_new: (a: number, b: number, c: number) => void;
  readonly __wbg_blockidentifier_free: (a: number) => void;
  readonly blockidentifier_new: (a: number) => number;
  readonly blockidentifier_from_hash: (a: number) => number;
  readonly blockidentifier_fromHeight: (a: number) => number;
  readonly blockidentifier_toJson: (a: number) => number;
  readonly __wbg_sessionstrparams_free: (a: number) => void;
  readonly sessionstrparams_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number, u: number) => number;
  readonly sessionstrparams_session_hash: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_hash: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_name: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_name: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_package_hash: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_package_hash: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_package_name: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_package_name: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_path: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_path: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_bytes: (a: number) => number;
  readonly sessionstrparams_set_session_bytes: (a: number, b: number) => void;
  readonly sessionstrparams_session_args_simple: (a: number) => number;
  readonly sessionstrparams_set_session_args_simple: (a: number, b: number) => void;
  readonly sessionstrparams_session_args_json: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_args_json: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_args_complex: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_args_complex: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_version: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_version: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_entry_point: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_entry_point: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_is_session_transfer: (a: number) => number;
  readonly sessionstrparams_set_is_session_transfer: (a: number, b: number) => void;
  readonly __wbg_eraid_free: (a: number) => void;
  readonly eraid_new: (a: number) => number;
  readonly eraid_value: (a: number) => number;
  readonly __wbg_getbalanceresult_free: (a: number) => void;
  readonly getbalanceresult_api_version: (a: number) => number;
  readonly getbalanceresult_balance_value: (a: number) => number;
  readonly getbalanceresult_merkle_proof: (a: number, b: number) => void;
  readonly getbalanceresult_toJson: (a: number) => number;
  readonly __wbg_getbalanceoptions_free: (a: number) => void;
  readonly __wbg_get_getbalanceoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_getbalanceoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getbalanceoptions_state_root_hash_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getbalanceoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getbalanceoptions_state_root_hash: (a: number) => number;
  readonly __wbg_set_getbalanceoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_getbalanceoptions_purse_uref_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getbalanceoptions_purse_uref_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getbalanceoptions_purse_uref: (a: number) => number;
  readonly __wbg_set_getbalanceoptions_purse_uref: (a: number, b: number) => void;
  readonly __wbg_get_getbalanceoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getbalanceoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_balance_options: (a: number, b: number) => number;
  readonly sdk_get_balance: (a: number, b: number) => number;
  readonly sdk_state_get_balance: (a: number, b: number) => number;
  readonly __wbg_querybalanceresult_free: (a: number) => void;
  readonly querybalanceresult_api_version: (a: number) => number;
  readonly querybalanceresult_balance: (a: number) => number;
  readonly querybalanceresult_toJson: (a: number) => number;
  readonly __wbg_querybalanceoptions_free: (a: number) => void;
  readonly __wbg_get_querybalanceoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_querybalanceoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querybalanceoptions_purse_identifier_as_string: (a: number, b: number) => void;
  readonly __wbg_set_querybalanceoptions_purse_identifier_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querybalanceoptions_purse_identifier: (a: number) => number;
  readonly __wbg_set_querybalanceoptions_purse_identifier: (a: number, b: number) => void;
  readonly __wbg_get_querybalanceoptions_verbosity: (a: number) => number;
  readonly __wbg_set_querybalanceoptions_verbosity: (a: number, b: number) => void;
  readonly __wbg_get_querybalanceoptions_global_state_identifier: (a: number) => number;
  readonly __wbg_set_querybalanceoptions_global_state_identifier: (a: number, b: number) => void;
  readonly __wbg_get_querybalanceoptions_state_root_hash_as_string: (a: number, b: number) => void;
  readonly __wbg_set_querybalanceoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querybalanceoptions_state_root_hash: (a: number) => number;
  readonly __wbg_set_querybalanceoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_querybalanceoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_querybalanceoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly sdk_query_balance_options: (a: number, b: number) => number;
  readonly sdk_query_balance: (a: number, b: number) => number;
  readonly __wbg_queryglobalstateresult_free: (a: number) => void;
  readonly queryglobalstateresult_api_version: (a: number) => number;
  readonly queryglobalstateresult_block_header: (a: number) => number;
  readonly queryglobalstateresult_stored_value: (a: number) => number;
  readonly queryglobalstateresult_merkle_proof: (a: number, b: number) => void;
  readonly queryglobalstateresult_toJson: (a: number) => number;
  readonly __wbg_queryglobalstateoptions_free: (a: number) => void;
  readonly __wbg_get_queryglobalstateoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_queryglobalstateoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_queryglobalstateoptions_global_state_identifier: (a: number) => number;
  readonly __wbg_set_queryglobalstateoptions_global_state_identifier: (a: number, b: number) => void;
  readonly __wbg_get_queryglobalstateoptions_state_root_hash_as_string: (a: number, b: number) => void;
  readonly __wbg_set_queryglobalstateoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_queryglobalstateoptions_state_root_hash: (a: number) => number;
  readonly __wbg_set_queryglobalstateoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_queryglobalstateoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_queryglobalstateoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_queryglobalstateoptions_key_as_string: (a: number, b: number) => void;
  readonly __wbg_set_queryglobalstateoptions_key_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_queryglobalstateoptions_key: (a: number) => number;
  readonly __wbg_set_queryglobalstateoptions_key: (a: number, b: number) => void;
  readonly __wbg_get_queryglobalstateoptions_path_as_string: (a: number, b: number) => void;
  readonly __wbg_set_queryglobalstateoptions_path_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_queryglobalstateoptions_path: (a: number) => number;
  readonly __wbg_set_queryglobalstateoptions_path: (a: number, b: number) => void;
  readonly __wbg_get_queryglobalstateoptions_verbosity: (a: number) => number;
  readonly __wbg_set_queryglobalstateoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_query_global_state_options: (a: number, b: number) => number;
  readonly sdk_query_global_state: (a: number, b: number) => number;
  readonly sdk_sign_deploy: (a: number, b: number, c: number, d: number) => number;
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
  readonly __wbg_hashaddr_free: (a: number) => void;
  readonly hashaddr_new: (a: number, b: number, c: number) => void;
  readonly sdk_call_entrypoint: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly __wbg_deploy_free: (a: number) => void;
  readonly deploy_new: (a: number) => number;
  readonly deploy_toJson: (a: number) => number;
  readonly deploy_to_json: (a: number, b: number) => void;
  readonly deploy_withPaymentAndSession: (a: number, b: number, c: number, d: number) => void;
  readonly deploy_withTransfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly deploy_withTTL: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly deploy_withTimestamp: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly deploy_withChainName: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly deploy_withAccount: (a: number, b: number, c: number, d: number) => number;
  readonly deploy_withEntryPointName: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly deploy_withHash: (a: number, b: number, c: number, d: number) => number;
  readonly deploy_withPackageHash: (a: number, b: number, c: number, d: number) => number;
  readonly deploy_withModuleBytes: (a: number, b: number, c: number, d: number) => number;
  readonly deploy_withSecretKey: (a: number, b: number, c: number) => number;
  readonly deploy_withStandardPayment: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly deploy_withPayment: (a: number, b: number, c: number, d: number) => number;
  readonly deploy_withSession: (a: number, b: number, c: number, d: number) => number;
  readonly deploy_validateDeploySize: (a: number) => number;
  readonly deploy_isValid: (a: number) => number;
  readonly deploy_hasValidHash: (a: number) => number;
  readonly deploy_isExpired: (a: number) => number;
  readonly deploy_sign: (a: number, b: number, c: number) => number;
  readonly deploy_footprint: (a: number) => number;
  readonly deploy_approvalsHash: (a: number) => number;
  readonly deploy_isTransfer: (a: number) => number;
  readonly deploy_isStandardPayment: (a: number, b: number) => number;
  readonly deploy_isStoredContract: (a: number) => number;
  readonly deploy_isStoredContractPackage: (a: number) => number;
  readonly deploy_isModuleBytes: (a: number) => number;
  readonly deploy_isByName: (a: number) => number;
  readonly deploy_byName: (a: number, b: number) => void;
  readonly deploy_entryPointName: (a: number, b: number) => void;
  readonly deploy_TTL: (a: number, b: number) => void;
  readonly deploy_Timestamp: (a: number, b: number) => void;
  readonly deploy_chainName: (a: number, b: number) => void;
  readonly deploy_account: (a: number, b: number) => void;
  readonly deploy_paymentAmount: (a: number, b: number, c: number) => void;
  readonly deploy_args: (a: number) => number;
  readonly deploy_addArg: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_deploystrparams_free: (a: number) => void;
  readonly deploystrparams_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
  readonly deploystrparams_secret_key: (a: number, b: number) => void;
  readonly deploystrparams_set_secret_key: (a: number, b: number, c: number) => void;
  readonly deploystrparams_timestamp: (a: number, b: number) => void;
  readonly deploystrparams_set_timestamp: (a: number, b: number, c: number) => void;
  readonly deploystrparams_setDefaultTimestamp: (a: number) => void;
  readonly deploystrparams_ttl: (a: number, b: number) => void;
  readonly deploystrparams_set_ttl: (a: number, b: number, c: number) => void;
  readonly deploystrparams_setDefaultTTL: (a: number) => void;
  readonly deploystrparams_chain_name: (a: number, b: number) => void;
  readonly deploystrparams_set_chain_name: (a: number, b: number, c: number) => void;
  readonly deploystrparams_session_account: (a: number, b: number) => void;
  readonly deploystrparams_set_session_account: (a: number, b: number, c: number) => void;
  readonly __wbg_digest_free: (a: number) => void;
  readonly digest__new: (a: number, b: number, c: number) => void;
  readonly digest_fromDigest: (a: number, b: number, c: number) => void;
  readonly digest_toJson: (a: number) => number;
  readonly digest_toString: (a: number, b: number) => void;
  readonly __wbg_key_free: (a: number) => void;
  readonly key_new: (a: number, b: number) => void;
  readonly key_toJson: (a: number) => number;
  readonly key_fromURef: (a: number) => number;
  readonly key_fromDeployInfo: (a: number) => number;
  readonly key_fromAccount: (a: number) => number;
  readonly key_fromHash: (a: number) => number;
  readonly key_fromTransfer: (a: number, b: number) => number;
  readonly key_fromEraInfo: (a: number) => number;
  readonly key_fromBalance: (a: number) => number;
  readonly key_fromBid: (a: number) => number;
  readonly key_fromWithdraw: (a: number) => number;
  readonly key_fromDictionaryAddr: (a: number) => number;
  readonly key_asDictionaryAddr: (a: number) => number;
  readonly key_fromSystemContractRegistry: () => number;
  readonly key_fromEraSummary: () => number;
  readonly key_fromUnbond: (a: number) => number;
  readonly key_fromChainspecRegistry: () => number;
  readonly key_fromChecksumRegistry: () => number;
  readonly key_toFormattedString: (a: number, b: number) => void;
  readonly key_fromFormattedString: (a: number, b: number) => void;
  readonly key_fromDictionaryKey: (a: number, b: number, c: number) => number;
  readonly key_isDictionaryKey: (a: number) => number;
  readonly key_intoAccount: (a: number) => number;
  readonly key_intoHash: (a: number) => number;
  readonly key_asBalance: (a: number) => number;
  readonly key_intoURef: (a: number) => number;
  readonly key_urefToHash: (a: number) => number;
  readonly key_withdrawToUnbond: (a: number) => number;
  readonly sdk_speculative_deploy: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly __wbg_getblocktransfersresult_free: (a: number) => void;
  readonly getblocktransfersresult_api_version: (a: number) => number;
  readonly getblocktransfersresult_block_hash: (a: number) => number;
  readonly getblocktransfersresult_transfers: (a: number) => number;
  readonly getblocktransfersresult_toJson: (a: number) => number;
  readonly __wbg_getblocktransfersoptions_free: (a: number) => void;
  readonly __wbg_get_getblocktransfersoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_getblocktransfersoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getblocktransfersoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getblocktransfersoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getblocktransfersoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_getblocktransfersoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getblocktransfersoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getblocktransfersoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_block_transfers_options: (a: number, b: number) => number;
  readonly sdk_get_block_transfers: (a: number, b: number) => number;
  readonly __wbg_getdeployresult_free: (a: number) => void;
  readonly getdeployresult_api_version: (a: number) => number;
  readonly getdeployresult_deploy: (a: number) => number;
  readonly getdeployresult_execution_info: (a: number) => number;
  readonly getdeployresult_toJson: (a: number) => number;
  readonly __wbg_getdeployoptions_free: (a: number) => void;
  readonly __wbg_get_getdeployoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_getdeployoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getdeployoptions_deploy_hash_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getdeployoptions_deploy_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getdeployoptions_deploy_hash: (a: number) => number;
  readonly __wbg_set_getdeployoptions_deploy_hash: (a: number, b: number) => void;
  readonly __wbg_get_getdeployoptions_finalized_approvals: (a: number) => number;
  readonly __wbg_set_getdeployoptions_finalized_approvals: (a: number, b: number) => void;
  readonly __wbg_get_getdeployoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getdeployoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_deploy_options: (a: number, b: number) => number;
  readonly sdk_get_deploy: (a: number, b: number) => number;
  readonly sdk_info_get_deploy: (a: number, b: number) => number;
  readonly __wbg_speculativeexecresult_free: (a: number) => void;
  readonly speculativeexecresult_api_version: (a: number) => number;
  readonly speculativeexecresult_block_hash: (a: number) => number;
  readonly speculativeexecresult_execution_result: (a: number) => number;
  readonly speculativeexecresult_toJson: (a: number) => number;
  readonly __wbg_getspeculativeexecoptions_free: (a: number) => void;
  readonly __wbg_get_getspeculativeexecoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_getspeculativeexecoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getspeculativeexecoptions_deploy_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getspeculativeexecoptions_deploy_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getspeculativeexecoptions_deploy: (a: number) => number;
  readonly __wbg_set_getspeculativeexecoptions_deploy: (a: number, b: number) => void;
  readonly __wbg_get_getspeculativeexecoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getspeculativeexecoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getspeculativeexecoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_getspeculativeexecoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getspeculativeexecoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getspeculativeexecoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_speculative_exec_options: (a: number, b: number) => number;
  readonly sdk_speculative_exec: (a: number, b: number) => number;
  readonly hexToString: (a: number, b: number, c: number) => void;
  readonly hexToUint8Array: (a: number, b: number, c: number) => void;
  readonly uint8ArrayToBytes: (a: number) => number;
  readonly motesToCSPR: (a: number, b: number, c: number) => void;
  readonly jsonPrettyPrint: (a: number, b: number) => number;
  readonly privateToPublicKey: (a: number, b: number) => number;
  readonly getTimestamp: () => number;
  readonly digest_fromString: (a: number, b: number, c: number) => void;
  readonly __wbg_paymentstrparams_free: (a: number) => void;
  readonly paymentstrparams_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number, u: number) => number;
  readonly paymentstrparams_payment_amount: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_amount: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_hash: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_hash: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_name: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_name: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_package_hash: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_package_hash: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_package_name: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_package_name: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_path: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_path: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_args_simple: (a: number) => number;
  readonly paymentstrparams_set_payment_args_simple: (a: number, b: number) => void;
  readonly paymentstrparams_payment_args_json: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_args_json: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_args_complex: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_args_complex: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_version: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_version: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_entry_point: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_entry_point: (a: number, b: number, c: number) => void;
  readonly __wbg_globalstateidentifier_free: (a: number) => void;
  readonly globalstateidentifier_new: (a: number) => number;
  readonly globalstateidentifier_fromBlockHash: (a: number) => number;
  readonly globalstateidentifier_fromBlockHeight: (a: number) => number;
  readonly globalstateidentifier_fromStateRootHash: (a: number) => number;
  readonly globalstateidentifier_toJson: (a: number) => number;
  readonly __wbg_path_free: (a: number) => void;
  readonly path_new: (a: number) => number;
  readonly path_fromArray: (a: number) => number;
  readonly path_toJson: (a: number) => number;
  readonly path_toString: (a: number, b: number) => void;
  readonly path_is_empty: (a: number) => number;
  readonly __wbg_purseidentifier_free: (a: number) => void;
  readonly purseidentifier_fromPublicKey: (a: number) => number;
  readonly purseidentifier_fromAccountHash: (a: number) => number;
  readonly purseidentifier_fromURef: (a: number) => number;
  readonly sdk_transfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => number;
  readonly __wbg_getauctioninforesult_free: (a: number) => void;
  readonly getauctioninforesult_api_version: (a: number) => number;
  readonly getauctioninforesult_auction_state: (a: number) => number;
  readonly getauctioninforesult_toJson: (a: number) => number;
  readonly __wbg_getauctioninfooptions_free: (a: number) => void;
  readonly __wbg_get_getauctioninfooptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_getauctioninfooptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getauctioninfooptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getauctioninfooptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getauctioninfooptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_getauctioninfooptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getauctioninfooptions_verbosity: (a: number) => number;
  readonly __wbg_set_getauctioninfooptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_auction_info_options: (a: number, b: number) => number;
  readonly sdk_get_auction_info: (a: number, b: number) => number;
  readonly __wbg_getblockresult_free: (a: number) => void;
  readonly getblockresult_api_version: (a: number) => number;
  readonly getblockresult_block: (a: number) => number;
  readonly getblockresult_toJson: (a: number) => number;
  readonly sdk_get_block_options: (a: number, b: number) => number;
  readonly sdk_get_block: (a: number, b: number) => number;
  readonly sdk_chain_get_block: (a: number, b: number) => number;
  readonly __wbg_geterasummaryresult_free: (a: number) => void;
  readonly geterasummaryresult_api_version: (a: number) => number;
  readonly geterasummaryresult_era_summary: (a: number) => number;
  readonly geterasummaryresult_toJson: (a: number) => number;
  readonly sdk_get_era_summary_options: (a: number, b: number) => number;
  readonly sdk_get_era_summary: (a: number, b: number) => number;
  readonly __wbg_getstateroothashresult_free: (a: number) => void;
  readonly getstateroothashresult_api_version: (a: number) => number;
  readonly getstateroothashresult_state_root_hash: (a: number) => number;
  readonly getstateroothashresult_state_root_hash_as_string: (a: number, b: number) => void;
  readonly getstateroothashresult_toJson: (a: number) => number;
  readonly sdk_get_state_root_hash_options: (a: number, b: number) => number;
  readonly sdk_get_state_root_hash: (a: number, b: number) => number;
  readonly sdk_chain_get_state_root_hash: (a: number, b: number) => number;
  readonly sdk_make_deploy: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly sdk_make_transfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly __wbg_get_getblockoptions_verbosity: (a: number) => number;
  readonly __wbg_get_geterasummaryoptions_verbosity: (a: number) => number;
  readonly __wbg_get_getstateroothashoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getblockoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_geterasummaryoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_getstateroothashoptions_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_getblockoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_set_geterasummaryoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_set_getstateroothashoptions_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getblockoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_get_geterasummaryoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_get_getstateroothashoptions_block_identifier: (a: number) => number;
  readonly __wbg_set_getblockoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_set_geterasummaryoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_set_getstateroothashoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_getblockoptions_free: (a: number) => void;
  readonly __wbg_geterasummaryoptions_free: (a: number) => void;
  readonly __wbg_getstateroothashoptions_free: (a: number) => void;
  readonly __wbg_set_getblockoptions_verbosity: (a: number, b: number) => void;
  readonly __wbg_set_geterasummaryoptions_verbosity: (a: number, b: number) => void;
  readonly __wbg_set_getstateroothashoptions_verbosity: (a: number, b: number) => void;
  readonly __wbg_get_getblockoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_get_geterasummaryoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_get_getstateroothashoptions_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_get_getblockoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_get_geterasummaryoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_get_getstateroothashoptions_node_address: (a: number, b: number) => void;
  readonly transferaddr_new: (a: number, b: number, c: number) => void;
  readonly fromTransfer: (a: number, b: number) => number;
  readonly urefaddr_new: (a: number, b: number, c: number) => void;
  readonly __wbg_bytes_free: (a: number) => void;
  readonly bytes_new: () => number;
  readonly bytes_fromUint8Array: (a: number) => number;
  readonly __wbg_contracthash_free: (a: number) => void;
  readonly contracthash_fromString: (a: number, b: number, c: number) => void;
  readonly contracthash_fromFormattedStr: (a: number, b: number, c: number) => void;
  readonly contracthash_toFormattedString: (a: number, b: number) => void;
  readonly contracthash_fromUint8Array: (a: number, b: number) => number;
  readonly contractpackagehash_fromString: (a: number, b: number, c: number) => void;
  readonly contractpackagehash_fromFormattedStr: (a: number, b: number, c: number) => void;
  readonly contractpackagehash_toFormattedString: (a: number, b: number) => void;
  readonly contractpackagehash_fromUint8Array: (a: number, b: number) => number;
  readonly __wbg_argssimple_free: (a: number) => void;
  readonly __wbg_peerentry_free: (a: number) => void;
  readonly peerentry_node_id: (a: number, b: number) => void;
  readonly peerentry_address: (a: number, b: number) => void;
  readonly __wbg_publickey_free: (a: number) => void;
  readonly publickey_new: (a: number, b: number, c: number) => void;
  readonly publickey_fromUint8Array: (a: number, b: number) => number;
  readonly publickey_toJson: (a: number) => number;
  readonly __wbg_putdeployresult_free: (a: number) => void;
  readonly putdeployresult_api_version: (a: number) => number;
  readonly putdeployresult_deploy_hash: (a: number) => number;
  readonly putdeployresult_toJson: (a: number) => number;
  readonly sdk_deploy: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly __wbg_getnodestatusresult_free: (a: number) => void;
  readonly getnodestatusresult_api_version: (a: number) => number;
  readonly getnodestatusresult_chainspec_name: (a: number, b: number) => void;
  readonly getnodestatusresult_starting_state_root_hash: (a: number) => number;
  readonly getnodestatusresult_peers: (a: number) => number;
  readonly getnodestatusresult_last_added_block_info: (a: number) => number;
  readonly getnodestatusresult_our_public_signing_key: (a: number) => number;
  readonly getnodestatusresult_round_length: (a: number) => number;
  readonly getnodestatusresult_next_upgrade: (a: number) => number;
  readonly getnodestatusresult_build_version: (a: number, b: number) => void;
  readonly getnodestatusresult_uptime: (a: number) => number;
  readonly getnodestatusresult_reactor_state: (a: number) => number;
  readonly getnodestatusresult_last_progress: (a: number) => number;
  readonly getnodestatusresult_available_block_range: (a: number) => number;
  readonly getnodestatusresult_block_sync: (a: number) => number;
  readonly getnodestatusresult_toJson: (a: number) => number;
  readonly sdk_get_node_status: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_getpeersresult_free: (a: number) => void;
  readonly getpeersresult_api_version: (a: number) => number;
  readonly getpeersresult_peers: (a: number) => number;
  readonly getpeersresult_toJson: (a: number) => number;
  readonly sdk_get_peers: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_listrpcsresult_free: (a: number) => void;
  readonly listrpcsresult_api_version: (a: number) => number;
  readonly listrpcsresult_name: (a: number, b: number) => void;
  readonly listrpcsresult_schema: (a: number) => number;
  readonly listrpcsresult_toJson: (a: number) => number;
  readonly sdk_list_rpcs: (a: number, b: number, c: number, d: number) => number;
  readonly log: (a: number, b: number) => void;
  readonly error: (a: number, b: number) => void;
  readonly sdk_new: () => number;
  readonly __wbg_sdk_free: (a: number) => void;
  readonly __wbg_urefaddr_free: (a: number) => void;
  readonly __wbg_transferaddr_free: (a: number) => void;
  readonly __wbg_contractpackagehash_free: (a: number) => void;
  readonly __wbg_accounthash_free: (a: number) => void;
  readonly accounthash_new: (a: number, b: number, c: number) => void;
  readonly accounthash_fromFormattedStr: (a: number, b: number, c: number) => void;
  readonly accounthash_fromPublicKey: (a: number) => number;
  readonly accounthash_toFormattedString: (a: number, b: number) => void;
  readonly accounthash_fromUint8Array: (a: number, b: number) => number;
  readonly accounthash_toJson: (a: number) => number;
  readonly blockhash_new: (a: number, b: number, c: number) => void;
  readonly blockhash_fromDigest: (a: number, b: number) => void;
  readonly blockhash_toJson: (a: number) => number;
  readonly deployhash_new: (a: number, b: number, c: number) => void;
  readonly deployhash_fromDigest: (a: number, b: number) => void;
  readonly deployhash_toJson: (a: number) => number;
  readonly __wbg_dictionaryitemstrparams_free: (a: number) => void;
  readonly dictionaryitemstrparams_new: () => number;
  readonly dictionaryitemstrparams_setAccountNamedKey: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly dictionaryitemstrparams_setContractNamedKey: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly dictionaryitemstrparams_setUref: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly dictionaryitemstrparams_setDictionary: (a: number, b: number, c: number) => void;
  readonly dictionaryitemstrparams_toJson: (a: number) => number;
  readonly __wbg_dictionaryitemidentifier_free: (a: number) => void;
  readonly dictionaryitemidentifier_newFromAccountInfo: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly dictionaryitemidentifier_newFromContractInfo: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly dictionaryitemidentifier_newFromSeedUref: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly dictionaryitemidentifier_newFromDictionaryKey: (a: number, b: number, c: number) => void;
  readonly dictionaryitemidentifier_toJson: (a: number) => number;
  readonly __wbg_uref_free: (a: number) => void;
  readonly uref_new: (a: number, b: number, c: number, d: number) => void;
  readonly uref_fromUint8Array: (a: number, b: number, c: number) => number;
  readonly uref_toJson: (a: number) => number;
  readonly sdk_put_deploy: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_account_put_deploy: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_install: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly __wbg_blockhash_free: (a: number) => void;
  readonly __wbg_deployhash_free: (a: number) => void;
  readonly sdk_speculative_transfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number) => number;
  readonly __wbg_getaccountresult_free: (a: number) => void;
  readonly getaccountresult_api_version: (a: number) => number;
  readonly getaccountresult_account: (a: number) => number;
  readonly getaccountresult_merkle_proof: (a: number, b: number) => void;
  readonly getaccountresult_toJson: (a: number) => number;
  readonly __wbg_getaccountoptions_free: (a: number) => void;
  readonly __wbg_get_getaccountoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_getaccountoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getaccountoptions_account_identifier: (a: number, b: number) => void;
  readonly __wbg_set_getaccountoptions_account_identifier: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getaccountoptions_public_key: (a: number) => number;
  readonly __wbg_set_getaccountoptions_public_key: (a: number, b: number) => void;
  readonly __wbg_get_getaccountoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getaccountoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getaccountoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_getaccountoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getaccountoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getaccountoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_account_options: (a: number, b: number) => number;
  readonly sdk_get_account: (a: number, b: number) => number;
  readonly sdk_state_get_account_info: (a: number, b: number) => number;
  readonly __wbg_getchainspecresult_free: (a: number) => void;
  readonly getchainspecresult_api_version: (a: number) => number;
  readonly getchainspecresult_chainspec_bytes: (a: number) => number;
  readonly getchainspecresult_toJson: (a: number) => number;
  readonly sdk_get_chainspec: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_getdictionaryitemresult_free: (a: number) => void;
  readonly getdictionaryitemresult_api_version: (a: number) => number;
  readonly getdictionaryitemresult_dictionary_key: (a: number, b: number) => void;
  readonly getdictionaryitemresult_stored_value: (a: number) => number;
  readonly getdictionaryitemresult_merkle_proof: (a: number, b: number) => void;
  readonly getdictionaryitemresult_toJson: (a: number) => number;
  readonly __wbg_getdictionaryitemoptions_free: (a: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_getdictionaryitemoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_state_root_hash_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getdictionaryitemoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_state_root_hash: (a: number) => number;
  readonly __wbg_set_getdictionaryitemoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_dictionary_item_params: (a: number) => number;
  readonly __wbg_set_getdictionaryitemoptions_dictionary_item_params: (a: number, b: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_dictionary_item_identifier: (a: number) => number;
  readonly __wbg_set_getdictionaryitemoptions_dictionary_item_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getdictionaryitemoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_dictionary_item_options: (a: number, b: number) => number;
  readonly sdk_get_dictionary_item: (a: number, b: number) => number;
  readonly sdk_state_get_dictionary_item: (a: number, b: number) => number;
  readonly __wbg_geterainforesult_free: (a: number) => void;
  readonly geterainforesult_api_version: (a: number) => number;
  readonly geterainforesult_era_summary: (a: number) => number;
  readonly geterainforesult_toJson: (a: number) => number;
  readonly __wbg_geterainfooptions_free: (a: number) => void;
  readonly __wbg_get_geterainfooptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_geterainfooptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_geterainfooptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_geterainfooptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_geterainfooptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_geterainfooptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_geterainfooptions_verbosity: (a: number) => number;
  readonly __wbg_set_geterainfooptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_era_info_options: (a: number, b: number) => number;
  readonly sdk_get_era_info: (a: number, b: number) => number;
  readonly __wbg_getvalidatorchangesresult_free: (a: number) => void;
  readonly getvalidatorchangesresult_api_version: (a: number) => number;
  readonly getvalidatorchangesresult_changes: (a: number) => number;
  readonly getvalidatorchangesresult_toJson: (a: number) => number;
  readonly sdk_get_validator_changes: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_query_contract_dict_options: (a: number, b: number) => number;
  readonly sdk_query_contract_dict: (a: number, b: number) => number;
  readonly __wbg_querycontractkeyoptions_free: (a: number) => void;
  readonly __wbg_get_querycontractkeyoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_querycontractkeyoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querycontractkeyoptions_global_state_identifier: (a: number) => number;
  readonly __wbg_set_querycontractkeyoptions_global_state_identifier: (a: number, b: number) => void;
  readonly __wbg_get_querycontractkeyoptions_state_root_hash_as_string: (a: number, b: number) => void;
  readonly __wbg_set_querycontractkeyoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querycontractkeyoptions_state_root_hash: (a: number) => number;
  readonly __wbg_set_querycontractkeyoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_querycontractkeyoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_querycontractkeyoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querycontractkeyoptions_contract_key_as_string: (a: number, b: number) => void;
  readonly __wbg_set_querycontractkeyoptions_contract_key_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querycontractkeyoptions_contract_key: (a: number) => number;
  readonly __wbg_set_querycontractkeyoptions_contract_key: (a: number, b: number) => void;
  readonly __wbg_get_querycontractkeyoptions_path_as_string: (a: number, b: number) => void;
  readonly __wbg_set_querycontractkeyoptions_path_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querycontractkeyoptions_path: (a: number) => number;
  readonly __wbg_set_querycontractkeyoptions_path: (a: number, b: number) => void;
  readonly __wbg_get_querycontractkeyoptions_verbosity: (a: number) => number;
  readonly __wbg_set_querycontractkeyoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_query_contract_key_options: (a: number, b: number) => number;
  readonly sdk_query_contract_key: (a: number, b: number) => number;
  readonly __wbg_get_querycontractdictoptions_verbosity: (a: number) => number;
  readonly __wbg_set_querycontractdictoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_querycontractdictoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_set_querycontractdictoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_set_querycontractdictoptions_dictionary_item_params: (a: number, b: number) => void;
  readonly __wbg_set_querycontractdictoptions_dictionary_item_identifier: (a: number, b: number) => void;
  readonly __wbg_get_querycontractdictoptions_state_root_hash: (a: number) => number;
  readonly __wbg_set_querycontractdictoptions_verbosity: (a: number, b: number) => void;
  readonly __wbg_querycontractdictoptions_free: (a: number) => void;
  readonly __wbg_get_querycontractdictoptions_state_root_hash_as_string: (a: number, b: number) => void;
  readonly __wbg_get_querycontractdictoptions_dictionary_item_params: (a: number) => number;
  readonly __wbg_get_querycontractdictoptions_dictionary_item_identifier: (a: number) => number;
  readonly __wbg_get_querycontractdictoptions_node_address: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly wasm_bindgen__convert__closures__invoke1_mut__hf4f051b17cdcd1a7: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h2d860cbe7308b412: (a: number, b: number, c: number, d: number) => void;
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
