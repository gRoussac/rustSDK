/* tslint:disable */
/* eslint-disable */
/**
* @param {string} hex_string
* @returns {Uint8Array}
*/
export function hexToUint8Array(hex_string: string): Uint8Array;
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
export enum CLTypeEnum {
  Bool = 0,
  I32 = 1,
  I64 = 2,
  U8 = 3,
  U32 = 4,
  U64 = 5,
  U128 = 6,
  U256 = 7,
  U512 = 8,
  Unit = 9,
  String = 10,
  Key = 11,
  URef = 12,
  PublicKey = 13,
  Option = 14,
  List = 15,
  ByteArray = 16,
  Result = 17,
  Map = 18,
  Tuple1 = 19,
  Tuple2 = 20,
  Tuple3 = 21,
  Any = 22,
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
* @param {PublicKey} public_key
* @returns {AccountHash}
*/
  static fromPublicKey(public_key: PublicKey): AccountHash;
/**
* @param {string} input
* @returns {AccountHash}
*/
  static fromFormattedStr(input: string): AccountHash;
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
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
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
}
/**
*/
export class CLType {
  free(): void;
/**
* @returns {CLType}
*/
  static Bool(): CLType;
/**
* @returns {CLType}
*/
  static I32(): CLType;
/**
* @returns {CLType}
*/
  static I64(): CLType;
/**
* @returns {CLType}
*/
  static U8(): CLType;
/**
* @returns {CLType}
*/
  static U32(): CLType;
/**
* @returns {CLType}
*/
  static U64(): CLType;
/**
* @returns {CLType}
*/
  static U128(): CLType;
/**
* @returns {CLType}
*/
  static U256(): CLType;
/**
* @returns {CLType}
*/
  static U512(): CLType;
/**
* @returns {CLType}
*/
  static Unit(): CLType;
/**
* @returns {CLType}
*/
  static String(): CLType;
/**
* @returns {CLType}
*/
  static Key(): CLType;
/**
* @returns {CLType}
*/
  static URef(): CLType;
/**
* @returns {CLType}
*/
  static PublicKey(): CLType;
/**
* @returns {CLType}
*/
  static Option(): CLType;
/**
* @returns {CLType}
*/
  static List(): CLType;
/**
* @returns {CLType}
*/
  static ByteArray(): CLType;
/**
* @returns {CLType}
*/
  static Result(): CLType;
/**
* @returns {CLType}
*/
  static Map(): CLType;
/**
* @returns {CLType}
*/
  static Tuple1(): CLType;
/**
* @returns {CLType}
*/
  static Tuple2(): CLType;
/**
* @returns {CLType}
*/
  static Tuple3(): CLType;
/**
* @returns {CLType}
*/
  static Any(): CLType;
/**
* @param {number} cl_type
*/
  constructor(cl_type: number);
}
/**
*/
export class CLValue {
  free(): void;
}
/**
*/
export class ContractHash {
  free(): void;
/**
* @param {string} contract_hash_hex_str
*/
  constructor(contract_hash_hex_str: string);
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
* @param {string} contract_package_hash_hex_str
*/
  constructor(contract_package_hash_hex_str: string);
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
* @param {string} entrypoint
* @param {string | undefined} secret_key
* @returns {Deploy}
*/
  withEntryPoint(entrypoint: string, secret_key?: string): Deploy;
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
* @param {bigint} conv_rate
* @returns {any}
*/
  paymentAmount(conv_rate: bigint): any;
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
* @param {AccountHash} account_hash
* @param {string} dictionary_name
* @param {string} dictionary_item_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromAccountInfo(account_hash: AccountHash, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
/**
* @param {HashAddr} contract_addr
* @param {string} dictionary_name
* @param {string} dictionary_item_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromContractInfo(contract_addr: HashAddr, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
/**
* @param {URef} seed_uref
* @param {string} dictionary_item_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromSeedUref(seed_uref: URef, dictionary_item_key: string): DictionaryItemIdentifier;
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
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @param {any} input
* @returns {Key}
*/
  static fromFormattedString(input: any): Key;
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
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {PaymentStrParams} payment_params
* @returns {any}
*/
  make_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams): any;
/**
* @param {any} options
* @returns {queryBalanceOptions}
*/
  query_balance_options(options: any): queryBalanceOptions;
/**
* @param {queryBalanceOptions} options
* @returns {Promise<any>}
*/
  query_balance(options: queryBalanceOptions): Promise<any>;
/**
* @param {string | undefined} maybe_block_id_as_string
* @param {BlockIdentifier | undefined} maybe_block_identifier
* @param {string} node_address
* @param {number | undefined} verbosity
* @param {string} amount
* @param {string} target_account
* @param {DeployStrParams} deploy_params
* @param {PaymentStrParams} payment_params
* @returns {Promise<any>}
*/
  speculative_transfer(maybe_block_id_as_string: string | undefined, maybe_block_identifier: BlockIdentifier | undefined, node_address: string, verbosity: number | undefined, amount: string, target_account: string, deploy_params: DeployStrParams, payment_params: PaymentStrParams): Promise<any>;
/**
* @param {any} options
* @returns {queryContractOptions}
*/
  query_contract_options(options: any): queryContractOptions;
/**
* @param {queryContractOptions} options
* @returns {Promise<any>}
*/
  query_contract(options: queryContractOptions): Promise<any>;
/**
* @param {any} options
* @returns {getAccountOptions}
*/
  get_account_options(options: any): getAccountOptions;
/**
* @param {getAccountOptions} options
* @returns {Promise<any>}
*/
  get_account(options: getAccountOptions): Promise<any>;
/**
* @param {getAccountOptions} options
* @returns {Promise<any>}
*/
  state_get_account_info(options: getAccountOptions): Promise<any>;
/**
* @param {any} options
* @returns {getBalanceOptions}
*/
  get_balance_options(options: any): getBalanceOptions;
/**
* @param {getBalanceOptions} options
* @returns {Promise<any>}
*/
  get_balance(options: getBalanceOptions): Promise<any>;
/**
* @param {getBalanceOptions} options
* @returns {Promise<any>}
*/
  state_get_balance(options: getBalanceOptions): Promise<any>;
/**
* @param {any} options
* @returns {getDictionaryItemOptions}
*/
  get_dictionary_item_options(options: any): getDictionaryItemOptions;
/**
* @param {getDictionaryItemOptions} options
* @returns {Promise<any>}
*/
  get_dictionary_item(options: getDictionaryItemOptions): Promise<any>;
/**
* @param {getDictionaryItemOptions} options
* @returns {Promise<any>}
*/
  state_get_dictionary_item(options: getDictionaryItemOptions): Promise<any>;
/**
* @param {any} options
* @returns {getSpeculativeExecOptions}
*/
  get_speculative_exec_options(options: any): getSpeculativeExecOptions;
/**
* @param {getSpeculativeExecOptions} options
* @returns {Promise<any>}
*/
  speculative_exec(options: getSpeculativeExecOptions): Promise<any>;
/**
* @param {string} node_address
* @param {number | undefined} verbosity
* @param {string} amount
* @param {string} target_account
* @param {DeployStrParams} deploy_params
* @param {PaymentStrParams} payment_params
* @returns {Promise<any>}
*/
  transfer(node_address: string, verbosity: number | undefined, amount: string, target_account: string, deploy_params: DeployStrParams, payment_params: PaymentStrParams): Promise<any>;
/**
* @param {any} options
* @returns {getDeployOptions}
*/
  get_deploy_options(options: any): getDeployOptions;
/**
* @param {getDeployOptions} options
* @returns {Promise<any>}
*/
  get_deploy(options: getDeployOptions): Promise<any>;
/**
* @param {getDeployOptions} options
* @returns {Promise<any>}
*/
  info_get_deploy(options: getDeployOptions): Promise<any>;
/**
* @param {any} options
* @returns {getStateRootHashOptions}
*/
  get_state_root_hash_options(options: any): getStateRootHashOptions;
/**
* @param {getStateRootHashOptions} options
* @returns {Promise<any>}
*/
  get_state_root_hash(options: getStateRootHashOptions): Promise<any>;
/**
* @param {getStateRootHashOptions} options
* @returns {Promise<any>}
*/
  chain_get_state_root_hash(options: getStateRootHashOptions): Promise<any>;
/**
* @param {string} amount
* @param {string} target_account
* @param {string | undefined} transfer_id
* @param {DeployStrParams} deploy_params
* @param {PaymentStrParams} payment_params
* @returns {any}
*/
  make_transfer(amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams): any;
/**
* @param {any} options
* @returns {getAuctionInfoOptions}
*/
  get_auction_info_options(options: any): getAuctionInfoOptions;
/**
* @param {getAuctionInfoOptions} options
* @returns {Promise<any>}
*/
  get_auction_info(options: getAuctionInfoOptions): Promise<any>;
/**
* @param {any} options
* @returns {getBlockOptions}
*/
  get_block_options(options: any): getBlockOptions;
/**
* @param {getBlockOptions} options
* @returns {Promise<any>}
*/
  get_block(options: getBlockOptions): Promise<any>;
/**
* @param {getBlockOptions} options
* @returns {Promise<any>}
*/
  chain_get_block(options: getBlockOptions): Promise<any>;
/**
* @param {any} options
* @returns {getBlockTransfersOptions}
*/
  get_block_transfers_options(options: any): getBlockTransfersOptions;
/**
* @param {getBlockTransfersOptions} options
* @returns {Promise<any>}
*/
  get_block_transfers(options: getBlockTransfersOptions): Promise<any>;
/**
* @param {any} options
* @returns {getEraSummaryOptions}
*/
  get_era_summary_options(options: any): getEraSummaryOptions;
/**
* @param {getEraSummaryOptions} options
* @returns {Promise<any>}
*/
  get_era_summary(options: getEraSummaryOptions): Promise<any>;
/**
* @param {BlockIdentifier | undefined} maybe_block_identifier
* @param {string} node_address
* @param {number | undefined} verbosity
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {PaymentStrParams} payment_params
* @returns {Promise<any>}
*/
  speculative_deploy(maybe_block_identifier: BlockIdentifier | undefined, node_address: string, verbosity: number | undefined, deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams): Promise<any>;
/**
* @param {any} options
* @returns {getEraInfoOptions}
*/
  get_era_info_options(options: any): getEraInfoOptions;
/**
* @param {getEraInfoOptions} options
* @returns {Promise<any>}
*/
  get_era_info(options: getEraInfoOptions): Promise<any>;
/**
* @param {string} node_address
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {PaymentStrParams} payment_params
* @param {number | undefined} verbosity
* @returns {Promise<any>}
*/
  deploy(node_address: string, deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams, verbosity?: number): Promise<any>;
/**
* @param {string} node_address
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {string} payment_amount
* @returns {Promise<any>}
*/
  call_entrypoint(node_address: string, deploy_params: DeployStrParams, session_params: SessionStrParams, payment_amount: string): Promise<any>;
/**
* @param {string} node_address
* @param {number | undefined} verbosity
* @returns {Promise<any>}
*/
  get_chainspec(node_address: string, verbosity?: number): Promise<any>;
/**
* @param {string} node_address
* @param {number | undefined} verbosity
* @returns {Promise<any>}
*/
  get_node_status(node_address: string, verbosity?: number): Promise<any>;
/**
* @param {string} node_address
* @param {number | undefined} verbosity
* @returns {Promise<any>}
*/
  get_peers(node_address: string, verbosity?: number): Promise<any>;
/**
* @param {string} node_address
* @param {number | undefined} verbosity
* @returns {Promise<any>}
*/
  get_validator_changes(node_address: string, verbosity?: number): Promise<any>;
/**
* @param {string} node_address
* @param {number | undefined} verbosity
* @returns {Promise<any>}
*/
  list_rpcs(node_address: string, verbosity?: number): Promise<any>;
/**
* @param {string} node_address
* @param {Deploy} deploy
* @param {number | undefined} verbosity
* @returns {Promise<any>}
*/
  put_deploy(node_address: string, deploy: Deploy, verbosity?: number): Promise<any>;
/**
* @param {string} node_address
* @param {Deploy} deploy
* @param {number | undefined} verbosity
* @returns {Promise<any>}
*/
  account_put_deploy(node_address: string, deploy: Deploy, verbosity?: number): Promise<any>;
/**
* @param {any} options
* @returns {queryGlobalStateOptions}
*/
  query_global_state_options(options: any): queryGlobalStateOptions;
/**
* @param {queryGlobalStateOptions} options
* @returns {Promise<any>}
*/
  query_global_state(options: queryGlobalStateOptions): Promise<any>;
/**
* @param {Deploy} deploy
* @param {string} secret_key
* @returns {any}
*/
  sign_deploy(deploy: Deploy, secret_key: string): any;
/**
* @param {string} node_address
* @param {DeployStrParams} deploy_params
* @param {string} payment_amount
* @param {ArrayBuffer} wasm
* @returns {Promise<any>}
*/
  install(node_address: string, deploy_params: DeployStrParams, payment_amount: string, wasm: ArrayBuffer): Promise<any>;
/**
*/
  constructor();
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
* @param {Array<any> | undefined} session_args_simple
* @param {string | undefined} session_args_json
* @param {string | undefined} session_args_complex
* @param {string | undefined} session_version
* @param {string | undefined} session_entry_point
* @param {boolean | undefined} is_session_transfer
*/
  constructor(session_hash?: string, session_name?: string, session_package_hash?: string, session_package_name?: string, session_path?: string, session_args_simple?: Array<any>, session_args_json?: string, session_args_complex?: string, session_version?: string, session_entry_point?: string, is_session_transfer?: boolean);
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
}
/**
*/
export class getAuctionInfoOptions {
  free(): void;
}
/**
*/
export class getBalanceOptions {
  free(): void;
}
/**
*/
export class getBlockOptions {
  free(): void;
}
/**
*/
export class getBlockTransfersOptions {
  free(): void;
}
/**
*/
export class getDeployOptions {
  free(): void;
}
/**
*/
export class getDictionaryItemOptions {
  free(): void;
}
/**
*/
export class getEraInfoOptions {
  free(): void;
}
/**
*/
export class getEraSummaryOptions {
  free(): void;
}
/**
*/
export class getSpeculativeExecOptions {
  free(): void;
}
/**
*/
export class getStateRootHashOptions {
  free(): void;
}
/**
*/
export class queryBalanceOptions {
  free(): void;
}
/**
*/
export class queryContractOptions {
  free(): void;
}
/**
*/
export class queryGlobalStateOptions {
  free(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly sdk_make_deploy: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_argssimple_free: (a: number) => void;
  readonly __wbg_querybalanceoptions_free: (a: number) => void;
  readonly sdk_query_balance_options: (a: number, b: number) => number;
  readonly sdk_query_balance: (a: number, b: number) => number;
  readonly sdk_speculative_transfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number) => number;
  readonly __wbg_querycontractoptions_free: (a: number) => void;
  readonly sdk_query_contract_options: (a: number, b: number) => number;
  readonly sdk_query_contract: (a: number, b: number) => number;
  readonly hexToUint8Array: (a: number, b: number, c: number) => void;
  readonly jsonPrettyPrint: (a: number, b: number) => number;
  readonly privateToPublicKey: (a: number, b: number) => number;
  readonly getTimestamp: () => number;
  readonly __wbg_deployhash_free: (a: number) => void;
  readonly deployhash_new: (a: number, b: number, c: number) => void;
  readonly deployhash_fromDigest: (a: number, b: number) => void;
  readonly deployhash_toJson: (a: number) => number;
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
  readonly key_fromDictionary: (a: number) => number;
  readonly key_fromSystemContractRegistry: () => number;
  readonly key_fromEraSummary: () => number;
  readonly key_fromUnbond: (a: number) => number;
  readonly key_fromChainspecRegistry: () => number;
  readonly key_fromChecksumRegistry: () => number;
  readonly key_toFormattedString: (a: number, b: number) => void;
  readonly key_fromFormattedString: (a: number, b: number) => void;
  readonly __wbg_getaccountoptions_free: (a: number) => void;
  readonly sdk_get_account_options: (a: number, b: number) => number;
  readonly sdk_get_account: (a: number, b: number) => number;
  readonly sdk_state_get_account_info: (a: number, b: number) => number;
  readonly __wbg_getbalanceoptions_free: (a: number) => void;
  readonly sdk_get_balance_options: (a: number, b: number) => number;
  readonly sdk_get_balance: (a: number, b: number) => number;
  readonly sdk_state_get_balance: (a: number, b: number) => number;
  readonly __wbg_getdictionaryitemoptions_free: (a: number) => void;
  readonly sdk_get_dictionary_item_options: (a: number, b: number) => number;
  readonly sdk_get_dictionary_item: (a: number, b: number) => number;
  readonly sdk_state_get_dictionary_item: (a: number, b: number) => number;
  readonly __wbg_getspeculativeexecoptions_free: (a: number) => void;
  readonly sdk_get_speculative_exec_options: (a: number, b: number) => number;
  readonly sdk_speculative_exec: (a: number, b: number) => number;
  readonly sdk_transfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
  readonly __wbg_transferaddr_free: (a: number) => void;
  readonly transferaddr_new: (a: number, b: number, c: number) => void;
  readonly fromTransfer: (a: number, b: number) => number;
  readonly __wbg_cltype_free: (a: number) => void;
  readonly cltype_Bool: () => number;
  readonly cltype_I32: () => number;
  readonly cltype_I64: () => number;
  readonly cltype_U8: () => number;
  readonly cltype_U32: () => number;
  readonly cltype_U64: () => number;
  readonly cltype_U128: () => number;
  readonly cltype_U256: () => number;
  readonly cltype_U512: () => number;
  readonly cltype_Unit: () => number;
  readonly cltype_String: () => number;
  readonly cltype_Key: () => number;
  readonly cltype_URef: () => number;
  readonly cltype_PublicKey: () => number;
  readonly cltype_Option: () => number;
  readonly cltype_List: () => number;
  readonly cltype_ByteArray: () => number;
  readonly cltype_Result: () => number;
  readonly cltype_Map: () => number;
  readonly cltype_Tuple1: () => number;
  readonly cltype_Tuple2: () => number;
  readonly cltype_Tuple3: () => number;
  readonly cltype_Any: () => number;
  readonly cltype_new: (a: number) => number;
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
  readonly __wbg_dictionaryitemidentifier_free: (a: number) => void;
  readonly dictionaryitemidentifier_newFromAccountInfo: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly dictionaryitemidentifier_newFromContractInfo: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly dictionaryitemidentifier_newFromSeedUref: (a: number, b: number, c: number) => number;
  readonly dictionaryitemidentifier_toJson: (a: number) => number;
  readonly __wbg_eraid_free: (a: number) => void;
  readonly eraid_new: (a: number) => number;
  readonly eraid_value: (a: number) => number;
  readonly __wbg_globalstateidentifier_free: (a: number) => void;
  readonly globalstateidentifier_new: (a: number) => number;
  readonly globalstateidentifier_fromBlockHash: (a: number) => number;
  readonly globalstateidentifier_fromBlockHeight: (a: number) => number;
  readonly globalstateidentifier_fromStateRootHash: (a: number) => number;
  readonly globalstateidentifier_toJson: (a: number) => number;
  readonly __wbg_getdeployoptions_free: (a: number) => void;
  readonly sdk_get_deploy_options: (a: number, b: number) => number;
  readonly sdk_get_deploy: (a: number, b: number) => number;
  readonly sdk_info_get_deploy: (a: number, b: number) => number;
  readonly __wbg_getstateroothashoptions_free: (a: number) => void;
  readonly sdk_get_state_root_hash_options: (a: number, b: number) => number;
  readonly sdk_get_state_root_hash: (a: number, b: number) => number;
  readonly sdk_chain_get_state_root_hash: (a: number, b: number) => number;
  readonly sdk_make_transfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
  readonly __wbg_sessionstrparams_free: (a: number) => void;
  readonly sessionstrparams_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number) => number;
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
  readonly __wbg_digest_free: (a: number) => void;
  readonly digest__new: (a: number, b: number, c: number) => void;
  readonly digest_fromDigest: (a: number, b: number, c: number) => void;
  readonly digest_toJson: (a: number) => number;
  readonly __wbg_getauctioninfooptions_free: (a: number) => void;
  readonly sdk_get_auction_info_options: (a: number, b: number) => number;
  readonly sdk_get_auction_info: (a: number, b: number) => number;
  readonly sdk_get_block_options: (a: number, b: number) => number;
  readonly sdk_get_block: (a: number, b: number) => number;
  readonly sdk_chain_get_block: (a: number, b: number) => number;
  readonly sdk_get_block_transfers_options: (a: number, b: number) => number;
  readonly sdk_get_block_transfers: (a: number, b: number) => number;
  readonly sdk_get_era_summary_options: (a: number, b: number) => number;
  readonly sdk_get_era_summary: (a: number, b: number) => number;
  readonly sdk_speculative_deploy: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly log: (a: number, b: number) => void;
  readonly error: (a: number, b: number) => void;
  readonly digest_fromString: (a: number, b: number, c: number) => void;
  readonly __wbg_getblockoptions_free: (a: number) => void;
  readonly __wbg_getblocktransfersoptions_free: (a: number) => void;
  readonly __wbg_geterasummaryoptions_free: (a: number) => void;
  readonly __wbg_accounthash_free: (a: number) => void;
  readonly accounthash_new: (a: number, b: number, c: number) => void;
  readonly accounthash_fromPublicKey: (a: number) => number;
  readonly accounthash_fromFormattedStr: (a: number, b: number, c: number) => void;
  readonly accounthash_toFormattedString: (a: number, b: number) => void;
  readonly accounthash_fromUint8Array: (a: number, b: number) => number;
  readonly accounthash_toJson: (a: number) => number;
  readonly __wbg_deploy_free: (a: number) => void;
  readonly deploy_new: (a: number) => number;
  readonly deploy_toJson: (a: number) => number;
  readonly deploy_withPaymentAndSession: (a: number, b: number, c: number) => number;
  readonly deploy_withTransfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly deploy_withTTL: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly deploy_withTimestamp: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly deploy_withChainName: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly deploy_withAccount: (a: number, b: number, c: number, d: number) => number;
  readonly deploy_withEntryPoint: (a: number, b: number, c: number, d: number, e: number) => number;
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
  readonly deploy_paymentAmount: (a: number, b: number) => number;
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
  readonly __wbg_path_free: (a: number) => void;
  readonly path_new: (a: number) => number;
  readonly path_toJson: (a: number) => number;
  readonly path_toString: (a: number, b: number) => void;
  readonly __wbg_geterainfooptions_free: (a: number) => void;
  readonly sdk_get_era_info_options: (a: number, b: number) => number;
  readonly sdk_get_era_info: (a: number, b: number) => number;
  readonly sdk_deploy: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly sdk_call_entrypoint: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly __wbg_blockhash_free: (a: number) => void;
  readonly blockhash_new: (a: number, b: number) => number;
  readonly blockhash_toBytes: (a: number, b: number) => void;
  readonly __wbg_blockidentifier_free: (a: number) => void;
  readonly blockidentifier_new: (a: number) => number;
  readonly blockidentifier_from_hash: (a: number) => number;
  readonly blockidentifier_fromHeight: (a: number) => number;
  readonly blockidentifier_toJson: (a: number) => number;
  readonly __wbg_clvalue_free: (a: number) => void;
  readonly contractpackagehash_new: (a: number, b: number, c: number) => void;
  readonly contractpackagehash_fromFormattedStr: (a: number, b: number, c: number) => void;
  readonly contractpackagehash_toFormattedString: (a: number, b: number) => void;
  readonly contractpackagehash_fromUint8Array: (a: number, b: number) => number;
  readonly __wbg_dictionaryitemstrparams_free: (a: number) => void;
  readonly dictionaryitemstrparams_new: () => number;
  readonly dictionaryitemstrparams_setAccountNamedKey: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly dictionaryitemstrparams_setContractNamedKey: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly dictionaryitemstrparams_setUref: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly dictionaryitemstrparams_setDictionary: (a: number, b: number, c: number) => void;
  readonly dictionaryitemstrparams_toJson: (a: number) => number;
  readonly __wbg_purseidentifier_free: (a: number) => void;
  readonly purseidentifier_new_main_purse_under_public_key: (a: number) => number;
  readonly purseidentifier_new_main_purse_under_account_hash: (a: number) => number;
  readonly purseidentifier_new_purse_uref: (a: number) => number;
  readonly sdk_get_chainspec: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_get_node_status: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_get_peers: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_get_validator_changes: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_list_rpcs: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_put_deploy: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_account_put_deploy: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly __wbg_queryglobalstateoptions_free: (a: number) => void;
  readonly sdk_query_global_state_options: (a: number, b: number) => number;
  readonly sdk_query_global_state: (a: number, b: number) => number;
  readonly sdk_sign_deploy: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_install: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly __wbg_contractpackagehash_free: (a: number) => void;
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
  readonly __wbg_contracthash_free: (a: number) => void;
  readonly contracthash_new: (a: number, b: number, c: number) => void;
  readonly contracthash_fromFormattedStr: (a: number, b: number, c: number) => void;
  readonly contracthash_toFormattedString: (a: number, b: number) => void;
  readonly contracthash_fromUint8Array: (a: number, b: number) => number;
  readonly __wbg_dictionaryaddr_free: (a: number) => void;
  readonly __wbg_hashaddr_free: (a: number) => void;
  readonly hashaddr_new: (a: number, b: number, c: number) => void;
  readonly urefaddr_new: (a: number, b: number, c: number) => void;
  readonly __wbg_bytes_free: (a: number) => void;
  readonly bytes_new: () => number;
  readonly __wbg_publickey_free: (a: number) => void;
  readonly publickey_new: (a: number, b: number, c: number) => void;
  readonly publickey_fromUint8Array: (a: number, b: number) => number;
  readonly publickey_toJson: (a: number) => number;
  readonly __wbg_uref_free: (a: number) => void;
  readonly uref_new: (a: number, b: number, c: number, d: number) => void;
  readonly uref_fromUint8Array: (a: number, b: number, c: number) => number;
  readonly uref_toJson: (a: number) => number;
  readonly sdk_new: () => number;
  readonly __wbg_sdk_free: (a: number) => void;
  readonly __wbg_urefaddr_free: (a: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd0d6e959b0cbb07a: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h70dd628200031030: (a: number, b: number, c: number, d: number) => void;
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
