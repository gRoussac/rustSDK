/* tslint:disable */
/* eslint-disable */
/**
 * Converts a hexadecimal string to a regular string.
 *
 * # Arguments
 *
 * * `hex_string` - The hexadecimal string to convert.
 *
 * # Returns
 *
 * A regular string containing the converted value.
 */
export function hexToString(hex_string: string): string;
/**
 * Converts a hexadecimal string to a Uint8Array.
 *
 * # Arguments
 *
 * * `hex_string` - The hexadecimal string to convert.
 *
 * # Returns
 *
 * A Uint8Array containing the converted value.
 */
export function hexToUint8Array(hex_string: string): Uint8Array;
/**
 * Converts a Uint8Array to a `Bytes` object.
 *
 * # Arguments
 *
 * * `uint8_array` - The Uint8Array to convert.
 *
 * # Returns
 *
 * A `Bytes` object containing the converted value.
 */
export function uint8ArrayToBytes(uint8_array: Uint8Array): Bytes;
/**
 * Converts motes to CSPR (Casper tokens).
 *
 * # Arguments
 *
 * * `motes` - The motes value to convert.
 *
 * # Returns
 *
 * A string representing the CSPR amount.
 */
export function motesToCSPR(motes: string): string;
/**
 * Pretty prints a JSON value.
 *
 * # Arguments
 *
 * * `value` - The JSON value to pretty print.
 * * `verbosity` - An optional verbosity level for pretty printing.
 *
 * # Returns
 *
 * A pretty printed JSON value as a JsValue.
 */
export function jsonPrettyPrint(value: any, verbosity?: Verbosity): any;
/**
 * Converts a secret key to a corresponding public key.
 *
 * # Arguments
 *
 * * `secret_key` - The secret key in PEM format.
 *
 * # Returns
 *
 * A JsValue containing the corresponding public key.
 * If an error occurs during the conversion, JavaScript error is returned.
 */
export function publicKeyFromSecretKey(secret_key: string): any;
/**
 * Generates a secret key using the Ed25519 algorithm and returns it as a PEM-encoded string.
 *
 * # Returns
 *
 * A `JsValue` containing the PEM-encoded secret key or a JavaScript error if an error occurs.
 *
 * # Errors
 *
 * Returns an error if the secret key generation or serialization fails.
 */
export function generateSecretKey(): any;
/**
 * Generates a secret key using the secp256k1 algorithm and returns it as a PEM-encoded string.
 *
 * # Returns
 *
 * A `JsValue` containing the PEM-encoded secret key or a JavaScript error if an error occurs.
 *
 * # Errors
 *
 * Returns an error if the secret key generation or serialization fails.
 */
export function generateSecretKey_secp256k1(): any;
/**
 * Converts a formatted account hash to a base64-encoded string (cep-18 key encoding).
 *
 *
 * # Arguments
 *
 * * `formatted_account_hash` - A hex-formatted string representing the account hash.
 * Example: "account-hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f"
 *
 * # Returns
 *
 * Returns the base64-encoded string.
 * Example: "ALSFwHTO98yszQMClJ0gQ6txM6vbFM+ofoOSlFwL2Apf"
 */
export function accountHashToBase64Key(formatted_account_hash: string): string;
/**
 * Gets the current timestamp.
 *
 * # Returns
 *
 * A JsValue containing the current timestamp.
 */
export function getTimestamp(): any;
/**
 * Encodes the given metadata using the lower-level Blake2b hashing algorithm.
 *
 * # Arguments
 *
 * * `meta_data` - A string containing the metadata to be hashed.
 *
 * # Returns
 *
 * A JsValue containing the hash generated using the Blake2b algorithm.
 */
export function encodeLowerBlake2b(meta_data: string): any;
/**
 * Converts a key and value into a formatted dictionary item key for ditionaries queries.
 *
 * # Arguments
 *
 * * `key` - A string representation of a account/contract hash as a Key.
 * * `value` - A string representation of the value, for now restricted to parse as U256 or Key
 *
 * # Returns
 *
 * A string representing the formatted dictionary item key.
 */
export function makeDictionaryItemKey(key: Key, value: string): string;
export enum PricingMode {
  Fixed = 0,
  Classic = 1,
  Reserved = 2,
}
export enum TransactionKind {
  InvocableEntity = 0,
  InvocableEntityAlias = 1,
  Package = 2,
  PackageAlias = 3,
  Session = 4,
  Transfer = 5,
  AddBid = 6,
  Delegate = 7,
  Undelegate = 8,
  Redelegate = 9,
  WithdrawBid = 10,
}
export enum TransferTargetKind {
  PublicKey = 0,
  AccountHash = 1,
  URef = 2,
}
export enum Verbosity {
  Low = 0,
  Medium = 1,
  High = 2,
}
/**
 * The `ReadableStreamType` enum.
 *
 * *This API requires the following crate features to be activated: `ReadableStreamType`*
 */
type ReadableStreamType = "bytes";
export class AccessRights {
  free(): void;
  static NONE(): number;
  static READ(): number;
  static WRITE(): number;
  static ADD(): number;
  static READ_ADD(): number;
  static READ_WRITE(): number;
  static ADD_WRITE(): number;
  static READ_ADD_WRITE(): number;
  constructor(access_rights: number);
  static from_bits(read: boolean, write: boolean, add: boolean): AccessRights;
  is_readable(): boolean;
  is_writeable(): boolean;
  is_addable(): boolean;
  is_none(): boolean;
}
export class AccountHash {
  free(): void;
  constructor(account_hash_hex_str: string);
  static fromFormattedStr(formatted_str: string): AccountHash;
  static fromPublicKey(public_key: PublicKey): AccountHash;
  toFormattedString(): string;
  toHexString(): string;
  static fromUint8Array(bytes: Uint8Array): AccountHash;
  toJson(): any;
}
export class AccountIdentifier {
  free(): void;
  constructor(formatted_str: string);
  static fromFormattedStr(formatted_str: string): AccountIdentifier;
  static fromPublicKey(key: PublicKey): AccountIdentifier;
  static fromAccountHash(account_hash: AccountHash): AccountIdentifier;
  toJson(): any;
}
export class AddressableEntityHash {
  free(): void;
  constructor(addressable_entity_hex_str: string);
  static fromFormattedStr(formatted_str: string): AddressableEntityHash;
  toFormattedString(): string;
  static fromUint8Array(bytes: Uint8Array): AddressableEntityHash;
}
export class ArgsSimple {
  private constructor();
  free(): void;
}
export class BlockHash {
  free(): void;
  constructor(block_hash_hex_str: string);
  static fromDigest(digest: Digest): BlockHash;
  toJson(): any;
  toString(): string;
}
export class BlockIdentifier {
  free(): void;
  constructor(block_identifier: BlockIdentifier);
  static from_hash(hash: BlockHash): BlockIdentifier;
  static fromHeight(height: bigint): BlockIdentifier;
  toJson(): any;
}
/**
 * Represents the body of an event, containing processed deploy information.
 */
export class Body {
  private constructor();
  free(): void;
  transaction_processed?: TransactionProcessed;
  readonly get_deploy_processed: TransactionProcessed | undefined;
  readonly get_transaction_processed: TransactionProcessed | undefined;
}
export class Bytes {
  free(): void;
  constructor();
  static fromUint8Array(uint8_array: Uint8Array): Bytes;
}
export class CasperWallet {
  free(): void;
  constructor();
  /**
   * Signs a deploy with the provided or active public key.
   *
   * This function requests a connection to the wallet, retrieves the public key
   * (either provided or active), serializes the deploy, signs it, and returns the
   * signed deploy.
   *
   * # Arguments
   *
   * * `deploy` - The deploy object to be signed.
   * * `public_key` - An optional public key string. If `None`, the active public key is used.
   *
   * # Returns
   *
   * * `Ok(Deploy)` - The signed deploy object.
   * * `Err(JsError)` - An error if the connection fails, the public key retrieval fails,
   *   the serialization fails, the signing fails, or if the signing is cancelled.
   *
   * # Errors
   *
   * This function returns a `JsError` if:
   * * The connection to the wallet could not be established.
   * * The public key could not be retrieved.
   * * The deploy serialization fails.
   * * The signing operation fails.
   * * The signing is cancelled by the user.
   */
  signDeploy(deploy: Deploy, public_key?: string): Promise<Deploy>;
  signTransaction(transaction: Transaction, public_key?: string): Promise<Transaction>;
  /**
   * Alias for the `sign_message` function, specifically for signing deploy hashes.
   *
   * This function calls `sign_message` to sign the provided deploy hash with the
   * given or active public key.
   *
   * # Arguments
   *
   * * `deploy_hash` - The deploy hash string to be signed.
   * * `public_key` - An optional public key string. If `None`, the active public key is used.
   *
   * # Returns
   *
   * * `Ok(String)` - The signature string.
   * * `Err(JsError)` - An error if the signing process fails.
   */
  signDeployHash(deploy_hash: string, public_key?: string): Promise<string>;
  /**
   * Alias for the `sign_message` function, specifically for signing transaction hashes.
   *
   * This function calls `sign_message` to sign the provided transaction hash with the
   * given or active public key.
   *
   * # Arguments
   *
   * * `transaction_hash` - The transaction hash string to be signed.
   * * `public_key` - An optional public key string. If `None`, the active public key is used.
   *
   * # Returns
   *
   * * `Ok(String)` - The signature string.
   * * `Err(JsError)` - An error if the signing process fails.
   */
  signTransactionHash(transaction_hash: string, public_key?: string): Promise<string>;
  /**
   * Signs a message with the provided or active public key.
   *
   * This function requests a connection to the wallet, retrieves the public key
   * (either provided or active), signs the message, and returns the signature.
   *
   * # Arguments
   *
   * * `message` - The message string to be signed.
   * * `public_key` - An optional public key string. If `None`, the active public key is used.
   *
   * # Returns
   *
   * * `Ok(String)` - The signature string.
   * * `Err(JsError)` - An error if the connection fails, the public key retrieval fails,
   *   the signing fails, or if the signing is cancelled.
   *
   * # Errors
   *
   * This function returns a `JsError` if:
   * * The connection to the wallet could not be established.
   * * The public key could not be retrieved.
   * * The signing operation fails.
   * * The signing is cancelled by the user.
   */
  signMessage(message: string, public_key?: string): Promise<string>;
  connect(): Promise<boolean>;
  disconnect(): Promise<boolean>;
  isConnected(): Promise<boolean>;
  getVersion(): Promise<string>;
  getActivePublicKey(): Promise<string>;
  switchAccount(): Promise<boolean>;
}
export class ContractHash {
  free(): void;
  constructor(contract_hash_hex_str: string);
  static fromFormattedStr(formatted_str: string): ContractHash;
  toFormattedString(): string;
  static fromUint8Array(bytes: Uint8Array): ContractHash;
}
export class ContractPackageHash {
  free(): void;
  constructor(contract_package_hash_hex_str: string);
  static fromFormattedStr(formatted_str: string): ContractPackageHash;
  toFormattedString(): string;
  static fromUint8Array(bytes: Uint8Array): ContractPackageHash;
}
export class Deploy {
  free(): void;
  constructor(deploy: any);
  toJson(): any;
  static withPaymentAndSession(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams): Deploy;
  static withTransfer(amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams): Deploy;
  withTTL(ttl: string, secret_key?: string): Deploy;
  withTimestamp(timestamp: string, secret_key?: string): Deploy;
  withChainName(chain_name: string, secret_key?: string): Deploy;
  withAccount(account: PublicKey, secret_key?: string): Deploy;
  withEntryPointName(entry_point_name: string, secret_key?: string): Deploy;
  withHash(hash: ContractHash, secret_key?: string): Deploy;
  withPackageHash(package_hash: ContractPackageHash, secret_key?: string): Deploy;
  withModuleBytes(module_bytes: Bytes, secret_key?: string): Deploy;
  withSecretKey(secret_key?: string): Deploy;
  withStandardPayment(amount: string, secret_key?: string): Deploy;
  withPayment(payment: any, secret_key?: string): Deploy;
  withSession(session: any, secret_key?: string): Deploy;
  validateDeploySize(): boolean;
  isValid(): boolean;
  hasValidHash(): boolean;
  isExpired(): boolean;
  sign(secret_key: string): Deploy;
  approvalsHash(): any;
  approvals(): any;
  isTransfer(): boolean;
  isStandardPayment(phase: number): boolean;
  isStoredContract(): boolean;
  isStoredContractPackage(): boolean;
  isModuleBytes(): boolean;
  isByName(): boolean;
  byName(): string | undefined;
  entryPointName(): string;
  addSignature(public_key: string, signature: string): Deploy;
  TTL(): string;
  timestamp(): string;
  chainName(): string;
  account(): string;
  paymentAmount(conv_rate: number): string;
  args(): any;
  addArg(js_value_arg: any, secret_key?: string): Deploy;
  readonly hash: DeployHash;
}
export class DeployHash {
  free(): void;
  constructor(deploy_hash_hex_str: string);
  static fromDigest(digest: Digest): DeployHash;
  toJson(): any;
  toString(): string;
}
export class DeployStrParams {
  free(): void;
  constructor(chain_name: string, session_account: string, secret_key?: string, timestamp?: string, ttl?: string, gas_price_tolerance?: string);
  setDefaultTimestamp(): void;
  setDefaultTTL(): void;
  get secret_key(): string | undefined;
  set secret_key(value: string);
  timestamp?: string;
  ttl?: string;
  get chain_name(): string | undefined;
  set chain_name(value: string);
  get session_account(): string | undefined;
  set session_account(value: string);
  get gas_price_tolerance(): string | undefined;
  set gas_price_tolerance(value: string);
}
export class DictionaryAddr {
  free(): void;
  constructor(bytes: Uint8Array);
}
export class DictionaryItemIdentifier {
  private constructor();
  free(): void;
  static newFromAccountInfo(account_hash: string, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
  static newFromContractInfo(contract_addr: string, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
  static newFromEntityInfo(entity_addr: string, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
  static newFromSeedUref(seed_uref: string, dictionary_item_key: string): DictionaryItemIdentifier;
  static newFromDictionaryKey(dictionary_key: string): DictionaryItemIdentifier;
  toJson(): any;
}
export class DictionaryItemStrParams {
  free(): void;
  constructor();
  setAccountNamedKey(key: string, dictionary_name: string, dictionary_item_key: string): void;
  setContractNamedKey(key: string, dictionary_name: string, dictionary_item_key: string): void;
  setEntityNamedKey(key: string, dictionary_name: string, dictionary_item_key: string): void;
  setUref(seed_uref: string, dictionary_item_key: string): void;
  setDictionary(value: string): void;
  toJson(): any;
}
export class Digest {
  free(): void;
  constructor(digest_hex_str: string);
  static fromString(digest_hex_str: string): Digest;
  static fromRaw(bytes: Uint8Array): Digest;
  toJson(): any;
  toString(): string;
}
export class EntityAddr {
  private constructor();
  free(): void;
  static fromFormattedStr(formatted_str: string): EntityAddr;
  toFormattedString(): string;
  toHexString(): string;
  toJson(): any;
}
export class EntityIdentifier {
  free(): void;
  constructor(formatted_str: string);
  static fromFormattedStr(formatted_str: string): EntityIdentifier;
  static fromPublicKey(key: PublicKey): EntityIdentifier;
  static fromAccountHash(account_hash: AccountHash): EntityIdentifier;
  static fromEntityAddr(entity_addr: EntityAddr): EntityIdentifier;
  toJson(): any;
}
export class EraId {
  free(): void;
  constructor(value: bigint);
  value(): bigint;
}
/**
 * Represents the result of parsing an event, containing error information and the event body.
 */
export class EventParseResult {
  private constructor();
  free(): void;
  err?: string;
  body?: Body;
}
/**
 * Represents the result of an execution, either Success or Failure.
 */
export class ExecutionResult {
  private constructor();
  free(): void;
  /**
   * Optional Success information.
   */
  Success?: Version2;
  /**
   * Optional Failure information.
   */
  Failure?: Failure;
}
/**
 * Represents a failure response containing an error message.
 */
export class Failure {
  private constructor();
  free(): void;
  cost: string;
  error_message: string;
}
export class GetAccountResult {
  private constructor();
  free(): void;
  toJson(): any;
  readonly api_version: any;
  readonly account: any;
  readonly merkle_proof: string;
}
export class GetAddressableEntityResult {
  private constructor();
  free(): void;
  toJson(): any;
  readonly api_version: any;
  readonly entity_result: any;
  readonly merkle_proof: string;
}
export class GetAuctionInfoResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetAuctionInfoResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the auction state as a JsValue.
   */
  readonly auction_state: any;
}
export class GetBalanceResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetBalanceResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the balance value as a JsValue.
   */
  readonly balance_value: any;
  /**
   * Gets the Merkle proof as a string.
   */
  readonly merkle_proof: string;
}
export class GetBlockResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetBlockResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the block information as a JsValue.
   */
  readonly block: any;
}
export class GetBlockTransfersResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetBlockTransfersResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the block hash as an Option<BlockHash>.
   */
  readonly block_hash: BlockHash | undefined;
  /**
   * Gets the transfers as a JsValue.
   */
  readonly transfers: any;
}
/**
 * A struct representing the result of the `get_chainspec` function.
 */
export class GetChainspecResult {
  private constructor();
  free(): void;
  /**
   * Converts the `GetChainspecResult` to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the chainspec bytes as a JsValue.
   */
  readonly chainspec_bytes: any;
}
export class GetDeployResult {
  private constructor();
  free(): void;
  /**
   * Converts the result to a JSON JavaScript value.
   */
  toJson(): any;
  /**
   * Gets the API version as a JavaScript value.
   */
  readonly api_version: any;
  /**
   * Gets the deploy information.
   */
  readonly deploy: Deploy;
  /**
   * Gets the execution info as a JavaScript value.
   */
  readonly execution_info: any;
}
export class GetDictionaryItemResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetDictionaryItemResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the dictionary key as a String.
   */
  readonly dictionary_key: string;
  /**
   * Gets the stored value as a JsValue.
   */
  readonly stored_value: any;
  /**
   * Gets the merkle proof as a String.
   */
  readonly merkle_proof: string;
}
export class GetEraInfoResult {
  private constructor();
  free(): void;
  toJson(): any;
  readonly api_version: any;
  readonly era_summary: any;
}
/**
 * Wrapper struct for the `GetEraSummaryResult` from casper_client.
 */
export class GetEraSummaryResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetEraSummaryResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the era summary as a JsValue.
   */
  readonly era_summary: any;
}
/**
 * Wrapper struct for the `GetNodeStatusResult` from casper_client.
 */
export class GetNodeStatusResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetNodeStatusResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the chainspec name as a String.
   */
  readonly chainspec_name: string;
  /**
   * Gets the starting state root hash as a Digest.
   */
  readonly starting_state_root_hash: Digest;
  /**
   * Gets the list of peers as a JsValue.
   */
  readonly peers: any;
  /**
   * Gets information about the last added block as a JsValue.
   */
  readonly last_added_block_info: any;
  /**
   * Gets the public signing key as an Option<PublicKey>.
   */
  readonly our_public_signing_key: PublicKey | undefined;
  /**
   * Gets the round length as a JsValue.
   */
  readonly round_length: any;
  /**
   * Gets information about the next upgrade as a JsValue.
   */
  readonly next_upgrade: any;
  /**
   * Gets the build version as a String.
   */
  readonly build_version: string;
  /**
   * Gets the uptime information as a JsValue.
   */
  readonly uptime: any;
  /**
   * Gets the reactor state information as a JsValue.
   */
  readonly reactor_state: any;
  /**
   * Gets the last progress information as a JsValue.
   */
  readonly last_progress: any;
  /**
   * Gets the available block range as a JsValue.
   */
  readonly available_block_range: any;
  /**
   * Gets the block sync information as a JsValue.
   */
  readonly block_sync: any;
}
/**
 * A wrapper for the `GetPeersResult` type from the Casper client.
 */
export class GetPeersResult {
  private constructor();
  free(): void;
  /**
   * Converts the result to JSON format as a JavaScript value.
   */
  toJson(): any;
  /**
   * Gets the API version as a JSON value.
   */
  readonly api_version: any;
  /**
   * Gets the peers as a JSON value.
   */
  readonly peers: any;
}
/**
 * Wrapper struct for the `GetStateRootHashResult` from casper_client.
 */
export class GetStateRootHashResult {
  private constructor();
  free(): void;
  /**
   * Alias for state_root_hash_as_string
   */
  toString(): string;
  /**
   * Converts the GetStateRootHashResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the state root hash as an Option<Digest>.
   */
  readonly state_root_hash: Digest | undefined;
  /**
   * Gets the state root hash as a String.
   */
  readonly state_root_hash_as_string: string;
}
export class GetTransactionResult {
  private constructor();
  free(): void;
  /**
   * Converts the result to a JSON JavaScript value.
   */
  toJson(): any;
  /**
   * Gets the API version as a JavaScript value.
   */
  readonly api_version: any;
  /**
   * Gets the transaction information.
   */
  readonly transaction: Transaction;
  /**
   * Gets the execution info as a JavaScript value.
   */
  readonly execution_info: any;
}
/**
 * Wrapper struct for the `GetValidatorChangesResult` from casper_client.
 */
export class GetValidatorChangesResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetValidatorChangesResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the validator changes as a JsValue.
   */
  readonly changes: any;
}
export class GlobalStateIdentifier {
  free(): void;
  constructor(global_state_identifier: GlobalStateIdentifier);
  static fromBlockHash(block_hash: BlockHash): GlobalStateIdentifier;
  static fromBlockHeight(block_height: bigint): GlobalStateIdentifier;
  static fromStateRootHash(state_root_hash: Digest): GlobalStateIdentifier;
  toJson(): any;
}
export class HashAddr {
  free(): void;
  constructor(bytes: Uint8Array);
  toBytes(): Uint8Array;
  toHexString(): string;
}
export class HashString {
  private constructor();
  free(): void;
  toString(): string;
  hash: string;
  readonly Deploy: string;
  readonly Version1: string;
}
export class IntoUnderlyingByteSource {
  private constructor();
  free(): void;
  start(controller: ReadableByteStreamController): void;
  pull(controller: ReadableByteStreamController): Promise<any>;
  cancel(): void;
  readonly type: ReadableStreamType;
  readonly autoAllocateChunkSize: number;
}
export class IntoUnderlyingSink {
  private constructor();
  free(): void;
  write(chunk: any): Promise<any>;
  close(): Promise<any>;
  abort(reason: any): Promise<any>;
}
export class IntoUnderlyingSource {
  private constructor();
  free(): void;
  pull(controller: ReadableStreamDefaultController): Promise<any>;
  cancel(): void;
}
export class Key {
  free(): void;
  constructor(key: Key);
  toJson(): any;
  static fromURef(key: URef): Key;
  static fromDeployInfo(key: DeployHash): Key;
  static fromAccount(key: AccountHash): Key;
  static fromHash(key: HashAddr): Key;
  static fromTransfer(key: Uint8Array): TransferAddr;
  static fromEraInfo(key: EraId): Key;
  static fromBalance(key: URefAddr): Key;
  static fromBid(key: AccountHash): Key;
  static fromWithdraw(key: AccountHash): Key;
  static fromDictionaryAddr(key: DictionaryAddr): Key;
  asDictionaryAddr(): DictionaryAddr | undefined;
  static fromSystemEntityRegistry(): Key;
  static fromEraSummary(): Key;
  static fromUnbond(key: AccountHash): Key;
  static fromChainspecRegistry(): Key;
  static fromChecksumRegistry(): Key;
  toFormattedString(): string;
  static fromFormattedString(formatted_str: string): Key;
  static fromDictionaryKey(seed_uref: URef, dictionary_item_key: Uint8Array): Key;
  isDictionaryKey(): boolean;
  intoAccount(): AccountHash | undefined;
  intoHash(): HashAddr | undefined;
  asBalance(): URefAddr | undefined;
  intoURef(): URef | undefined;
  urefToHash(): Key | undefined;
  withdrawToUnbond(): Key | undefined;
}
/**
 * Wrapper struct for the `ListRpcsResult` from casper_client.
 */
export class ListRpcsResult {
  private constructor();
  free(): void;
  /**
   * Converts the ListRpcsResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the name of the RPC.
   */
  readonly name: string;
  /**
   * Gets the schema of the RPC as a JsValue.
   */
  readonly schema: any;
}
export class Message {
  private constructor();
  free(): void;
  String: string;
}
export class Messages {
  private constructor();
  free(): void;
  entity_hash: string;
  message: Message;
  topic_name: string;
  topic_name_hash: string;
  topic_index: number;
  block_index: bigint;
}
export class PackageHash {
  free(): void;
  constructor(package_hash_hex_str: string);
  static fromFormattedStr(formatted_str: string): PackageHash;
  toFormattedString(): string;
  static fromUint8Array(bytes: Uint8Array): PackageHash;
}
export class Path {
  free(): void;
  constructor(path: any);
  static fromArray(path: any): Path;
  toJson(): any;
  toString(): string;
  is_empty(): boolean;
}
export class Payment {
  private constructor();
  free(): void;
  source: string;
}
export class PaymentStrParams {
  free(): void;
  constructor(payment_amount?: string, payment_hash?: string, payment_name?: string, payment_package_hash?: string, payment_package_name?: string, payment_path?: string, payment_args_simple?: Array<any>, payment_args_json?: string, payment_version?: string, payment_entry_point?: string);
  get payment_amount(): string | undefined;
  set payment_amount(value: string);
  get payment_hash(): string | undefined;
  set payment_hash(value: string);
  get payment_name(): string | undefined;
  set payment_name(value: string);
  get payment_package_hash(): string | undefined;
  set payment_package_hash(value: string);
  get payment_package_name(): string | undefined;
  set payment_package_name(value: string);
  get payment_path(): string | undefined;
  set payment_path(value: string);
  get payment_args_simple(): Array<any> | undefined;
  set payment_args_simple(value: Array<any>);
  get payment_args_json(): string | undefined;
  set payment_args_json(value: string);
  get payment_version(): string | undefined;
  set payment_version(value: string);
  get payment_entry_point(): string | undefined;
  set payment_entry_point(value: string);
}
export class PeerEntry {
  private constructor();
  free(): void;
  readonly node_id: string;
  readonly address: string;
}
export class PublicKey {
  free(): void;
  constructor(public_key_hex_str: string);
  static fromUint8Array(bytes: Uint8Array): PublicKey;
  toAccountHash(): AccountHash;
  toPurseUref(): URef;
  toJson(): any;
}
export class PublicKeyString {
  private constructor();
  free(): void;
  PublicKey: string;
}
export class PurseIdentifier {
  free(): void;
  constructor(key: PublicKey);
  static fromAccountHash(account_hash: AccountHash): PurseIdentifier;
  static fromURef(uref: URef): PurseIdentifier;
  toJson(): any;
}
export class PutDeployResult {
  private constructor();
  free(): void;
  /**
   * Converts PutDeployResult to a JavaScript object.
   */
  toJson(): any;
  /**
   * Gets the API version as a JavaScript value.
   */
  readonly api_version: any;
  /**
   * Gets the deploy hash associated with this result.
   */
  readonly deploy_hash: DeployHash;
}
export class PutTransactionResult {
  private constructor();
  free(): void;
  /**
   * Converts PutTransactionResult to a JavaScript object.
   */
  toJson(): any;
  /**
   * Gets the API version as a JavaScript value.
   */
  readonly api_version: any;
  /**
   * Gets the transaction hash associated with this result.
   */
  readonly transaction_hash: TransactionHash;
}
export class QueryBalanceDetailsResult {
  private constructor();
  free(): void;
  /**
   * Converts the QueryBalanceDetailsResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  readonly total_balance: any;
  readonly available_balance: any;
  readonly total_balance_proof: any;
  readonly holds: any;
}
export class QueryBalanceResult {
  private constructor();
  free(): void;
  /**
   * Converts the QueryBalanceResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the balance as a JsValue.
   */
  readonly balance: any;
}
export class QueryGlobalStateResult {
  private constructor();
  free(): void;
  /**
   * Converts the QueryGlobalStateResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the block header as a JsValue.
   */
  readonly block_header: any;
  /**
   * Gets the stored value as a JsValue.
   */
  readonly stored_value: any;
  /**
   * Gets the Merkle proof as a string.
   */
  readonly merkle_proof: string;
}
export class RecordId {
  free(): void;
  constructor(value: number);
}
export class SDK {
  free(): void;
  /**
   * Parses auction info options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing auction info options to be parsed.
   *
   * # Returns
   *
   * Result containing parsed auction info options as a `GetAuctionInfoOptions` struct,
   * or a `JsError` if deserialization fails.
   */
  get_auction_info_options(options: any): getAuctionInfoOptions;
  /**
   * Retrieves auction information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetAuctionInfoOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetAuctionInfoResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_auction_info(options?: getAuctionInfoOptions): Promise<GetAuctionInfoResult>;
  state_get_auction_info_js_alias(options?: getAuctionInfoOptions): Promise<GetAuctionInfoResult>;
  get_era_info_options(options: any): getEraInfoOptions;
  get_era_info(options?: getEraInfoOptions): Promise<GetEraInfoResult>;
  chain_get_era_info_by_switch_block(options?: getEraInfoOptions): Promise<GetEraInfoResult>;
  /**
   * Retrieves peers asynchronously.
   *
   * # Arguments
   *
   * * `verbosity` - Optional verbosity level.
   * * `rpc_address` - Optional rpc address.
   *
   * # Returns
   *
   * A `Result` containing `GetPeersResult` or a `JsError` if an error occurs.
   */
  get_peers(verbosity?: Verbosity, rpc_address?: string): Promise<GetPeersResult>;
  info_get_peers(verbosity?: Verbosity, rpc_address?: string): Promise<GetPeersResult>;
  /**
   * Retrieves validator changes using the provided options.
   *
   * # Arguments
   *
   * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
   * * `rpc_address` - An optional string specifying the rpc address to use for the request.
   *
   * # Returns
   *
   * A `Result` containing either a `GetValidatorChangesResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_validator_changes(verbosity?: Verbosity, rpc_address?: string): Promise<GetValidatorChangesResult>;
  info_get_validator_change(verbosity?: Verbosity, rpc_address?: string): Promise<GetValidatorChangesResult>;
  /**
   * Lists available RPCs using the provided options.
   *
   * # Arguments
   *
   * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
   * * `rpc_address` - An optional string specifying the rpc address to use for the request.
   *
   * # Returns
   *
   * A `Result` containing either a `ListRpcsResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the listing process.
   */
  list_rpcs(verbosity?: Verbosity, rpc_address?: string): Promise<ListRpcsResult>;
  /**
   * Deserialize query_contract_key_options from a JavaScript object.
   */
  query_contract_key_options(options: any): queryContractKeyOptions;
  /**
   * JavaScript function for query_contract_key with deserialized options.
   */
  query_contract_key(options?: queryContractKeyOptions): Promise<QueryGlobalStateResult>;
  /**
   * JavaScript function for deploying with deserialized parameters.
   *
   * # Arguments
   *
   * * `deploy_params` - Deploy parameters.
   * * `session_params` - Session parameters.
   * * `payment_params` - Payment parameters.
   * * `verbosity` - An optional verbosity level.
   * * `rpc_address` - An optional rpc address.
   *
   * # Returns
   *
   * A result containing PutDeployResult or a JsError.
   */
  deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams, verbosity?: Verbosity, rpc_address?: string): Promise<PutDeployResult>;
  get_account_options(options: any): getAccountOptions;
  /**
   * Retrieves account information using the provided options.
   *
   * This function is an asynchronous JavaScript binding for the Rust `get_account` method.
   *
   * # Arguments
   *
   * * `options` - An optional `GetAccountOptions` struct containing retrieval options, such as:
   *   - `account_identifier`: Identifier for the account.
   *   - `account_identifier_as_string`: String representation of the account identifier.
   *   - `maybe_block_id_as_string`: Optional string representation of the block ID.
   *   - `maybe_block_identifier`: Optional `BlockIdentifierInput` for specifying the block.
   *   - `verbosity`: Verbosity level for the output.
   *   - `rpc_address`: Address of the node to query.
   *
   * # Returns
   *
   * A `Result` containing either a `GetAccountResult` on success or a `JsError` on failure.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process, such as issues with the provided options or network errors.
   * ```
   */
  get_account(options?: getAccountOptions): Promise<GetAccountResult>;
  state_get_account_info(options?: getAccountOptions): Promise<GetAccountResult>;
  /**
   * Asynchronously retrieves the chainspec.
   *
   * # Arguments
   *
   * * `verbosity` - An optional `Verbosity` parameter.
   * * `rpc_address` - An optional rpc address as a string.
   *
   * # Returns
   *
   * A `Result` containing either a `GetChainspecResult` or a `JsError` in case of an error.
   */
  get_chainspec(verbosity?: Verbosity, rpc_address?: string): Promise<GetChainspecResult>;
  info_get_chainspec(verbosity?: Verbosity, rpc_address?: string): Promise<GetChainspecResult>;
  /**
   * Parses era summary options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing era summary options to be parsed.
   *
   * # Returns
   *
   * Parsed era summary options as a `GetEraSummaryOptions` struct.
   */
  get_era_summary_options(options: any): getEraSummaryOptions;
  /**
   * Retrieves era summary information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetEraSummaryOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetEraSummaryResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_era_summary(options?: getEraSummaryOptions): Promise<GetEraSummaryResult>;
  chain_get_era_summary(options?: getEraSummaryOptions): Promise<GetEraSummaryResult>;
  /**
   * Parses state root hash options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing state root hash options to be parsed.
   *
   * # Returns
   *
   * Parsed state root hash options as a `GetStateRootHashOptions` struct.
   */
  get_state_root_hash_options(options: any): getStateRootHashOptions;
  /**
   * Retrieves state root hash information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetStateRootHashOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetStateRootHashResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_state_root_hash(options?: getStateRootHashOptions): Promise<GetStateRootHashResult>;
  /**
   * Retrieves state root hash information using the provided options (alias for `get_state_root_hash`).
   *
   * # Arguments
   *
   * * `options` - An optional `GetStateRootHashOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetStateRootHashResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  chain_get_state_root_hash(options?: getStateRootHashOptions): Promise<GetStateRootHashResult>;
  /**
   * Parses query balance options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing query balance options to be parsed.
   *
   * # Returns
   *
   * Parsed query balance options as a `QueryBalanceOptions` struct.
   */
  query_balance_options(options: any): queryBalanceOptions;
  /**
   * Retrieves balance information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `QueryBalanceOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `QueryBalanceResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  query_balance(options?: queryBalanceOptions): Promise<QueryBalanceResult>;
  /**
   * Get options for speculative execution from a JavaScript value.
   */
  get_speculative_exec_deploy_options(options: any): getSpeculativeExecDeployOptions;
  /**
   * JS function for speculative execution.
   *
   * # Arguments
   *
   * * `options` - The options for speculative execution.
   *
   * # Returns
   *
   * A `Result` containing the result of the speculative execution or a `JsError` in case of an error.
   */
  speculative_exec_deploy(options?: getSpeculativeExecDeployOptions): Promise<SpeculativeExecResult>;
  /**
   * JS function for `sign_deploy`.
   *
   * # Arguments
   *
   * * `deploy` - The deploy to sign.
   * * `secret_key` - The secret key for signing.
   *
   * # Returns
   *
   * The signed `Deploy`.
   */
  sign_deploy(deploy: Deploy, secret_key: string): Deploy;
  constructor(rpc_address?: string, node_address?: string, verbosity?: Verbosity);
  getRPCAddress(rpc_address?: string): string;
  setRPCAddress(rpc_address?: string): void;
  getNodeAddress(node_address?: string): string;
  setNodeAddress(node_address?: string): void;
  getVerbosity(verbosity?: Verbosity): Verbosity;
  setVerbosity(verbosity?: Verbosity): void;
  get_binary_latest_switch_block_header(node_address?: string): Promise<any>;
  get_binary_latest_block_header(node_address?: string): Promise<any>;
  get_binary_block_header_by_height(height: bigint, node_address?: string): Promise<any>;
  get_binary_block_header_by_hash(block_hash: BlockHash, node_address?: string): Promise<any>;
  get_binary_latest_signed_block(node_address?: string): Promise<any>;
  get_binary_signed_block_by_height(height: bigint, node_address?: string): Promise<any>;
  get_binary_signed_block_by_hash(block_hash: BlockHash, node_address?: string): Promise<any>;
  get_binary_transaction_by_hash(hash: TransactionHash, with_finalized_approvals: boolean, node_address?: string): Promise<any>;
  get_binary_peers(node_address?: string): Promise<any>;
  get_binary_uptime(node_address?: string): Promise<any>;
  get_binary_last_progress(node_address?: string): Promise<any>;
  get_binary_reactor_state(node_address?: string): Promise<any>;
  get_binary_network_name(node_address?: string): Promise<any>;
  get_binary_consensus_validator_changes(node_address?: string): Promise<any>;
  get_binary_block_synchronizer_status(node_address?: string): Promise<any>;
  get_binary_available_block_range(node_address?: string): Promise<any>;
  get_binary_next_upgrade(node_address?: string): Promise<any>;
  get_binary_consensus_status(node_address?: string): Promise<any>;
  get_binary_chainspec_raw_bytes(node_address?: string): Promise<any>;
  get_binary_node_status(node_address?: string): Promise<any>;
  get_binary_validator_reward_by_era(validator_key: PublicKey, era: EraId, node_address?: string): Promise<any>;
  get_binary_validator_reward_by_block_height(validator_key: PublicKey, block_height: bigint, node_address?: string): Promise<any>;
  get_binary_validator_reward_by_block_hash(validator_key: PublicKey, block_hash: BlockHash, node_address?: string): Promise<any>;
  get_binary_delegator_reward_by_era(validator_key: PublicKey, delegator_key: PublicKey, era: EraId, node_address?: string): Promise<any>;
  get_binary_delegator_reward_by_block_height(validator_key: PublicKey, delegator_key: PublicKey, block_height: bigint, node_address?: string): Promise<any>;
  get_binary_delegator_reward_by_block_hash(validator_key: PublicKey, delegator_key: PublicKey, block_hash: BlockHash, node_address?: string): Promise<any>;
  get_binary_read_record(record_id: RecordId, key: Uint8Array, node_address?: string): Promise<any>;
  get_binary_global_state_item(key: Key, path: (string)[], node_address?: string): Promise<any>;
  get_binary_global_state_item_by_state_root_hash(state_root_hash: Digest, key: Key, path: (string)[], node_address?: string): Promise<any>;
  get_binary_global_state_item_by_block_hash(block_hash: BlockHash, key: Key, path: (string)[], node_address?: string): Promise<any>;
  get_binary_global_state_item_by_block_height(block_height: bigint, key: Key, path: (string)[], node_address?: string): Promise<any>;
  get_binary_try_accept_transaction(transaction: Transaction, node_address?: string): Promise<any>;
  get_binary_try_speculative_execution(transaction: Transaction, node_address?: string): Promise<any>;
  get_binary_protocol_version(node_address?: string): Promise<any>;
  /**
   * Parses balance options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing balance options to be parsed.
   *
   * # Returns
   *
   * Parsed balance options as a `GetBalanceOptions` struct.
   */
  get_balance_options(options: any): getBalanceOptions;
  /**
   * Retrieves balance information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetBalanceOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetBalanceResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_balance(options?: getBalanceOptions): Promise<GetBalanceResult>;
  /**
   * JavaScript Alias for `get_balance`.
   *
   * # Arguments
   *
   * * `options` - An optional `GetBalanceOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetBalanceResult` or a `JsError` in case of an error.
   */
  state_get_balance(options?: getBalanceOptions): Promise<GetBalanceResult>;
  get_entity_options(options: any): getEntityOptions;
  /**
   * Retrieves entity information using the provided options.
   *
   * This function is an asynchronous JavaScript binding for the Rust `get_entity` method.
   *
   * # Arguments
   *
   * * `options` - An optional `GetEntityOptions` struct containing retrieval options, such as:
   *   - `entity_identifier`: Identifier for the entity.
   *   - `entity_identifier_as_string`: String representation of the entity identifier.
   *   - `maybe_block_id_as_string`: Optional string representation of the block ID.
   *   - `maybe_block_identifier`: Optional `BlockIdentifierInput` for specifying the block.
   *   - `verbosity`: Verbosity level for the output.
   *   - `rpc_address`: Address of the node to query.
   *
   * # Returns
   *
   * A `Result` containing either a `GetAddressableEntityResult` on success or a `JsError` on failure.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process, such as issues with the provided options or network errors.
   * ```
   */
  get_entity(options?: getEntityOptions): Promise<GetAddressableEntityResult>;
  state_get_entity(options?: getEntityOptions): Promise<GetAddressableEntityResult>;
  /**
   * Parses query global state options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing query global state options to be parsed.
   *
   * # Returns
   *
   * Parsed query global state options as a `QueryGlobalStateOptions` struct.
   */
  query_global_state_options(options: any): queryGlobalStateOptions;
  /**
   * Retrieves global state information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `QueryGlobalStateOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `QueryGlobalStateResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  query_global_state(options?: queryGlobalStateOptions): Promise<QueryGlobalStateResult>;
  /**
   * This function allows executing a deploy speculatively.
   *
   * # Arguments
   *
   * * `deploy_params` - Deployment parameters for the deploy.
   * * `session_params` - Session parameters for the deploy.
   * * `payment_params` - Payment parameters for the deploy.
   * * `verbosity` - Optional verbosity level.
   * * `rpc_address` - Optional rpc address.
   *
   * # Returns
   *
   * A `Result` containing either a `SpeculativeExecResult` or a `JsError` in case of an error.
   */
  speculative_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams, verbosity?: Verbosity, rpc_address?: string): Promise<SpeculativeExecResult>;
  /**
   * JS function for transferring funds.
   *
   * # Arguments
   *
   * * `amount` - The amount to transfer.
   * * `target_account` - The target account.
   * * `transfer_id` - An optional transfer ID (defaults to a random number).
   * * `deploy_params` - The deployment parameters.
   * * `payment_params` - The payment parameters.
   * * `verbosity` - The verbosity level for logging (optional).
   * * `rpc_address` - The address of the node to connect to (optional).
   *
   * # Returns
   *
   * A `Result` containing the result of the transfer or a `JsError` in case of an error.
   */
  transfer(amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams, verbosity?: Verbosity, rpc_address?: string): Promise<PutDeployResult>;
  /**
   * Puts a transaction using the provided options.
   *
   * # Arguments
   *
   * * `transaction` - The `Transaction` object to be sent.
   * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
   * * `rpc_address` - An optional string specifying the rpc address to use for the request.
   *
   * # Returns
   *
   * A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the transaction process.
   */
  put_transaction(transaction: Transaction, verbosity?: Verbosity, rpc_address?: string): Promise<PutTransactionResult>;
  /**
   * JavaScript Alias for `put_transaction`.
   */
  account_put_transaction(transaction: Transaction, verbosity?: Verbosity, rpc_address?: string): Promise<PutTransactionResult>;
  /**
   * JS function for `make_deploy`.
   *
   * # Arguments
   *
   * * `deploy_params` - The deploy parameters.
   * * `session_params` - The session parameters.
   * * `payment_params` - The payment parameters.
   *
   * # Returns
   *
   * A `Result` containing the created `Deploy` or a `JsError` in case of an error.
   */
  make_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams): Deploy;
  /**
   * JS function for `make_transfer`.
   *
   * # Arguments
   *
   * * `amount` - The transfer amount.
   * * `target_account` - The target account.
   * * `transfer_id` - Optional transfer identifier.
   * * `deploy_params` - The deploy parameters.
   * * `payment_params` - The payment parameters.
   *
   * # Returns
   *
   * A `Result` containing the created `Deploy` or a `JsError` in case of an error.
   */
  make_transfer(amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams): Deploy;
  /**
   * JS function for `make_transaction`.
   *
   * # Arguments
   *
   * * `builder_params` - Transaction Builder parameters.
   * * `transaction_params` - The transaction parameters.
   *
   * # Returns
   *
   * A `Result` containing the created `Transaction` or a `JsError` in case of an error.
   */
  make_transaction(builder_params: TransactionBuilderParams, transaction_params: TransactionStrParams): Transaction;
  /**
   * JS function for `make_transfer_transaction`.
   *
   * # Arguments
   *
   * * `maybe_source` - Optional transfer source uref.
   * * `amount` - The transfer amount.
   * * `target` - The target account.
   * * `transaction_params` - The transaction parameters.
   * * `maybe_id` - Optional transfer identifier.
   *
   * # Returns
   *
   * A `Result` containing the created `Transaction` or a `JsError` in case of an error.
   */
  make_transfer_transaction(maybe_source: URef | undefined, target: string, amount: string, transaction_params: TransactionStrParams, maybe_id?: string): Transaction;
  /**
   * Creates a new Watcher instance to watch deploys (JavaScript-friendly).
   * Legacy alias
   *
   * # Arguments
   *
   * * `events_url` - The URL to monitor for transaction events.
   * * `timeout_duration` - An optional timeout duration in seconds.
   *
   * # Returns
   *
   * A `Watcher` instance.
   */
  watchDeploy(events_url: string, timeout_duration?: number): Watcher;
  /**
   * Creates a new Watcher instance to watch deploys (JavaScript-friendly).
   *
   * # Arguments
   *
   * * `events_url` - The URL to monitor for transaction events.
   * * `timeout_duration` - An optional timeout duration in seconds.
   *
   * # Returns
   *
   * A `Watcher` instance.
   */
  watchTransaction(events_url: string, timeout_duration?: number): Watcher;
  /**
   * Waits for a deploy event to be processed asynchronously (JavaScript-friendly).
   * Legacy alias
   *
   * # Arguments
   *
   * * `events_url` - The URL to monitor for transaction events.
   * * `deploy_hash` - The deploy hash to wait for.
   * * `timeout_duration` - An optional timeout duration in seconds.
   *
   * # Returns
   *
   * A JavaScript `Promise` resolving to either the processed `EventParseResult` or an error message.
   */
  waitDeploy(events_url: string, deploy_hash: string, timeout_duration?: number): Promise<Promise<any>>;
  /**
   * Waits for a deploy event to be processed asynchronously (JavaScript-friendly).
   *
   * # Arguments
   *
   * * `events_url` - The URL to monitor for transaction events.
   * * `target_hash` - The transaction hash to wait for.
   * * `timeout_duration` - An optional timeout duration in seconds.
   *
   * # Returns
   *
   * A JavaScript `Promise` resolving to either the processed `EventParseResult` or an error message.
   */
  waitTransaction(events_url: string, target_hash: string, timeout_duration?: number): Promise<Promise<any>>;
  /**
   * Calls a smart contract entry point with the specified parameters and returns the result.
   *
   * # Arguments
   *
   * * `transaction_params` - Transaction parameters.
   * * `builder_params` - Transaction Builder parameters.
   * * `rpc_address` - An optional rpc address to send the request to.
   *
   * # Returns
   *
   * A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the call.
   */
  call_entrypoint(builder_params: TransactionBuilderParams, transaction_params: TransactionStrParams, rpc_address?: string): Promise<PutTransactionResult>;
  /**
   * Parses block options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing block options to be parsed.
   *
   * # Returns
   *
   * Parsed block options as a `GetBlockOptions` struct.
   */
  get_block_options(options: any): getBlockOptions;
  /**
   * Retrieves block information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetBlockOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetBlockResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_block(options?: getBlockOptions): Promise<GetBlockResult>;
  /**
   * JavaScript Alias for the `get_block`.
   *
   * # Arguments
   *
   * * `options` - An optional `GetBlockOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetBlockResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  chain_get_block(options?: getBlockOptions): Promise<GetBlockResult>;
  /**
   * Parses dictionary item options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing dictionary item options to be parsed.
   *
   * # Returns
   *
   * Parsed dictionary item options as a `GetDictionaryItemOptions` struct.
   */
  get_dictionary_item_options(options: any): getDictionaryItemOptions;
  /**
   * Retrieves dictionary item information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetDictionaryItemOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetDictionaryItemResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_dictionary_item(options?: getDictionaryItemOptions): Promise<GetDictionaryItemResult>;
  /**
   * JavaScript Alias for `get_dictionary_item`
   */
  state_get_dictionary_item(options?: getDictionaryItemOptions): Promise<GetDictionaryItemResult>;
  /**
   * This function allows executing a transaction speculatively.
   *
   * # Arguments
   *
   * * `builder_params` - Transaction Builder parameters.
   * * `transaction_params` - Transactionment parameters for the transaction.
   * * `verbosity` - Optional verbosity level.
   * * `rpc_address` - Optional rpc address.
   *
   * # Returns
   *
   * A `Result` containing either a `SpeculativeExecTxnResult` or a `JsError` in case of an error.
   */
  speculative_transaction(builder_params: TransactionBuilderParams, transaction_params: TransactionStrParams, verbosity?: Verbosity, rpc_address?: string): Promise<SpeculativeExecTxnResult>;
  /**
   * JS function for transaction transferring funds.
   *
   * # Arguments
   *
   * * `maybe_source` - Optional transfer source uref.
   * * `target_account` - The target account.
   * * `amount` - The amount to transfer.
   * * `transaction_params` - The transaction parameters.
   * * `maybe_id` - An optional transfer ID (defaults to a random number).
   * * `verbosity` - The verbosity level for logging (optional).
   * * `rpc_address` - The address of the node to connect to (optional).
   *
   * # Returns
   *
   * A `Result` containing the result of the transfer or a `JsError` in case of an error.
   */
  transfer_transaction(maybe_source: URef | undefined, target_account: string, amount: string, transaction_params: TransactionStrParams, maybe_id?: string, verbosity?: Verbosity, rpc_address?: string): Promise<PutTransactionResult>;
  /**
   * Installs a smart contract with the specified parameters and returns the result.
   *
   * # Arguments
   * .
   * * `transaction_params` - Transaction parameters.
   * * `transaction_bytes` - Transaction Bytes to install
   * * `rpc_address` - An optional rpc address to send the request to.
   *
   * # Returns
   *
   * A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the installation.
   */
  install(transaction_params: TransactionStrParams, transaction_bytes: Bytes, rpc_address?: string): Promise<PutTransactionResult>;
  /**
   * Deserialize query_contract_dict_options from a JavaScript object.
   */
  query_contract_dict_options(options: any): queryContractDictOptions;
  /**
   * JavaScript function for query_contract_dict with deserialized options.
   */
  query_contract_dict(options?: queryContractDictOptions): Promise<GetDictionaryItemResult>;
  /**
   * Parses block transfers options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing block transfers options to be parsed.
   *
   * # Returns
   *
   * Parsed block transfers options as a `GetBlockTransfersOptions` struct.
   */
  get_block_transfers_options(options: any): getBlockTransfersOptions;
  /**
   * Retrieves block transfers information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetBlockTransfersOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetBlockTransfersResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_block_transfers(options?: getBlockTransfersOptions): Promise<GetBlockTransfersResult>;
  chain_get_block_transfers(options?: getBlockTransfersOptions): Promise<GetBlockTransfersResult>;
  /**
   * Parses deploy options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing deploy options to be parsed.
   *
   * # Returns
   *
   * Parsed deploy options as a `GetDeployOptions` struct.
   */
  get_deploy_options(options: any): getDeployOptions;
  /**
   * Retrieves deploy information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetDeployOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetDeployResult` or an error.
   */
  get_deploy(options?: getDeployOptions): Promise<GetDeployResult>;
  /**
   * Retrieves deploy information using the provided options, alias for `get_deploy`.
   */
  info_get_deploy(options?: getDeployOptions): Promise<GetDeployResult>;
  /**
   * Retrieves node status information using the provided options.
   *
   * # Arguments
   *
   * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
   * * `rpc_address` - An optional string specifying the rpc address to use for the request.
   *
   * # Returns
   *
   * A `Result` containing either a `GetNodeStatusResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_node_status(verbosity?: Verbosity, rpc_address?: string): Promise<GetNodeStatusResult>;
  info_get_status(verbosity?: Verbosity, rpc_address?: string): Promise<GetNodeStatusResult>;
  /**
   * Parses transaction options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing transaction options to be parsed.
   *
   * # Returns
   *
   * Parsed transaction options as a `GetTransactionOptions` struct.
   */
  get_transaction_options(options: any): getTransactionOptions;
  /**
   * Retrieves transaction information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetTransactionOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetTransactionResult` or an error.
   */
  get_transaction(options?: getTransactionOptions): Promise<GetTransactionResult>;
  /**
   * Retrieves transaction information using the provided options, alias for `get_transaction`.
   */
  info_get_transaction(options?: getTransactionOptions): Promise<GetTransactionResult>;
  /**
   * Puts a deploy using the provided options.
   *
   * # Arguments
   *
   * * `deploy` - The `Deploy` object to be sent.
   * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
   * * `rpc_address` - An optional string specifying the rpc address to use for the request.
   *
   * # Returns
   *
   * A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the deploy process.
   */
  put_deploy(deploy: Deploy, verbosity?: Verbosity, rpc_address?: string): Promise<PutDeployResult>;
  /**
   * JavaScript Alias for `put_deploy`.
   */
  account_put_deploy(deploy: Deploy, verbosity?: Verbosity, rpc_address?: string): Promise<PutDeployResult>;
  /**
   * Parses query balance options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing query balance options to be parsed.
   *
   * # Returns
   *
   * Parsed query balance options as a `QueryBalanceDetailsOptions` struct.
   */
  query_balance_details_options(options: any): queryBalanceDetailsOptions;
  /**
   * Retrieves balance information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `QueryBalanceDetailsOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `QueryBalanceDetailsResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  query_balance_details(options?: queryBalanceDetailsOptions): Promise<QueryBalanceDetailsResult>;
  /**
   * Get options for speculative execution from a JavaScript value.
   */
  get_speculative_exec_options(options: any): getSpeculativeExecTxnOptions;
  /**
   * JS function for speculative execution.
   *
   * # Arguments
   *
   * * `options` - The options for speculative execution.
   *
   * # Returns
   *
   * A `Result` containing the result of the speculative execution or a `JsError` in case of an error.
   */
  speculative_exec(options?: getSpeculativeExecTxnOptions): Promise<SpeculativeExecTxnResult>;
  /**
   * JavaScript function for transactioning with deserialized parameters.
   *
   * # Arguments
   *
   * * `transaction_params` - Transaction parameters.
   * * `builder_params` - Session parameters.
   * * `verbosity` - An optional verbosity level.
   * * `rpc_address` - An optional rpc address.
   *
   * # Returns
   *
   * A result containing PutTransactionResult or a JsError.
   */
  transaction(builder_params: TransactionBuilderParams, transaction_params: TransactionStrParams, verbosity?: Verbosity, rpc_address?: string): Promise<PutTransactionResult>;
  /**
   * JS function for `sign_transaction`.
   *
   * # Arguments
   *
   * * `transaction` - The transaction to sign.
   * * `secret_key` - The secret key for signing.
   *
   * # Returns
   *
   * The signed `Transaction`.
   */
  sign_transaction(transaction: Transaction, secret_key: string): Transaction;
  /**
   * Calls a smart contract entry point with the specified parameters and returns the result.
   *
   * # Arguments
   *
   * * `deploy_params` - The deploy parameters.
   * * `session_params` - The session parameters.
   * * `payment_amount` - The payment amount as a string.
   * * `rpc_address` - An optional rpc address to send the request to.
   *
   * # Returns
   *
   * A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the call.
   */
  call_entrypoint_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_amount: string, rpc_address?: string): Promise<PutDeployResult>;
  /**
   * JS function for speculative transfer.
   *
   * # Arguments
   *
   * * `amount` - The amount to transfer.
   * * `target_account` - The target account.
   * * `transfer_id` - An optional transfer ID (defaults to a random number).
   * * `deploy_params` - The deployment parameters.
   * * `payment_params` - The payment parameters.
   * * `verbosity` - The verbosity level for logging (optional).
   * * `rpc_address` - The address of the node to connect to (optional).
   *
   * # Returns
   *
   * A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
   */
  speculative_transfer(amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams, verbosity?: Verbosity, rpc_address?: string): Promise<SpeculativeExecResult>;
  /**
   * JS function for speculative transfer transaction.
   *
   * # Arguments
   *
   * * `maybe_source` - Optional transfer source uref.
   * * `target_account` - The target account.
   * * `amount` - The amount to transfer.
   * * `maybe_id` - An optional transfer ID (defaults to a random number).
   * * `transaction_params` - The transactionment parameters.
   * * `verbosity` - The verbosity level for logging (optional).
   * * `rpc_address` - The address of the node to connect to (optional).
   *
   * # Returns
   *
   * A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
   */
  speculative_transfer_transaction(maybe_source: URef | undefined, target_account: string, amount: string, transaction_params: TransactionStrParams, maybe_id?: string, verbosity?: Verbosity, rpc_address?: string): Promise<SpeculativeExecTxnResult>;
  /**
   * Installs a smart contract with the specified parameters and returns the result.
   *
   * # Arguments
   *
   * * `deploy_params` - The deploy parameters.
   * * `session_params` - The session parameters.
   * * `payment_amount` - The payment amount as a string.
   * * `rpc_address` - An optional rpc address to send the request to.
   *
   * # Returns
   *
   * A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the installation.
   */
  install_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_amount: string, rpc_address?: string): Promise<PutDeployResult>;
}
export class SessionStrParams {
  free(): void;
  constructor(session_hash?: string, session_name?: string, session_package_hash?: string, session_package_name?: string, session_path?: string, session_bytes?: Bytes, session_args_simple?: Array<any>, session_args_json?: string, session_version?: string, session_entry_point?: string, is_session_transfer?: boolean);
  get session_hash(): string | undefined;
  set session_hash(value: string);
  get session_name(): string | undefined;
  set session_name(value: string);
  get session_package_hash(): string | undefined;
  set session_package_hash(value: string);
  get session_package_name(): string | undefined;
  set session_package_name(value: string);
  get session_path(): string | undefined;
  set session_path(value: string);
  get session_bytes(): Bytes | undefined;
  set session_bytes(value: Bytes);
  get session_args_simple(): ArgsSimple | undefined;
  set session_args_simple(value: Array<any>);
  get session_args_json(): string | undefined;
  set session_args_json(value: string);
  get session_version(): string | undefined;
  set session_version(value: string);
  get session_entry_point(): string | undefined;
  set session_entry_point(value: string);
  get is_session_transfer(): boolean | undefined;
  set is_session_transfer(value: boolean);
}
export class SignatureResponse {
  private constructor();
  free(): void;
  is_cancelled(): boolean;
  get_signature_hex(): string;
  get_signature(): Uint8Array;
}
export class SpeculativeExecResult {
  private constructor();
  free(): void;
  /**
   * Convert the result to JSON format.
   */
  toJson(): any;
  /**
   * Get the API version of the result.
   */
  readonly api_version: any;
  /**
   * Get the block hash.
   */
  readonly block_hash: BlockHash;
  /**
   * Get the execution result.
   */
  readonly execution_result: any;
}
export class SpeculativeExecTxnResult {
  private constructor();
  free(): void;
  /**
   * Convert the result to JSON format.
   */
  toJson(): any;
  /**
   * Get the API version of the result.
   */
  readonly api_version: any;
  /**
   * Get the block hash.
   */
  readonly block_hash: BlockHash;
  /**
   * Get the execution result.
   */
  readonly execution_result: any;
}
/**
 * Represents a subscription to transaction events for wasm32 target architecture.
 */
export class Subscription {
  free(): void;
  /**
   * Constructor for Subscription for wasm32 target architecture.
   *
   * # Arguments
   *
   * * `transaction_hash` - Transaction hash to identify the subscription.
   * * `event_handler_fn` - Handler function for transaction events.
   */
  constructor(target_hash: string, event_handler_fn: Function);
  /**
   * Transaction target hash to identify the subscription.
   */
  targetHash: string;
  /**
   * Handler function for transaction events.
   */
  eventHandlerFn: Function;
}
export class Transaction {
  free(): void;
  constructor(transaction: any);
  toJson(): any;
  static newSession(builder_params: TransactionBuilderParams, transaction_params: TransactionStrParams): Transaction;
  static newTransfer(maybe_source: URef | undefined, target_account: string, amount: string, transaction_params: TransactionStrParams, maybe_id?: string): Transaction;
  withTTL(ttl: string, secret_key?: string): Transaction;
  withTimestamp(timestamp: string, secret_key?: string): Transaction;
  withChainName(chain_name: string, secret_key?: string): Transaction;
  withPublicKey(public_key: PublicKey, secret_key?: string): Transaction;
  withAccountHash(account_hash: AccountHash, secret_key?: string): Transaction;
  withEntryPoint(entry_point: string, secret_key?: string): Transaction;
  withEntityHash(hash: AddressableEntityHash, secret_key?: string): Transaction;
  withPackageHash(package_hash: PackageHash, secret_key?: string): Transaction;
  withTransactionBytes(transaction_bytes: Bytes, is_install_upgrade?: boolean, secret_key?: string): Transaction;
  withSecretKey(secret_key?: string): Transaction;
  verify(): boolean;
  sign(secret_key: string): Transaction;
  approvalsHash(): any;
  session_args(): any;
  addSignature(public_key: string, signature: string): Transaction;
  addArg(js_value_arg: any, secret_key?: string): Transaction;
  readonly hash: TransactionHash;
  readonly expired: boolean;
  readonly expires: any;
  readonly signers: any;
  readonly authorization_keys: any;
  readonly approvals: any;
  readonly is_native: boolean;
  readonly target: any;
  readonly is_standard_payment: boolean;
  readonly entry_point: string;
  readonly ttl: string;
  readonly timestamp: string;
  readonly size_estimate: number;
  readonly chain_name: string;
  readonly initiator_addr: string;
  readonly pricing_mode: PricingMode;
  readonly additional_computation_factor: number;
  readonly receipt: Digest;
  readonly gas_price_tolerance: number;
  readonly account_hash: AccountHash;
}
export class TransactionBuilderParams {
  private constructor();
  free(): void;
  static newSession(transaction_bytes?: Bytes, is_install_upgrade?: boolean): TransactionBuilderParams;
  static newTransfer(maybe_source: URef | undefined, target: TransferTarget, amount: string, maybe_id?: bigint): TransactionBuilderParams;
  static newInvocableEntity(entity_hash: AddressableEntityHash, entry_point: string): TransactionBuilderParams;
  static newInvocableEntityAlias(entity_alias: string, entry_point: string): TransactionBuilderParams;
  static newPackage(package_hash: PackageHash, entry_point: string, maybe_entity_version?: string): TransactionBuilderParams;
  static newPackageAlias(package_alias: string, entry_point: string, maybe_entity_version?: string): TransactionBuilderParams;
  static newAddBid(public_key: PublicKey, delegation_rate: number, amount: string, minimum_delegation_amount?: bigint, maximum_delegation_amount?: bigint, reserved_slots?: number): TransactionBuilderParams;
  static newDelegate(delegator: PublicKey, validator: PublicKey, amount: string): TransactionBuilderParams;
  static newUndelegate(delegator: PublicKey, validator: PublicKey, amount: string): TransactionBuilderParams;
  static newRedelegate(delegator: PublicKey, validator: PublicKey, new_validator: PublicKey, amount: string): TransactionBuilderParams;
  static newWithdrawBid(public_key: PublicKey, amount: string): TransactionBuilderParams;
  kind: TransactionKind;
  get transaction_bytes(): Bytes | undefined;
  set transaction_bytes(value: Bytes);
  get maybe_source(): URef | undefined;
  set maybe_source(value: URef);
  get target(): TransferTarget | undefined;
  set target(value: TransferTarget);
  get amount(): string | undefined;
  set amount(value: string);
  get maybe_id(): bigint | undefined;
  set maybe_id(value: bigint);
  get entity_hash(): AddressableEntityHash | undefined;
  set entity_hash(value: AddressableEntityHash);
  get entity_alias(): string | undefined;
  set entity_alias(value: string);
  get entry_point(): string | undefined;
  set entry_point(value: string);
  get package_hash(): PackageHash | undefined;
  set package_hash(value: PackageHash);
  get package_alias(): string | undefined;
  set package_alias(value: string);
  get public_key(): PublicKey | undefined;
  set public_key(value: PublicKey);
  get delegation_rate(): number | undefined;
  set delegation_rate(value: number);
  get delegator(): PublicKey | undefined;
  set delegator(value: PublicKey);
  get validator(): PublicKey | undefined;
  set validator(value: PublicKey);
  get new_validator(): PublicKey | undefined;
  set new_validator(value: PublicKey);
  minimum_delegation_amount?: bigint;
  maximum_delegation_amount?: bigint;
  get is_install_upgrade(): boolean | undefined;
  set is_install_upgrade(value: boolean);
}
export class TransactionHash {
  free(): void;
  constructor(transaction_hash_hex_str: string);
  static fromRaw(bytes: Uint8Array): TransactionHash;
  digest(): Digest;
  toJson(): any;
  toString(): string;
}
/**
 * Represents processed deploy information.
 */
export class TransactionProcessed {
  private constructor();
  free(): void;
  hash: HashString;
  initiator_addr: PublicKeyString;
  timestamp: string;
  ttl: string;
  block_hash: string;
  /**
   * Result of the execution, either Success or Failure.
   */
  execution_result: ExecutionResult;
  messages: (Messages)[];
}
export class TransactionStrParams {
  free(): void;
  constructor(chain_name: string, initiator_addr?: string, secret_key?: string, timestamp?: string, ttl?: string, session_args_simple?: (string)[], session_args_json?: string, pricing_mode?: PricingMode, additional_computation_factor?: string, payment_amount?: string, gas_price_tolerance?: string, receipt?: string, standard_payment?: boolean, transferred_value?: string, session_entry_point?: string, chunked_args?: Bytes);
  static new_with_defaults(chain_name: string, initiator_addr?: string, secret_key?: string, ttl?: string): TransactionStrParams;
  setDefaultTimestamp(): void;
  setDefaultTTL(): void;
  get secret_key(): string | undefined;
  set secret_key(value: string);
  timestamp?: string;
  ttl?: string;
  get chain_name(): string | undefined;
  set chain_name(value: string);
  get initiator_addr(): string | undefined;
  set initiator_addr(value: string);
  get session_args_simple(): ArgsSimple | undefined;
  set session_args_simple(value: (string)[]);
  get session_args_json(): string | undefined;
  set session_args_json(value: string);
  get pricing_mode(): PricingMode | undefined;
  set pricing_mode(value: PricingMode);
  get additional_computation_factor(): string | undefined;
  set additional_computation_factor(value: string);
  get payment_amount(): string | undefined;
  set payment_amount(value: string);
  get gas_price_tolerance(): string | undefined;
  set gas_price_tolerance(value: string);
  get receipt(): string | undefined;
  set receipt(value: string);
  get standard_payment(): boolean | undefined;
  set standard_payment(value: boolean);
  get transferred_value(): string | undefined;
  set transferred_value(value: string);
  get session_entry_point(): string | undefined;
  set session_entry_point(value: string);
  get chunked_args(): Bytes | undefined;
  set chunked_args(value: Bytes);
}
export class TransferAddr {
  free(): void;
  constructor(bytes: Uint8Array);
}
export class TransferTarget {
  free(): void;
  constructor(kind: TransferTargetKind, public_key?: PublicKey, account_hash?: AccountHash, uref?: URef);
}
export class URef {
  free(): void;
  constructor(uref_hex_str: string, access_rights: number);
  static fromFormattedStr(formatted_str: string): URef;
  static fromUint8Array(bytes: Uint8Array, access_rights: number): URef;
  toFormattedString(): string;
  toJson(): any;
}
export class URefAddr {
  free(): void;
  constructor(bytes: Uint8Array);
}
/**
 * Represents a success response containing a cost value.
 */
export class Version2 {
  private constructor();
  free(): void;
  initiator: PublicKeyString;
  error_message?: string;
  limit: string;
  consumed: string;
  cost: string;
}
/**
 * Represents a deploy watcher responsible for monitoring transaction events.
 *
 * This struct allows clients to subscribe to transaction events, start watching for events,
 * or wait for an event and handle the received deploy event data.
 *
 * # Fields
 *
 * * `events_url` - The URL for transaction events.
 * * `subscriptions` - Vector containing deploy subscriptions.
 * * `active` - Reference-counted cell indicating whether the deploy watcher is active.
 * * `timeout_duration` - Duration representing the optional timeout for watching events.
 */
export class Watcher {
  free(): void;
  /**
   * Creates a new `Watcher` instance.
   *
   * # Arguments
   *
   * * `events_url` - The URL for transaction events.
   * * `timeout_duration` - Optional duration in milliseconds for watching events. If not provided,
   *   a default timeout of 60,000 milliseconds (1 minute) is used.
   *
   * # Returns
   *
   * A new `Watcher` instance.
   */
  constructor(events_url: string, timeout_duration?: bigint);
  /**
   * Subscribes to transaction events.
   *
   * # Arguments
   *
   * * `subscriptions` - Vector of deploy subscriptions to be added.
   *
   * # Returns
   *
   * Result indicating success or an error message.
   */
  subscribe(subscriptions: (Subscription)[]): void;
  /**
   * Unsubscribes from transaction events based on the provided transaction hash.
   *
   * # Arguments
   *
   * * `transaction_hash` - The transaction hash to unsubscribe.
   *
   * This method removes the deploy subscription associated with the provided transaction hash.
   */
  unsubscribe(target_hash: string): void;
  /**
   * Starts watching for transaction events (JavaScript-friendly).
   *
   * # Returns
   *
   * Result containing the serialized transaction events data or an error message.
   */
  start(): Promise<any>;
  /**
   * Stops watching for transaction events.
   *
   * This method sets the deploy watcher as inactive and stops the event listener if it exists.
   */
  stop(): void;
}
export class getAccountOptions {
  private constructor();
  free(): void;
  account_identifier?: AccountIdentifier;
  account_identifier_as_string?: string;
  maybe_block_id_as_string?: string;
  maybe_block_identifier?: BlockIdentifier;
  rpc_address?: string;
  verbosity?: Verbosity;
}
/**
 * Options for the `get_auction_info` method.
 */
export class getAuctionInfoOptions {
  private constructor();
  free(): void;
  maybe_block_id_as_string?: string;
  maybe_block_identifier?: BlockIdentifier;
  rpc_address?: string;
  verbosity?: Verbosity;
}
/**
 * Options for the `get_balance` method.
 */
export class getBalanceOptions {
  private constructor();
  free(): void;
  state_root_hash_as_string?: string;
  state_root_hash?: Digest;
  purse_uref_as_string?: string;
  purse_uref?: URef;
  rpc_address?: string;
  verbosity?: Verbosity;
}
/**
 * Options for the `get_block` method.
 */
export class getBlockOptions {
  private constructor();
  free(): void;
  maybe_block_id_as_string?: string;
  maybe_block_identifier?: BlockIdentifier;
  rpc_address?: string;
  verbosity?: Verbosity;
}
/**
 * Options for the `get_block_transfers` method.
 */
export class getBlockTransfersOptions {
  private constructor();
  free(): void;
  maybe_block_id_as_string?: string;
  maybe_block_identifier?: BlockIdentifier;
  verbosity?: Verbosity;
  rpc_address?: string;
}
/**
 * Options for the `get_deploy` method.
 */
export class getDeployOptions {
  private constructor();
  free(): void;
  deploy_hash_as_string?: string;
  deploy_hash?: DeployHash;
  finalized_approvals?: boolean;
  rpc_address?: string;
  verbosity?: Verbosity;
}
/**
 * Options for the `get_dictionary_item` method.
 */
export class getDictionaryItemOptions {
  private constructor();
  free(): void;
  state_root_hash_as_string?: string;
  state_root_hash?: Digest;
  dictionary_item_params?: DictionaryItemStrParams;
  dictionary_item_identifier?: DictionaryItemIdentifier;
  rpc_address?: string;
  verbosity?: Verbosity;
}
export class getEntityOptions {
  private constructor();
  free(): void;
  entity_identifier?: EntityIdentifier;
  entity_identifier_as_string?: string;
  maybe_block_id_as_string?: string;
  maybe_block_identifier?: BlockIdentifier;
  rpc_address?: string;
  verbosity?: Verbosity;
}
export class getEraInfoOptions {
  private constructor();
  free(): void;
  maybe_block_id_as_string?: string;
  maybe_block_identifier?: BlockIdentifier;
  rpc_address?: string;
  verbosity?: Verbosity;
}
/**
 * Options for the `get_era_summary` method.
 */
export class getEraSummaryOptions {
  private constructor();
  free(): void;
  maybe_block_id_as_string?: string;
  maybe_block_identifier?: BlockIdentifier;
  rpc_address?: string;
  verbosity?: Verbosity;
}
/**
 * Options for speculative execution.
 */
export class getSpeculativeExecDeployOptions {
  private constructor();
  free(): void;
  /**
   * The deploy as a JSON string.
   */
  deploy_as_string?: string;
  /**
   * The deploy to execute.
   */
  deploy?: Deploy;
  /**
   * The rpc address.
   */
  rpc_address?: string;
  /**
   * The verbosity level for logging.
   */
  verbosity?: Verbosity;
}
/**
 * Options for speculative execution.
 */
export class getSpeculativeExecTxnOptions {
  private constructor();
  free(): void;
  /**
   * The transaction as a JSON string.
   */
  transaction_as_string?: string;
  /**
   * The transaction to execute.
   */
  transaction?: Transaction;
  /**
   * The rpc address.
   */
  rpc_address?: string;
  /**
   * The verbosity level for logging.
   */
  verbosity?: Verbosity;
}
/**
 * Options for the `get_state_root_hash` method.
 */
export class getStateRootHashOptions {
  private constructor();
  free(): void;
  maybe_block_id_as_string?: string;
  maybe_block_identifier?: BlockIdentifier;
  rpc_address?: string;
  verbosity?: Verbosity;
}
/**
 * Options for the `get_transaction` method.
 */
export class getTransactionOptions {
  private constructor();
  free(): void;
  transaction_hash_as_string?: string;
  transaction_hash?: TransactionHash;
  finalized_approvals?: boolean;
  rpc_address?: string;
  verbosity?: Verbosity;
}
/**
 * Options for the `query_balance` method.
 */
export class queryBalanceDetailsOptions {
  private constructor();
  free(): void;
  purse_identifier_as_string?: string;
  purse_identifier?: PurseIdentifier;
  global_state_identifier?: GlobalStateIdentifier;
  state_root_hash_as_string?: string;
  state_root_hash?: Digest;
  maybe_block_id_as_string?: string;
  rpc_address?: string;
  verbosity?: Verbosity;
}
/**
 * Options for the `query_balance` method.
 */
export class queryBalanceOptions {
  private constructor();
  free(): void;
  purse_identifier_as_string?: string;
  purse_identifier?: PurseIdentifier;
  global_state_identifier?: GlobalStateIdentifier;
  state_root_hash_as_string?: string;
  state_root_hash?: Digest;
  maybe_block_id_as_string?: string;
  rpc_address?: string;
  verbosity?: Verbosity;
}
export class queryContractDictOptions {
  private constructor();
  free(): void;
  state_root_hash_as_string?: string;
  state_root_hash?: Digest;
  dictionary_item_params?: DictionaryItemStrParams;
  dictionary_item_identifier?: DictionaryItemIdentifier;
  rpc_address?: string;
  verbosity?: Verbosity;
}
export class queryContractKeyOptions {
  private constructor();
  free(): void;
  entity_identifier?: EntityIdentifier;
  entity_identifier_as_string?: string;
  maybe_block_identifier?: BlockIdentifier;
  maybe_block_id_as_string?: string;
  path_as_string?: string;
  path?: Path;
  rpc_address?: string;
  verbosity?: Verbosity;
}
/**
 * Options for the `query_global_state` method.
 */
export class queryGlobalStateOptions {
  private constructor();
  free(): void;
  global_state_identifier?: GlobalStateIdentifier;
  state_root_hash_as_string?: string;
  state_root_hash?: Digest;
  maybe_block_id_as_string?: string;
  key_as_string?: string;
  key?: Key;
  path_as_string?: string;
  path?: Path;
  rpc_address?: string;
  verbosity?: Verbosity;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_dictionaryaddr_free: (a: number, b: number) => void;
  readonly dictionaryaddr_new: (a: number, b: number) => [number, number, number];
  readonly __wbg_paymentstrparams_free: (a: number, b: number) => void;
  readonly paymentstrparams_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number) => number;
  readonly paymentstrparams_payment_amount: (a: number) => [number, number];
  readonly paymentstrparams_set_payment_amount: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_hash: (a: number) => [number, number];
  readonly paymentstrparams_set_payment_hash: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_name: (a: number) => [number, number];
  readonly paymentstrparams_set_payment_name: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_package_hash: (a: number) => [number, number];
  readonly paymentstrparams_set_payment_package_hash: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_package_name: (a: number) => [number, number];
  readonly paymentstrparams_set_payment_package_name: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_path: (a: number) => [number, number];
  readonly paymentstrparams_set_payment_path: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_args_simple: (a: number) => any;
  readonly paymentstrparams_set_payment_args_simple: (a: number, b: any) => void;
  readonly paymentstrparams_payment_args_json: (a: number) => [number, number];
  readonly paymentstrparams_set_payment_args_json: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_version: (a: number) => [number, number];
  readonly paymentstrparams_set_payment_version: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_entry_point: (a: number) => [number, number];
  readonly paymentstrparams_set_payment_entry_point: (a: number, b: number, c: number) => void;
  readonly __wbg_getauctioninforesult_free: (a: number, b: number) => void;
  readonly getauctioninforesult_api_version: (a: number) => any;
  readonly getauctioninforesult_auction_state: (a: number) => any;
  readonly getauctioninforesult_toJson: (a: number) => any;
  readonly __wbg_getauctioninfooptions_free: (a: number, b: number) => void;
  readonly __wbg_get_getauctioninfooptions_maybe_block_id_as_string: (a: number) => [number, number];
  readonly __wbg_set_getauctioninfooptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getauctioninfooptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_getauctioninfooptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getauctioninfooptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_set_getauctioninfooptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getauctioninfooptions_verbosity: (a: number) => number;
  readonly __wbg_set_getauctioninfooptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_auction_info_options: (a: number, b: any) => [number, number, number];
  readonly sdk_get_auction_info: (a: number, b: number) => any;
  readonly sdk_state_get_auction_info_js_alias: (a: number, b: number) => any;
  readonly __wbg_geterainforesult_free: (a: number, b: number) => void;
  readonly geterainforesult_api_version: (a: number) => any;
  readonly geterainforesult_era_summary: (a: number) => any;
  readonly geterainforesult_toJson: (a: number) => any;
  readonly sdk_get_era_info_options: (a: number, b: any) => [number, number, number];
  readonly sdk_get_era_info: (a: number, b: number) => any;
  readonly sdk_chain_get_era_info_by_switch_block: (a: number, b: number) => any;
  readonly __wbg_getpeersresult_free: (a: number, b: number) => void;
  readonly getpeersresult_api_version: (a: number) => any;
  readonly getpeersresult_peers: (a: number) => any;
  readonly getpeersresult_toJson: (a: number) => any;
  readonly sdk_get_peers: (a: number, b: number, c: number, d: number) => any;
  readonly sdk_info_get_peers: (a: number, b: number, c: number, d: number) => any;
  readonly __wbg_getvalidatorchangesresult_free: (a: number, b: number) => void;
  readonly getvalidatorchangesresult_api_version: (a: number) => any;
  readonly getvalidatorchangesresult_changes: (a: number) => any;
  readonly getvalidatorchangesresult_toJson: (a: number) => any;
  readonly sdk_get_validator_changes: (a: number, b: number, c: number, d: number) => any;
  readonly sdk_info_get_validator_change: (a: number, b: number, c: number, d: number) => any;
  readonly __wbg_listrpcsresult_free: (a: number, b: number) => void;
  readonly listrpcsresult_api_version: (a: number) => any;
  readonly listrpcsresult_name: (a: number) => [number, number];
  readonly listrpcsresult_schema: (a: number) => any;
  readonly listrpcsresult_toJson: (a: number) => any;
  readonly sdk_list_rpcs: (a: number, b: number, c: number, d: number) => any;
  readonly __wbg_querycontractkeyoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_querycontractkeyoptions_entity_identifier: (a: number) => number;
  readonly __wbg_set_querycontractkeyoptions_entity_identifier: (a: number, b: number) => void;
  readonly __wbg_get_querycontractkeyoptions_entity_identifier_as_string: (a: number) => [number, number];
  readonly __wbg_set_querycontractkeyoptions_entity_identifier_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querycontractkeyoptions_maybe_block_id_as_string: (a: number) => [number, number];
  readonly __wbg_set_querycontractkeyoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querycontractkeyoptions_path_as_string: (a: number) => [number, number];
  readonly __wbg_set_querycontractkeyoptions_path_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querycontractkeyoptions_path: (a: number) => number;
  readonly __wbg_set_querycontractkeyoptions_path: (a: number, b: number) => void;
  readonly __wbg_get_querycontractkeyoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_set_querycontractkeyoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querycontractkeyoptions_verbosity: (a: number) => number;
  readonly __wbg_set_querycontractkeyoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_query_contract_key_options: (a: number, b: any) => [number, number, number];
  readonly sdk_query_contract_key: (a: number, b: number) => any;
  readonly __wbg_get_geterainfooptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_get_querycontractkeyoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_geterainfooptions_verbosity: (a: number, b: number) => void;
  readonly __wbg_set_geterainfooptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_geterainfooptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_geterainfooptions_maybe_block_id_as_string: (a: number) => [number, number];
  readonly __wbg_get_geterainfooptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_get_geterainfooptions_verbosity: (a: number) => number;
  readonly __wbg_set_geterainfooptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_set_querycontractkeyoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_geterainfooptions_free: (a: number, b: number) => void;
  readonly __wbg_path_free: (a: number, b: number) => void;
  readonly path_new: (a: any) => number;
  readonly path_fromArray: (a: any) => number;
  readonly path_toJson: (a: number) => any;
  readonly path_toString: (a: number) => [number, number];
  readonly path_is_empty: (a: number) => number;
  readonly __wbg_deploy_free: (a: number, b: number) => void;
  readonly deploy_new: (a: any) => number;
  readonly deploy_toJson: (a: number) => any;
  readonly deploy_withPaymentAndSession: (a: number, b: number, c: number) => [number, number, number];
  readonly deploy_withTransfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => [number, number, number];
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
  readonly deploy_withPayment: (a: number, b: any, c: number, d: number) => number;
  readonly deploy_withSession: (a: number, b: any, c: number, d: number) => number;
  readonly deploy_validateDeploySize: (a: number) => number;
  readonly deploy_isValid: (a: number) => number;
  readonly deploy_hash: (a: number) => number;
  readonly deploy_hasValidHash: (a: number) => number;
  readonly deploy_isExpired: (a: number) => number;
  readonly deploy_sign: (a: number, b: number, c: number) => number;
  readonly deploy_approvalsHash: (a: number) => any;
  readonly deploy_approvals: (a: number) => any;
  readonly deploy_isTransfer: (a: number) => number;
  readonly deploy_isStandardPayment: (a: number, b: number) => number;
  readonly deploy_isStoredContract: (a: number) => number;
  readonly deploy_isStoredContractPackage: (a: number) => number;
  readonly deploy_isModuleBytes: (a: number) => number;
  readonly deploy_isByName: (a: number) => number;
  readonly deploy_byName: (a: number) => [number, number];
  readonly deploy_entryPointName: (a: number) => [number, number];
  readonly deploy_addSignature: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly deploy_TTL: (a: number) => [number, number];
  readonly deploy_timestamp: (a: number) => [number, number];
  readonly deploy_chainName: (a: number) => [number, number];
  readonly deploy_account: (a: number) => [number, number];
  readonly deploy_paymentAmount: (a: number, b: number) => [number, number];
  readonly deploy_args: (a: number) => any;
  readonly deploy_addArg: (a: number, b: any, c: number, d: number) => [number, number, number];
  readonly __wbg_addressableentityhash_free: (a: number, b: number) => void;
  readonly addressableentityhash_new_js_alias: (a: number, b: number) => [number, number, number];
  readonly addressableentityhash_fromFormattedStr: (a: number, b: number) => [number, number, number];
  readonly addressableentityhash_toFormattedString: (a: number) => [number, number];
  readonly addressableentityhash_fromUint8Array: (a: number, b: number) => number;
  readonly __wbg_contractpackagehash_free: (a: number, b: number) => void;
  readonly contractpackagehash_new_js_alias: (a: number, b: number) => [number, number, number];
  readonly contractpackagehash_fromFormattedStr: (a: number, b: number) => [number, number, number];
  readonly contractpackagehash_toFormattedString: (a: number) => [number, number];
  readonly contractpackagehash_fromUint8Array: (a: number, b: number) => number;
  readonly __wbg_blockidentifier_free: (a: number, b: number) => void;
  readonly blockidentifier_new: (a: number) => number;
  readonly blockidentifier_from_hash: (a: number) => number;
  readonly blockidentifier_fromHeight: (a: bigint) => number;
  readonly blockidentifier_toJson: (a: number) => any;
  readonly __wbg_dictionaryitemidentifier_free: (a: number, b: number) => void;
  readonly dictionaryitemidentifier_newFromAccountInfo: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number];
  readonly dictionaryitemidentifier_newFromContractInfo: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number];
  readonly dictionaryitemidentifier_newFromEntityInfo: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number];
  readonly dictionaryitemidentifier_newFromSeedUref: (a: number, b: number, c: number, d: number) => [number, number, number];
  readonly dictionaryitemidentifier_newFromDictionaryKey: (a: number, b: number) => [number, number, number];
  readonly dictionaryitemidentifier_toJson: (a: number) => any;
  readonly __wbg_key_free: (a: number, b: number) => void;
  readonly key_new: (a: number) => [number, number, number];
  readonly key_toJson: (a: number) => any;
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
  readonly key_fromSystemEntityRegistry: () => number;
  readonly key_fromEraSummary: () => number;
  readonly key_fromUnbond: (a: number) => number;
  readonly key_fromChainspecRegistry: () => number;
  readonly key_fromChecksumRegistry: () => number;
  readonly key_toFormattedString: (a: number) => [number, number];
  readonly key_fromFormattedString: (a: number, b: number) => [number, number, number];
  readonly key_fromDictionaryKey: (a: number, b: number, c: number) => number;
  readonly key_isDictionaryKey: (a: number) => number;
  readonly key_intoAccount: (a: number) => number;
  readonly key_intoHash: (a: number) => number;
  readonly key_asBalance: (a: number) => number;
  readonly key_intoURef: (a: number) => number;
  readonly key_urefToHash: (a: number) => number;
  readonly key_withdrawToUnbond: (a: number) => number;
  readonly __wbg_transfertarget_free: (a: number, b: number) => void;
  readonly transfertarget_new: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_transactionbuilderparams_free: (a: number, b: number) => void;
  readonly transactionbuilderparams_newSession: (a: number, b: number) => number;
  readonly transactionbuilderparams_newTransfer: (a: number, b: number, c: number, d: number, e: number, f: bigint) => number;
  readonly transactionbuilderparams_newInvocableEntity: (a: number, b: number, c: number) => number;
  readonly transactionbuilderparams_newInvocableEntityAlias: (a: number, b: number, c: number, d: number) => number;
  readonly transactionbuilderparams_newPackage: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly transactionbuilderparams_newPackageAlias: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly transactionbuilderparams_newAddBid: (a: number, b: number, c: number, d: number, e: number, f: bigint, g: number, h: bigint, i: number) => number;
  readonly transactionbuilderparams_newDelegate: (a: number, b: number, c: number, d: number) => number;
  readonly transactionbuilderparams_newUndelegate: (a: number, b: number, c: number, d: number) => number;
  readonly transactionbuilderparams_newRedelegate: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly transactionbuilderparams_newWithdrawBid: (a: number, b: number, c: number) => number;
  readonly transactionbuilderparams_kind: (a: number) => number;
  readonly transactionbuilderparams_set_kind: (a: number, b: number) => void;
  readonly transactionbuilderparams_transaction_bytes: (a: number) => number;
  readonly transactionbuilderparams_set_transaction_bytes: (a: number, b: number) => void;
  readonly transactionbuilderparams_maybe_source: (a: number) => number;
  readonly transactionbuilderparams_set_maybe_source: (a: number, b: number) => void;
  readonly transactionbuilderparams_target: (a: number) => number;
  readonly transactionbuilderparams_set_target: (a: number, b: number) => void;
  readonly transactionbuilderparams_amount: (a: number) => [number, number];
  readonly transactionbuilderparams_set_amount: (a: number, b: number, c: number) => void;
  readonly transactionbuilderparams_maybe_id: (a: number) => [number, bigint];
  readonly transactionbuilderparams_set_maybe_id: (a: number, b: bigint) => void;
  readonly transactionbuilderparams_entity_hash: (a: number) => number;
  readonly transactionbuilderparams_set_entity_hash: (a: number, b: number) => void;
  readonly transactionbuilderparams_entity_alias: (a: number) => [number, number];
  readonly transactionbuilderparams_set_entity_alias: (a: number, b: number, c: number) => void;
  readonly transactionbuilderparams_entry_point: (a: number) => [number, number];
  readonly transactionbuilderparams_set_entry_point: (a: number, b: number, c: number) => void;
  readonly transactionbuilderparams_package_hash: (a: number) => number;
  readonly transactionbuilderparams_set_package_hash: (a: number, b: number) => void;
  readonly transactionbuilderparams_package_alias: (a: number) => [number, number];
  readonly transactionbuilderparams_set_package_alias: (a: number, b: number, c: number) => void;
  readonly transactionbuilderparams_public_key: (a: number) => number;
  readonly transactionbuilderparams_set_public_key: (a: number, b: number) => void;
  readonly transactionbuilderparams_delegation_rate: (a: number) => number;
  readonly transactionbuilderparams_set_delegation_rate: (a: number, b: number) => void;
  readonly transactionbuilderparams_delegator: (a: number) => number;
  readonly transactionbuilderparams_set_delegator: (a: number, b: number) => void;
  readonly transactionbuilderparams_validator: (a: number) => number;
  readonly transactionbuilderparams_set_validator: (a: number, b: number) => void;
  readonly transactionbuilderparams_new_validator: (a: number) => number;
  readonly transactionbuilderparams_set_new_validator: (a: number, b: number) => void;
  readonly transactionbuilderparams_minimum_delegation_amount: (a: number) => [number, bigint];
  readonly transactionbuilderparams_set_minimum_delegation_amount: (a: number, b: number, c: bigint) => void;
  readonly transactionbuilderparams_maximum_delegation_amount: (a: number) => [number, bigint];
  readonly transactionbuilderparams_set_maximum_delegation_amount: (a: number, b: number, c: bigint) => void;
  readonly transactionbuilderparams_is_install_upgrade: (a: number) => number;
  readonly transactionbuilderparams_set_is_install_upgrade: (a: number, b: number) => void;
  readonly __wbg_putdeployresult_free: (a: number, b: number) => void;
  readonly putdeployresult_api_version: (a: number) => any;
  readonly putdeployresult_deploy_hash: (a: number) => number;
  readonly putdeployresult_toJson: (a: number) => any;
  readonly sdk_deploy: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => any;
  readonly __wbg_getaccountresult_free: (a: number, b: number) => void;
  readonly getaccountresult_api_version: (a: number) => any;
  readonly getaccountresult_account: (a: number) => any;
  readonly getaccountresult_merkle_proof: (a: number) => [number, number];
  readonly getaccountresult_toJson: (a: number) => any;
  readonly __wbg_getaccountoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_getaccountoptions_account_identifier: (a: number) => number;
  readonly __wbg_set_getaccountoptions_account_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getaccountoptions_account_identifier_as_string: (a: number) => [number, number];
  readonly __wbg_set_getaccountoptions_account_identifier_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getaccountoptions_maybe_block_id_as_string: (a: number) => [number, number];
  readonly __wbg_set_getaccountoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getaccountoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_getaccountoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getaccountoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_set_getaccountoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getaccountoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getaccountoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_account_options: (a: number, b: any) => [number, number, number];
  readonly sdk_get_account: (a: number, b: number) => any;
  readonly sdk_state_get_account_info: (a: number, b: number) => any;
  readonly __wbg_getchainspecresult_free: (a: number, b: number) => void;
  readonly getchainspecresult_api_version: (a: number) => any;
  readonly getchainspecresult_chainspec_bytes: (a: number) => any;
  readonly getchainspecresult_toJson: (a: number) => any;
  readonly sdk_get_chainspec: (a: number, b: number, c: number, d: number) => any;
  readonly sdk_info_get_chainspec: (a: number, b: number, c: number, d: number) => any;
  readonly __wbg_geterasummaryresult_free: (a: number, b: number) => void;
  readonly geterasummaryresult_api_version: (a: number) => any;
  readonly geterasummaryresult_era_summary: (a: number) => any;
  readonly geterasummaryresult_toJson: (a: number) => any;
  readonly __wbg_geterasummaryoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_geterasummaryoptions_maybe_block_id_as_string: (a: number) => [number, number];
  readonly __wbg_set_geterasummaryoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_geterasummaryoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_set_geterasummaryoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_geterasummaryoptions_verbosity: (a: number) => number;
  readonly __wbg_set_geterasummaryoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_era_summary_options: (a: number, b: any) => [number, number, number];
  readonly sdk_get_era_summary: (a: number, b: number) => any;
  readonly sdk_chain_get_era_summary: (a: number, b: number) => any;
  readonly __wbg_getstateroothashresult_free: (a: number, b: number) => void;
  readonly getstateroothashresult_api_version: (a: number) => any;
  readonly getstateroothashresult_state_root_hash: (a: number) => number;
  readonly getstateroothashresult_state_root_hash_as_string: (a: number) => [number, number];
  readonly getstateroothashresult_toString: (a: number) => [number, number];
  readonly getstateroothashresult_toJson: (a: number) => any;
  readonly __wbg_getstateroothashoptions_free: (a: number, b: number) => void;
  readonly sdk_get_state_root_hash_options: (a: number, b: any) => [number, number, number];
  readonly sdk_get_state_root_hash: (a: number, b: number) => any;
  readonly sdk_chain_get_state_root_hash: (a: number, b: number) => any;
  readonly __wbg_querybalanceresult_free: (a: number, b: number) => void;
  readonly querybalanceresult_api_version: (a: number) => any;
  readonly querybalanceresult_balance: (a: number) => any;
  readonly querybalanceresult_toJson: (a: number) => any;
  readonly __wbg_querybalanceoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_querybalanceoptions_purse_identifier: (a: number) => number;
  readonly __wbg_set_querybalanceoptions_purse_identifier: (a: number, b: number) => void;
  readonly __wbg_get_querybalanceoptions_global_state_identifier: (a: number) => number;
  readonly __wbg_set_querybalanceoptions_global_state_identifier: (a: number, b: number) => void;
  readonly __wbg_get_querybalanceoptions_state_root_hash: (a: number) => number;
  readonly __wbg_set_querybalanceoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_querybalanceoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_set_querybalanceoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querybalanceoptions_verbosity: (a: number) => number;
  readonly __wbg_set_querybalanceoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_query_balance_options: (a: number, b: any) => [number, number, number];
  readonly sdk_query_balance: (a: number, b: number) => any;
  readonly __wbg_speculativeexecresult_free: (a: number, b: number) => void;
  readonly speculativeexecresult_api_version: (a: number) => any;
  readonly speculativeexecresult_block_hash: (a: number) => number;
  readonly speculativeexecresult_execution_result: (a: number) => any;
  readonly speculativeexecresult_toJson: (a: number) => any;
  readonly __wbg_getspeculativeexecdeployoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_getspeculativeexecdeployoptions_deploy_as_string: (a: number) => [number, number];
  readonly __wbg_set_getspeculativeexecdeployoptions_deploy_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getspeculativeexecdeployoptions_deploy: (a: number) => number;
  readonly __wbg_set_getspeculativeexecdeployoptions_deploy: (a: number, b: number) => void;
  readonly __wbg_get_getspeculativeexecdeployoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_set_getspeculativeexecdeployoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getspeculativeexecdeployoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getspeculativeexecdeployoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_speculative_exec_deploy_options: (a: number, b: any) => [number, number, number];
  readonly sdk_speculative_exec_deploy: (a: number, b: number) => any;
  readonly sdk_sign_deploy: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_sdk_free: (a: number, b: number) => void;
  readonly sdk_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_getRPCAddress: (a: number, b: number, c: number) => [number, number];
  readonly sdk_setRPCAddress: (a: number, b: number, c: number) => [number, number];
  readonly sdk_getNodeAddress: (a: number, b: number, c: number) => [number, number];
  readonly sdk_setNodeAddress: (a: number, b: number, c: number) => [number, number];
  readonly sdk_getVerbosity: (a: number, b: number) => number;
  readonly sdk_setVerbosity: (a: number, b: number) => [number, number];
  readonly hexToString: (a: number, b: number) => [number, number];
  readonly hexToUint8Array: (a: number, b: number) => [number, number];
  readonly uint8ArrayToBytes: (a: any) => number;
  readonly motesToCSPR: (a: number, b: number) => [number, number, number, number];
  readonly jsonPrettyPrint: (a: any, b: number) => [number, number, number];
  readonly publicKeyFromSecretKey: (a: number, b: number) => [number, number, number];
  readonly generateSecretKey: () => [number, number, number];
  readonly generateSecretKey_secp256k1: () => [number, number, number];
  readonly accountHashToBase64Key: (a: number, b: number) => [number, number, number, number];
  readonly getTimestamp: () => any;
  readonly encodeLowerBlake2b: (a: number, b: number) => any;
  readonly makeDictionaryItemKey: (a: number, b: number, c: number) => [number, number, number, number];
  readonly __wbg_get_geterasummaryoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_get_getstateroothashoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_getstateroothashoptions_verbosity: (a: number, b: number) => void;
  readonly __wbg_set_getstateroothashoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_getstateroothashoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_set_querybalanceoptions_purse_identifier_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_querybalanceoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_querybalanceoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getstateroothashoptions_maybe_block_id_as_string: (a: number) => [number, number];
  readonly __wbg_get_getstateroothashoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_get_querybalanceoptions_purse_identifier_as_string: (a: number) => [number, number];
  readonly __wbg_get_querybalanceoptions_state_root_hash_as_string: (a: number) => [number, number];
  readonly __wbg_get_querybalanceoptions_maybe_block_id_as_string: (a: number) => [number, number];
  readonly __wbg_get_getstateroothashoptions_verbosity: (a: number) => number;
  readonly __wbg_set_geterasummaryoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_set_getstateroothashoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly sdk_get_binary_latest_switch_block_header: (a: number, b: number, c: number) => any;
  readonly sdk_get_binary_latest_block_header: (a: number, b: number, c: number) => any;
  readonly sdk_get_binary_block_header_by_height: (a: number, b: bigint, c: number, d: number) => any;
  readonly sdk_get_binary_block_header_by_hash: (a: number, b: number, c: number, d: number) => any;
  readonly sdk_get_binary_latest_signed_block: (a: number, b: number, c: number) => any;
  readonly sdk_get_binary_signed_block_by_height: (a: number, b: bigint, c: number, d: number) => any;
  readonly sdk_get_binary_signed_block_by_hash: (a: number, b: number, c: number, d: number) => any;
  readonly sdk_get_binary_transaction_by_hash: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly sdk_get_binary_peers: (a: number, b: number, c: number) => any;
  readonly sdk_get_binary_uptime: (a: number, b: number, c: number) => any;
  readonly sdk_get_binary_last_progress: (a: number, b: number, c: number) => any;
  readonly sdk_get_binary_reactor_state: (a: number, b: number, c: number) => any;
  readonly sdk_get_binary_network_name: (a: number, b: number, c: number) => any;
  readonly sdk_get_binary_consensus_validator_changes: (a: number, b: number, c: number) => any;
  readonly sdk_get_binary_block_synchronizer_status: (a: number, b: number, c: number) => any;
  readonly sdk_get_binary_available_block_range: (a: number, b: number, c: number) => any;
  readonly sdk_get_binary_next_upgrade: (a: number, b: number, c: number) => any;
  readonly sdk_get_binary_consensus_status: (a: number, b: number, c: number) => any;
  readonly sdk_get_binary_chainspec_raw_bytes: (a: number, b: number, c: number) => any;
  readonly sdk_get_binary_node_status: (a: number, b: number, c: number) => any;
  readonly sdk_get_binary_validator_reward_by_era: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly sdk_get_binary_validator_reward_by_block_height: (a: number, b: number, c: bigint, d: number, e: number) => any;
  readonly sdk_get_binary_validator_reward_by_block_hash: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly sdk_get_binary_delegator_reward_by_era: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
  readonly sdk_get_binary_delegator_reward_by_block_height: (a: number, b: number, c: number, d: bigint, e: number, f: number) => any;
  readonly sdk_get_binary_delegator_reward_by_block_hash: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
  readonly sdk_get_binary_read_record: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
  readonly sdk_get_binary_global_state_item: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
  readonly sdk_get_binary_global_state_item_by_state_root_hash: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => any;
  readonly sdk_get_binary_global_state_item_by_block_hash: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => any;
  readonly sdk_get_binary_global_state_item_by_block_height: (a: number, b: bigint, c: number, d: number, e: number, f: number, g: number) => any;
  readonly sdk_get_binary_try_accept_transaction: (a: number, b: number, c: number, d: number) => any;
  readonly sdk_get_binary_try_speculative_execution: (a: number, b: number, c: number, d: number) => any;
  readonly sdk_get_binary_protocol_version: (a: number, b: number, c: number) => any;
  readonly __wbg_accessrights_free: (a: number, b: number) => void;
  readonly accessrights_NONE: () => number;
  readonly accessrights_READ: () => number;
  readonly accessrights_WRITE: () => number;
  readonly accessrights_ADD: () => number;
  readonly accessrights_READ_ADD: () => number;
  readonly accessrights_READ_WRITE: () => number;
  readonly accessrights_ADD_WRITE: () => number;
  readonly accessrights_READ_ADD_WRITE: () => number;
  readonly accessrights_new: (a: number) => [number, number, number];
  readonly accessrights_from_bits: (a: number, b: number, c: number) => number;
  readonly accessrights_is_readable: (a: number) => number;
  readonly accessrights_is_writeable: (a: number) => number;
  readonly accessrights_is_addable: (a: number) => number;
  readonly accessrights_is_none: (a: number) => number;
  readonly __wbg_transferaddr_free: (a: number, b: number) => void;
  readonly transferaddr_new: (a: number, b: number) => [number, number, number];
  readonly __wbg_urefaddr_free: (a: number, b: number) => void;
  readonly urefaddr_new: (a: number, b: number) => [number, number, number];
  readonly __wbg_peerentry_free: (a: number, b: number) => void;
  readonly peerentry_node_id: (a: number) => [number, number];
  readonly peerentry_address: (a: number) => [number, number];
  readonly __wbg_getbalanceresult_free: (a: number, b: number) => void;
  readonly getbalanceresult_api_version: (a: number) => any;
  readonly getbalanceresult_balance_value: (a: number) => any;
  readonly getbalanceresult_merkle_proof: (a: number) => [number, number];
  readonly getbalanceresult_toJson: (a: number) => any;
  readonly __wbg_getbalanceoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_getbalanceoptions_state_root_hash_as_string: (a: number) => [number, number];
  readonly __wbg_set_getbalanceoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getbalanceoptions_state_root_hash: (a: number) => number;
  readonly __wbg_set_getbalanceoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_getbalanceoptions_purse_uref_as_string: (a: number) => [number, number];
  readonly __wbg_set_getbalanceoptions_purse_uref_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getbalanceoptions_purse_uref: (a: number) => number;
  readonly __wbg_set_getbalanceoptions_purse_uref: (a: number, b: number) => void;
  readonly __wbg_get_getbalanceoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_set_getbalanceoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getbalanceoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getbalanceoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_balance_options: (a: number, b: any) => [number, number, number];
  readonly sdk_get_balance: (a: number, b: number) => any;
  readonly sdk_state_get_balance: (a: number, b: number) => any;
  readonly __wbg_getaddressableentityresult_free: (a: number, b: number) => void;
  readonly getaddressableentityresult_api_version: (a: number) => any;
  readonly getaddressableentityresult_entity_result: (a: number) => any;
  readonly getaddressableentityresult_merkle_proof: (a: number) => [number, number];
  readonly getaddressableentityresult_toJson: (a: number) => any;
  readonly __wbg_getentityoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_getentityoptions_entity_identifier: (a: number) => number;
  readonly __wbg_set_getentityoptions_entity_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getentityoptions_entity_identifier_as_string: (a: number) => [number, number];
  readonly __wbg_set_getentityoptions_entity_identifier_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getentityoptions_maybe_block_id_as_string: (a: number) => [number, number];
  readonly __wbg_set_getentityoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getentityoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_getentityoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getentityoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_set_getentityoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getentityoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getentityoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_entity_options: (a: number, b: any) => [number, number, number];
  readonly sdk_get_entity: (a: number, b: number) => any;
  readonly sdk_state_get_entity: (a: number, b: number) => any;
  readonly __wbg_queryglobalstateresult_free: (a: number, b: number) => void;
  readonly queryglobalstateresult_api_version: (a: number) => any;
  readonly queryglobalstateresult_block_header: (a: number) => any;
  readonly queryglobalstateresult_stored_value: (a: number) => any;
  readonly queryglobalstateresult_merkle_proof: (a: number) => [number, number];
  readonly queryglobalstateresult_toJson: (a: number) => any;
  readonly __wbg_queryglobalstateoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_queryglobalstateoptions_global_state_identifier: (a: number) => number;
  readonly __wbg_set_queryglobalstateoptions_global_state_identifier: (a: number, b: number) => void;
  readonly __wbg_get_queryglobalstateoptions_state_root_hash_as_string: (a: number) => [number, number];
  readonly __wbg_set_queryglobalstateoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_queryglobalstateoptions_state_root_hash: (a: number) => number;
  readonly __wbg_set_queryglobalstateoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_queryglobalstateoptions_maybe_block_id_as_string: (a: number) => [number, number];
  readonly __wbg_set_queryglobalstateoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_queryglobalstateoptions_key_as_string: (a: number) => [number, number];
  readonly __wbg_set_queryglobalstateoptions_key_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_queryglobalstateoptions_key: (a: number) => number;
  readonly __wbg_set_queryglobalstateoptions_key: (a: number, b: number) => void;
  readonly __wbg_get_queryglobalstateoptions_path_as_string: (a: number) => [number, number];
  readonly __wbg_set_queryglobalstateoptions_path_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_queryglobalstateoptions_path: (a: number) => number;
  readonly __wbg_set_queryglobalstateoptions_path: (a: number, b: number) => void;
  readonly __wbg_get_queryglobalstateoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_set_queryglobalstateoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_queryglobalstateoptions_verbosity: (a: number) => number;
  readonly __wbg_set_queryglobalstateoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_query_global_state_options: (a: number, b: any) => [number, number, number];
  readonly sdk_query_global_state: (a: number, b: number) => any;
  readonly __wbg_hashaddr_free: (a: number, b: number) => void;
  readonly hashaddr_new: (a: number, b: number) => [number, number, number];
  readonly hashaddr_toBytes: (a: number) => [number, number];
  readonly hashaddr_toHexString: (a: number) => [number, number];
  readonly __wbg_dictionaryitemstrparams_free: (a: number, b: number) => void;
  readonly dictionaryitemstrparams_new: () => number;
  readonly dictionaryitemstrparams_setAccountNamedKey: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly dictionaryitemstrparams_setContractNamedKey: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly dictionaryitemstrparams_setEntityNamedKey: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly dictionaryitemstrparams_setUref: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly dictionaryitemstrparams_setDictionary: (a: number, b: number, c: number) => void;
  readonly dictionaryitemstrparams_toJson: (a: number) => any;
  readonly __wbg_digest_free: (a: number, b: number) => void;
  readonly digest_new_js_alias: (a: number, b: number) => [number, number, number];
  readonly digest_fromString: (a: number, b: number) => [number, number, number];
  readonly digest_fromRaw: (a: number, b: number) => [number, number, number];
  readonly digest_toJson: (a: number) => any;
  readonly digest_toString: (a: number) => [number, number];
  readonly __wbg_contracthash_free: (a: number, b: number) => void;
  readonly contracthash_new_js_alias: (a: number, b: number) => [number, number, number];
  readonly contracthash_fromFormattedStr: (a: number, b: number) => [number, number, number];
  readonly contracthash_toFormattedString: (a: number) => [number, number];
  readonly contracthash_fromUint8Array: (a: number, b: number) => number;
  readonly __wbg_accountidentifier_free: (a: number, b: number) => void;
  readonly accountidentifier_fromFormattedStr: (a: number, b: number) => [number, number, number];
  readonly accountidentifier_fromPublicKey: (a: number) => number;
  readonly accountidentifier_fromAccountHash: (a: number) => number;
  readonly accountidentifier_toJson: (a: number) => any;
  readonly __wbg_publickey_free: (a: number, b: number) => void;
  readonly publickey_new_js_alias: (a: number, b: number) => [number, number, number];
  readonly publickey_fromUint8Array: (a: number, b: number) => [number, number, number];
  readonly publickey_toAccountHash: (a: number) => number;
  readonly publickey_toPurseUref: (a: number) => number;
  readonly publickey_toJson: (a: number) => any;
  readonly sdk_speculative_deploy: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => any;
  readonly sdk_transfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => any;
  readonly sdk_put_transaction: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly sdk_account_put_transaction: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly sdk_make_deploy: (a: number, b: number, c: number, d: number) => [number, number, number];
  readonly sdk_make_transfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number];
  readonly sdk_make_transaction: (a: number, b: number, c: number) => [number, number, number];
  readonly sdk_make_transfer_transaction: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number];
  readonly sdk_watchDeploy: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_watchTransaction: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_waitDeploy: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
  readonly sdk_waitTransaction: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
  readonly __wbg_watcher_free: (a: number, b: number) => void;
  readonly watcher_new: (a: number, b: number, c: number, d: bigint) => number;
  readonly watcher_subscribe: (a: number, b: number, c: number) => [number, number];
  readonly watcher_unsubscribe: (a: number, b: number, c: number) => void;
  readonly watcher_start: (a: number) => any;
  readonly watcher_stop: (a: number) => void;
  readonly __wbg_subscription_free: (a: number, b: number) => void;
  readonly __wbg_get_subscription_eventHandlerFn: (a: number) => any;
  readonly __wbg_set_subscription_eventHandlerFn: (a: number, b: any) => void;
  readonly subscription_new: (a: number, b: number, c: any) => number;
  readonly __wbg_failure_free: (a: number, b: number) => void;
  readonly __wbg_get_failure_cost: (a: number) => [number, number];
  readonly __wbg_set_failure_cost: (a: number, b: number, c: number) => void;
  readonly __wbg_get_failure_error_message: (a: number) => [number, number];
  readonly __wbg_set_failure_error_message: (a: number, b: number, c: number) => void;
  readonly __wbg_version2_free: (a: number, b: number) => void;
  readonly __wbg_get_version2_error_message: (a: number) => [number, number];
  readonly __wbg_set_version2_error_message: (a: number, b: number, c: number) => void;
  readonly __wbg_payment_free: (a: number, b: number) => void;
  readonly __wbg_executionresult_free: (a: number, b: number) => void;
  readonly __wbg_get_executionresult_Success: (a: number) => number;
  readonly __wbg_set_executionresult_Success: (a: number, b: number) => void;
  readonly __wbg_get_executionresult_Failure: (a: number) => number;
  readonly __wbg_set_executionresult_Failure: (a: number, b: number) => void;
  readonly __wbg_hashstring_free: (a: number, b: number) => void;
  readonly hashstring_Deploy: (a: number) => [number, number];
  readonly hashstring_toString: (a: number) => [number, number];
  readonly __wbg_publickeystring_free: (a: number, b: number) => void;
  readonly __wbg_message_free: (a: number, b: number) => void;
  readonly __wbg_messages_free: (a: number, b: number) => void;
  readonly __wbg_set_messages_entity_hash: (a: number, b: number, c: number) => void;
  readonly __wbg_get_messages_message: (a: number) => number;
  readonly __wbg_set_messages_message: (a: number, b: number) => void;
  readonly __wbg_get_messages_topic_name: (a: number) => [number, number];
  readonly __wbg_set_messages_topic_name: (a: number, b: number, c: number) => void;
  readonly __wbg_get_messages_topic_name_hash: (a: number) => [number, number];
  readonly __wbg_set_messages_topic_name_hash: (a: number, b: number, c: number) => void;
  readonly __wbg_get_messages_topic_index: (a: number) => number;
  readonly __wbg_set_messages_topic_index: (a: number, b: number) => void;
  readonly __wbg_get_messages_block_index: (a: number) => bigint;
  readonly __wbg_set_messages_block_index: (a: number, b: bigint) => void;
  readonly __wbg_transactionprocessed_free: (a: number, b: number) => void;
  readonly __wbg_get_transactionprocessed_hash: (a: number) => number;
  readonly __wbg_set_transactionprocessed_hash: (a: number, b: number) => void;
  readonly __wbg_get_transactionprocessed_initiator_addr: (a: number) => number;
  readonly __wbg_set_transactionprocessed_initiator_addr: (a: number, b: number) => void;
  readonly __wbg_get_transactionprocessed_timestamp: (a: number) => [number, number];
  readonly __wbg_set_transactionprocessed_timestamp: (a: number, b: number, c: number) => void;
  readonly __wbg_set_transactionprocessed_ttl: (a: number, b: number, c: number) => void;
  readonly __wbg_get_transactionprocessed_execution_result: (a: number) => number;
  readonly __wbg_set_transactionprocessed_execution_result: (a: number, b: number) => void;
  readonly __wbg_get_transactionprocessed_messages: (a: number) => [number, number];
  readonly __wbg_set_transactionprocessed_messages: (a: number, b: number, c: number) => void;
  readonly __wbg_body_free: (a: number, b: number) => void;
  readonly __wbg_get_body_transaction_processed: (a: number) => number;
  readonly __wbg_set_body_transaction_processed: (a: number, b: number) => void;
  readonly body_get_deploy_processed: (a: number) => number;
  readonly __wbg_eventparseresult_free: (a: number, b: number) => void;
  readonly __wbg_get_eventparseresult_err: (a: number) => [number, number];
  readonly __wbg_set_eventparseresult_err: (a: number, b: number, c: number) => void;
  readonly __wbg_get_eventparseresult_body: (a: number) => number;
  readonly __wbg_set_eventparseresult_body: (a: number, b: number) => void;
  readonly sdk_call_entrypoint: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly __wbg_get_version2_initiator: (a: number) => number;
  readonly hashstring_Version1: (a: number) => [number, number];
  readonly accountidentifier_new: (a: number, b: number) => [number, number, number];
  readonly __wbg_set_subscription_targetHash: (a: number, b: number, c: number) => void;
  readonly __wbg_set_version2_limit: (a: number, b: number, c: number) => void;
  readonly __wbg_set_payment_source: (a: number, b: number, c: number) => void;
  readonly __wbg_set_hashstring_hash: (a: number, b: number, c: number) => void;
  readonly __wbg_set_publickeystring_PublicKey: (a: number, b: number, c: number) => void;
  readonly __wbg_set_message_String: (a: number, b: number, c: number) => void;
  readonly __wbg_set_version2_consumed: (a: number, b: number, c: number) => void;
  readonly __wbg_set_version2_cost: (a: number, b: number, c: number) => void;
  readonly __wbg_set_transactionprocessed_block_hash: (a: number, b: number, c: number) => void;
  readonly __wbg_set_version2_initiator: (a: number, b: number) => void;
  readonly body_get_transaction_processed: (a: number) => number;
  readonly __wbg_get_subscription_targetHash: (a: number) => [number, number];
  readonly __wbg_get_version2_limit: (a: number) => [number, number];
  readonly __wbg_get_payment_source: (a: number) => [number, number];
  readonly __wbg_get_hashstring_hash: (a: number) => [number, number];
  readonly __wbg_get_publickeystring_PublicKey: (a: number) => [number, number];
  readonly __wbg_get_message_String: (a: number) => [number, number];
  readonly __wbg_get_messages_entity_hash: (a: number) => [number, number];
  readonly __wbg_get_version2_cost: (a: number) => [number, number];
  readonly __wbg_get_version2_consumed: (a: number) => [number, number];
  readonly __wbg_get_transactionprocessed_ttl: (a: number) => [number, number];
  readonly __wbg_get_transactionprocessed_block_hash: (a: number) => [number, number];
  readonly __wbg_eraid_free: (a: number, b: number) => void;
  readonly eraid_new: (a: bigint) => number;
  readonly eraid_value: (a: number) => bigint;
  readonly __wbg_getblockresult_free: (a: number, b: number) => void;
  readonly getblockresult_api_version: (a: number) => any;
  readonly getblockresult_block: (a: number) => any;
  readonly getblockresult_toJson: (a: number) => any;
  readonly __wbg_getblockoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_getblockoptions_maybe_block_id_as_string: (a: number) => [number, number];
  readonly __wbg_set_getblockoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getblockoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_getblockoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getblockoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_set_getblockoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getblockoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getblockoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_block_options: (a: number, b: any) => [number, number, number];
  readonly sdk_get_block: (a: number, b: number) => any;
  readonly sdk_chain_get_block: (a: number, b: number) => any;
  readonly __wbg_getdictionaryitemresult_free: (a: number, b: number) => void;
  readonly getdictionaryitemresult_api_version: (a: number) => any;
  readonly getdictionaryitemresult_dictionary_key: (a: number) => [number, number];
  readonly getdictionaryitemresult_stored_value: (a: number) => any;
  readonly getdictionaryitemresult_merkle_proof: (a: number) => [number, number];
  readonly getdictionaryitemresult_toJson: (a: number) => any;
  readonly __wbg_getdictionaryitemoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_state_root_hash_as_string: (a: number) => [number, number];
  readonly __wbg_set_getdictionaryitemoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_state_root_hash: (a: number) => number;
  readonly __wbg_set_getdictionaryitemoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_dictionary_item_params: (a: number) => number;
  readonly __wbg_set_getdictionaryitemoptions_dictionary_item_params: (a: number, b: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_dictionary_item_identifier: (a: number) => number;
  readonly __wbg_set_getdictionaryitemoptions_dictionary_item_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_set_getdictionaryitemoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getdictionaryitemoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_dictionary_item_options: (a: number, b: any) => [number, number, number];
  readonly sdk_get_dictionary_item: (a: number, b: number) => any;
  readonly sdk_state_get_dictionary_item: (a: number, b: number) => any;
  readonly sdk_speculative_transaction: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
  readonly sdk_transfer_transaction: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => any;
  readonly sdk_install: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly __wbg_querycontractdictoptions_free: (a: number, b: number) => void;
  readonly sdk_query_contract_dict_options: (a: number, b: any) => [number, number, number];
  readonly sdk_query_contract_dict: (a: number, b: number) => any;
  readonly __wbg_get_querycontractdictoptions_dictionary_item_params: (a: number) => number;
  readonly __wbg_get_querycontractdictoptions_dictionary_item_identifier: (a: number) => number;
  readonly __wbg_set_querycontractdictoptions_verbosity: (a: number, b: number) => void;
  readonly __wbg_set_querycontractdictoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_set_querycontractdictoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_querycontractdictoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querycontractdictoptions_state_root_hash: (a: number) => number;
  readonly __wbg_get_querycontractdictoptions_state_root_hash_as_string: (a: number) => [number, number];
  readonly __wbg_get_querycontractdictoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_get_querycontractdictoptions_verbosity: (a: number) => number;
  readonly __wbg_set_querycontractdictoptions_dictionary_item_params: (a: number, b: number) => void;
  readonly __wbg_set_querycontractdictoptions_dictionary_item_identifier: (a: number, b: number) => void;
  readonly __wbg_entityaddr_free: (a: number, b: number) => void;
  readonly entityaddr_fromFormattedStr: (a: number, b: number) => [number, number, number];
  readonly entityaddr_toFormattedString: (a: number) => [number, number];
  readonly entityaddr_toHexString: (a: number) => [number, number];
  readonly entityaddr_toJson: (a: number) => any;
  readonly __wbg_argssimple_free: (a: number, b: number) => void;
  readonly __wbg_accounthash_free: (a: number, b: number) => void;
  readonly accounthash_new_js_alias: (a: number, b: number) => [number, number, number];
  readonly accounthash_fromFormattedStr: (a: number, b: number) => [number, number, number];
  readonly accounthash_fromPublicKey: (a: number) => number;
  readonly accounthash_toFormattedString: (a: number) => [number, number];
  readonly accounthash_toHexString: (a: number) => [number, number];
  readonly accounthash_fromUint8Array: (a: number, b: number) => number;
  readonly accounthash_toJson: (a: number) => any;
  readonly __wbg_blockhash_free: (a: number, b: number) => void;
  readonly blockhash_new_js_alias: (a: number, b: number) => [number, number, number];
  readonly blockhash_fromDigest: (a: number) => [number, number, number];
  readonly blockhash_toJson: (a: number) => any;
  readonly blockhash_toString: (a: number) => [number, number];
  readonly __wbg_deployhash_free: (a: number, b: number) => void;
  readonly deployhash_new_js_alias: (a: number, b: number) => [number, number, number];
  readonly deployhash_toJson: (a: number) => any;
  readonly deployhash_toString: (a: number) => [number, number];
  readonly __wbg_packagehash_free: (a: number, b: number) => void;
  readonly packagehash_new_js_alias: (a: number, b: number) => [number, number, number];
  readonly packagehash_fromFormattedStr: (a: number, b: number) => [number, number, number];
  readonly packagehash_toFormattedString: (a: number) => [number, number];
  readonly packagehash_fromUint8Array: (a: number, b: number) => number;
  readonly __wbg_transactionhash_free: (a: number, b: number) => void;
  readonly transactionhash_new_js_alias: (a: number, b: number) => [number, number, number];
  readonly transactionhash_fromRaw: (a: number, b: number) => [number, number, number];
  readonly transactionhash_digest: (a: number) => [number, number, number];
  readonly transactionhash_toJson: (a: number) => any;
  readonly transactionhash_toString: (a: number) => [number, number];
  readonly __wbg_entityidentifier_free: (a: number, b: number) => void;
  readonly entityidentifier_fromFormattedStr: (a: number, b: number) => [number, number, number];
  readonly entityidentifier_fromPublicKey: (a: number) => number;
  readonly entityidentifier_fromAccountHash: (a: number) => number;
  readonly entityidentifier_fromEntityAddr: (a: number) => number;
  readonly entityidentifier_toJson: (a: number) => any;
  readonly __wbg_globalstateidentifier_free: (a: number, b: number) => void;
  readonly globalstateidentifier_new: (a: number) => number;
  readonly globalstateidentifier_fromBlockHash: (a: number) => number;
  readonly globalstateidentifier_fromBlockHeight: (a: bigint) => number;
  readonly globalstateidentifier_fromStateRootHash: (a: number) => number;
  readonly globalstateidentifier_toJson: (a: number) => any;
  readonly __wbg_purseidentifier_free: (a: number, b: number) => void;
  readonly purseidentifier_fromURef: (a: number) => number;
  readonly purseidentifier_toJson: (a: number) => any;
  readonly __wbg_recordid_free: (a: number, b: number) => void;
  readonly recordid_new_js_alias: (a: number) => [number, number, number];
  readonly __wbg_transaction_free: (a: number, b: number) => void;
  readonly transaction_new: (a: any) => number;
  readonly transaction_toJson: (a: number) => any;
  readonly transaction_newSession: (a: number, b: number) => [number, number, number];
  readonly transaction_newTransfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => [number, number, number];
  readonly transaction_withTTL: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly transaction_withTimestamp: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly transaction_withChainName: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly transaction_withPublicKey: (a: number, b: number, c: number, d: number) => number;
  readonly transaction_withAccountHash: (a: number, b: number, c: number, d: number) => number;
  readonly transaction_withEntryPoint: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly transaction_withEntityHash: (a: number, b: number, c: number, d: number) => number;
  readonly transaction_withPackageHash: (a: number, b: number, c: number, d: number) => number;
  readonly transaction_withTransactionBytes: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly transaction_withSecretKey: (a: number, b: number, c: number) => number;
  readonly transaction_verify: (a: number) => number;
  readonly transaction_hash: (a: number) => number;
  readonly transaction_expired: (a: number) => number;
  readonly transaction_expires: (a: number) => any;
  readonly transaction_signers: (a: number) => any;
  readonly transaction_authorization_keys: (a: number) => any;
  readonly transaction_sign: (a: number, b: number, c: number) => number;
  readonly transaction_approvalsHash: (a: number) => any;
  readonly transaction_approvals: (a: number) => any;
  readonly transaction_is_native: (a: number) => number;
  readonly transaction_target: (a: number) => any;
  readonly transaction_is_standard_payment: (a: number) => number;
  readonly transaction_session_args: (a: number) => any;
  readonly transaction_addSignature: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly transaction_entry_point: (a: number) => [number, number];
  readonly transaction_ttl: (a: number) => [number, number];
  readonly transaction_timestamp: (a: number) => [number, number];
  readonly transaction_size_estimate: (a: number) => number;
  readonly transaction_chain_name: (a: number) => [number, number];
  readonly transaction_initiator_addr: (a: number) => [number, number];
  readonly transaction_pricing_mode: (a: number) => number;
  readonly transaction_additional_computation_factor: (a: number) => number;
  readonly transaction_receipt: (a: number) => number;
  readonly transaction_gas_price_tolerance: (a: number) => number;
  readonly transaction_account_hash: (a: number) => number;
  readonly transaction_addArg: (a: number, b: any, c: number, d: number) => [number, number, number];
  readonly __wbg_transactionstrparams_free: (a: number, b: number) => void;
  readonly transactionstrparams_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number, u: number, v: number, w: number, x: number, y: number, z: number, a1: number, b1: number, c1: number) => number;
  readonly transactionstrparams_new_with_defaults: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
  readonly transactionstrparams_secret_key: (a: number) => [number, number];
  readonly transactionstrparams_set_secret_key: (a: number, b: number, c: number) => void;
  readonly transactionstrparams_timestamp: (a: number) => [number, number];
  readonly transactionstrparams_set_timestamp: (a: number, b: number, c: number) => void;
  readonly transactionstrparams_setDefaultTimestamp: (a: number) => void;
  readonly transactionstrparams_ttl: (a: number) => [number, number];
  readonly transactionstrparams_set_ttl: (a: number, b: number, c: number) => void;
  readonly transactionstrparams_setDefaultTTL: (a: number) => void;
  readonly transactionstrparams_chain_name: (a: number) => [number, number];
  readonly transactionstrparams_set_chain_name: (a: number, b: number, c: number) => void;
  readonly transactionstrparams_initiator_addr: (a: number) => [number, number];
  readonly transactionstrparams_set_initiator_addr: (a: number, b: number, c: number) => void;
  readonly transactionstrparams_session_args_simple: (a: number) => number;
  readonly transactionstrparams_set_session_args_simple: (a: number, b: number, c: number) => void;
  readonly transactionstrparams_session_args_json: (a: number) => [number, number];
  readonly transactionstrparams_set_session_args_json: (a: number, b: number, c: number) => void;
  readonly transactionstrparams_pricing_mode: (a: number) => number;
  readonly transactionstrparams_set_pricing_mode: (a: number, b: number) => void;
  readonly transactionstrparams_additional_computation_factor: (a: number) => [number, number];
  readonly transactionstrparams_set_additional_computation_factor: (a: number, b: number, c: number) => void;
  readonly transactionstrparams_payment_amount: (a: number) => [number, number];
  readonly transactionstrparams_set_payment_amount: (a: number, b: number, c: number) => void;
  readonly transactionstrparams_gas_price_tolerance: (a: number) => [number, number];
  readonly transactionstrparams_set_gas_price_tolerance: (a: number, b: number, c: number) => void;
  readonly transactionstrparams_receipt: (a: number) => [number, number];
  readonly transactionstrparams_set_receipt: (a: number, b: number, c: number) => void;
  readonly transactionstrparams_standard_payment: (a: number) => number;
  readonly transactionstrparams_set_standard_payment: (a: number, b: number) => void;
  readonly transactionstrparams_transferred_value: (a: number) => [number, number];
  readonly transactionstrparams_set_transferred_value: (a: number, b: number, c: number) => void;
  readonly transactionstrparams_session_entry_point: (a: number) => [number, number];
  readonly transactionstrparams_set_session_entry_point: (a: number, b: number, c: number) => void;
  readonly transactionstrparams_chunked_args: (a: number) => number;
  readonly transactionstrparams_set_chunked_args: (a: number, b: number) => void;
  readonly __wbg_uref_free: (a: number, b: number) => void;
  readonly uref_new_js_alias: (a: number, b: number, c: number) => [number, number, number];
  readonly uref_fromFormattedStr: (a: number, b: number) => [number, number, number];
  readonly uref_fromUint8Array: (a: number, b: number, c: number) => number;
  readonly uref_toFormattedString: (a: number) => [number, number];
  readonly uref_toJson: (a: number) => any;
  readonly __wbg_getblocktransfersresult_free: (a: number, b: number) => void;
  readonly getblocktransfersresult_api_version: (a: number) => any;
  readonly getblocktransfersresult_block_hash: (a: number) => number;
  readonly getblocktransfersresult_transfers: (a: number) => any;
  readonly getblocktransfersresult_toJson: (a: number) => any;
  readonly __wbg_getblocktransfersoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_getblocktransfersoptions_maybe_block_id_as_string: (a: number) => [number, number];
  readonly __wbg_set_getblocktransfersoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getblocktransfersoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_getblocktransfersoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getblocktransfersoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getblocktransfersoptions_verbosity: (a: number, b: number) => void;
  readonly __wbg_get_getblocktransfersoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_set_getblocktransfersoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly sdk_get_block_transfers_options: (a: number, b: any) => [number, number, number];
  readonly sdk_get_block_transfers: (a: number, b: number) => any;
  readonly sdk_chain_get_block_transfers: (a: number, b: number) => any;
  readonly __wbg_getdeployresult_free: (a: number, b: number) => void;
  readonly getdeployresult_api_version: (a: number) => any;
  readonly getdeployresult_deploy: (a: number) => number;
  readonly getdeployresult_execution_info: (a: number) => any;
  readonly getdeployresult_toJson: (a: number) => any;
  readonly __wbg_getdeployoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_getdeployoptions_deploy_hash_as_string: (a: number) => [number, number];
  readonly __wbg_set_getdeployoptions_deploy_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getdeployoptions_deploy_hash: (a: number) => number;
  readonly __wbg_set_getdeployoptions_deploy_hash: (a: number, b: number) => void;
  readonly __wbg_get_getdeployoptions_finalized_approvals: (a: number) => number;
  readonly __wbg_set_getdeployoptions_finalized_approvals: (a: number, b: number) => void;
  readonly __wbg_get_getdeployoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_set_getdeployoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getdeployoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getdeployoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_deploy_options: (a: number, b: any) => [number, number, number];
  readonly sdk_get_deploy: (a: number, b: number) => any;
  readonly sdk_info_get_deploy: (a: number, b: number) => any;
  readonly __wbg_getnodestatusresult_free: (a: number, b: number) => void;
  readonly getnodestatusresult_api_version: (a: number) => any;
  readonly getnodestatusresult_chainspec_name: (a: number) => [number, number];
  readonly getnodestatusresult_starting_state_root_hash: (a: number) => number;
  readonly getnodestatusresult_peers: (a: number) => any;
  readonly getnodestatusresult_last_added_block_info: (a: number) => any;
  readonly getnodestatusresult_our_public_signing_key: (a: number) => number;
  readonly getnodestatusresult_round_length: (a: number) => any;
  readonly getnodestatusresult_next_upgrade: (a: number) => any;
  readonly getnodestatusresult_build_version: (a: number) => [number, number];
  readonly getnodestatusresult_uptime: (a: number) => any;
  readonly getnodestatusresult_reactor_state: (a: number) => any;
  readonly getnodestatusresult_last_progress: (a: number) => any;
  readonly getnodestatusresult_available_block_range: (a: number) => any;
  readonly getnodestatusresult_block_sync: (a: number) => any;
  readonly getnodestatusresult_toJson: (a: number) => any;
  readonly sdk_get_node_status: (a: number, b: number, c: number, d: number) => any;
  readonly sdk_info_get_status: (a: number, b: number, c: number, d: number) => any;
  readonly __wbg_gettransactionresult_free: (a: number, b: number) => void;
  readonly gettransactionresult_api_version: (a: number) => any;
  readonly gettransactionresult_transaction: (a: number) => number;
  readonly gettransactionresult_execution_info: (a: number) => any;
  readonly gettransactionresult_toJson: (a: number) => any;
  readonly __wbg_gettransactionoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_gettransactionoptions_transaction_hash: (a: number) => number;
  readonly __wbg_set_gettransactionoptions_transaction_hash: (a: number, b: number) => void;
  readonly sdk_get_transaction_options: (a: number, b: any) => [number, number, number];
  readonly sdk_get_transaction: (a: number, b: number) => any;
  readonly sdk_info_get_transaction: (a: number, b: number) => any;
  readonly sdk_put_deploy: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly sdk_account_put_deploy: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly __wbg_querybalancedetailsresult_free: (a: number, b: number) => void;
  readonly querybalancedetailsresult_api_version: (a: number) => any;
  readonly querybalancedetailsresult_total_balance: (a: number) => any;
  readonly querybalancedetailsresult_available_balance: (a: number) => any;
  readonly querybalancedetailsresult_total_balance_proof: (a: number) => any;
  readonly querybalancedetailsresult_holds: (a: number) => any;
  readonly querybalancedetailsresult_toJson: (a: number) => any;
  readonly __wbg_querybalancedetailsoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_querybalancedetailsoptions_purse_identifier_as_string: (a: number) => [number, number];
  readonly __wbg_set_querybalancedetailsoptions_purse_identifier_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querybalancedetailsoptions_purse_identifier: (a: number) => number;
  readonly __wbg_set_querybalancedetailsoptions_purse_identifier: (a: number, b: number) => void;
  readonly __wbg_get_querybalancedetailsoptions_global_state_identifier: (a: number) => number;
  readonly __wbg_set_querybalancedetailsoptions_global_state_identifier: (a: number, b: number) => void;
  readonly __wbg_get_querybalancedetailsoptions_state_root_hash_as_string: (a: number) => [number, number];
  readonly __wbg_set_querybalancedetailsoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querybalancedetailsoptions_state_root_hash: (a: number) => number;
  readonly __wbg_set_querybalancedetailsoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_querybalancedetailsoptions_maybe_block_id_as_string: (a: number) => [number, number];
  readonly __wbg_set_querybalancedetailsoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querybalancedetailsoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_set_querybalancedetailsoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querybalancedetailsoptions_verbosity: (a: number) => number;
  readonly __wbg_set_querybalancedetailsoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_query_balance_details_options: (a: number, b: any) => [number, number, number];
  readonly sdk_query_balance_details: (a: number, b: number) => any;
  readonly __wbg_speculativeexectxnresult_free: (a: number, b: number) => void;
  readonly speculativeexectxnresult_api_version: (a: number) => any;
  readonly speculativeexectxnresult_block_hash: (a: number) => number;
  readonly speculativeexectxnresult_execution_result: (a: number) => any;
  readonly speculativeexectxnresult_toJson: (a: number) => any;
  readonly __wbg_getspeculativeexectxnoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_getspeculativeexectxnoptions_transaction_as_string: (a: number) => [number, number];
  readonly __wbg_set_getspeculativeexectxnoptions_transaction_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getspeculativeexectxnoptions_transaction: (a: number) => number;
  readonly __wbg_set_getspeculativeexectxnoptions_transaction: (a: number, b: number) => void;
  readonly __wbg_get_getspeculativeexectxnoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_set_getspeculativeexectxnoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getspeculativeexectxnoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getspeculativeexectxnoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_speculative_exec_options: (a: number, b: any) => [number, number, number];
  readonly sdk_speculative_exec: (a: number, b: number) => any;
  readonly __wbg_puttransactionresult_free: (a: number, b: number) => void;
  readonly puttransactionresult_api_version: (a: number) => any;
  readonly puttransactionresult_transaction_hash: (a: number) => number;
  readonly puttransactionresult_toJson: (a: number) => any;
  readonly sdk_transaction: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
  readonly sdk_sign_transaction: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_call_entrypoint_deploy: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => any;
  readonly deployhash_fromDigest: (a: number) => [number, number, number];
  readonly __wbg_set_gettransactionoptions_verbosity: (a: number, b: number) => void;
  readonly __wbg_set_gettransactionoptions_transaction_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_gettransactionoptions_rpc_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_gettransactionoptions_finalized_approvals: (a: number) => number;
  readonly purseidentifier_fromPublicKey: (a: number) => number;
  readonly purseidentifier_fromAccountHash: (a: number) => number;
  readonly __wbg_set_gettransactionoptions_finalized_approvals: (a: number, b: number) => void;
  readonly __wbg_get_gettransactionoptions_transaction_hash_as_string: (a: number) => [number, number];
  readonly __wbg_get_gettransactionoptions_rpc_address: (a: number) => [number, number];
  readonly __wbg_get_gettransactionoptions_verbosity: (a: number) => number;
  readonly entityidentifier_new_js_alias: (a: number, b: number) => [number, number, number];
  readonly __wbg_bytes_free: (a: number, b: number) => void;
  readonly bytes_new: () => number;
  readonly bytes_fromUint8Array: (a: any) => number;
  readonly __wbg_deploystrparams_free: (a: number, b: number) => void;
  readonly deploystrparams_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => number;
  readonly deploystrparams_secret_key: (a: number) => [number, number];
  readonly deploystrparams_set_secret_key: (a: number, b: number, c: number) => void;
  readonly deploystrparams_timestamp: (a: number) => [number, number];
  readonly deploystrparams_set_timestamp: (a: number, b: number, c: number) => void;
  readonly deploystrparams_setDefaultTimestamp: (a: number) => void;
  readonly deploystrparams_ttl: (a: number) => [number, number];
  readonly deploystrparams_set_ttl: (a: number, b: number, c: number) => void;
  readonly deploystrparams_setDefaultTTL: (a: number) => void;
  readonly deploystrparams_chain_name: (a: number) => [number, number];
  readonly deploystrparams_set_chain_name: (a: number, b: number, c: number) => void;
  readonly deploystrparams_session_account: (a: number) => [number, number];
  readonly deploystrparams_set_session_account: (a: number, b: number, c: number) => void;
  readonly deploystrparams_gas_price_tolerance: (a: number) => [number, number];
  readonly deploystrparams_set_gas_price_tolerance: (a: number, b: number, c: number) => void;
  readonly __wbg_sessionstrparams_free: (a: number, b: number) => void;
  readonly sessionstrparams_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number) => number;
  readonly sessionstrparams_session_hash: (a: number) => [number, number];
  readonly sessionstrparams_set_session_hash: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_name: (a: number) => [number, number];
  readonly sessionstrparams_set_session_name: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_package_hash: (a: number) => [number, number];
  readonly sessionstrparams_set_session_package_hash: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_package_name: (a: number) => [number, number];
  readonly sessionstrparams_set_session_package_name: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_path: (a: number) => [number, number];
  readonly sessionstrparams_set_session_path: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_bytes: (a: number) => number;
  readonly sessionstrparams_set_session_bytes: (a: number, b: number) => void;
  readonly sessionstrparams_session_args_simple: (a: number) => number;
  readonly sessionstrparams_set_session_args_simple: (a: number, b: any) => void;
  readonly sessionstrparams_session_args_json: (a: number) => [number, number];
  readonly sessionstrparams_set_session_args_json: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_version: (a: number) => [number, number];
  readonly sessionstrparams_set_session_version: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_entry_point: (a: number) => [number, number];
  readonly sessionstrparams_set_session_entry_point: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_is_session_transfer: (a: number) => number;
  readonly sessionstrparams_set_is_session_transfer: (a: number, b: number) => void;
  readonly __wbg_signatureresponse_free: (a: number, b: number) => void;
  readonly signatureresponse_is_cancelled: (a: number) => number;
  readonly signatureresponse_get_signature_hex: (a: number) => [number, number];
  readonly signatureresponse_get_signature: (a: number) => [number, number];
  readonly sdk_speculative_transfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => any;
  readonly sdk_speculative_transfer_transaction: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => any;
  readonly sdk_install_deploy: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => any;
  readonly __wbg_casperwallet_free: (a: number, b: number) => void;
  readonly casperwallet_new: () => number;
  readonly casperwallet_signDeploy: (a: number, b: number, c: number, d: number) => any;
  readonly casperwallet_signTransaction: (a: number, b: number, c: number, d: number) => any;
  readonly casperwallet_signDeployHash: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly casperwallet_signTransactionHash: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly casperwallet_signMessage: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly casperwallet_connect: (a: number) => any;
  readonly casperwallet_disconnect: (a: number) => any;
  readonly casperwallet_isConnected: (a: number) => any;
  readonly casperwallet_getVersion: (a: number) => any;
  readonly casperwallet_getActivePublicKey: (a: number) => any;
  readonly casperwallet_switchAccount: (a: number) => any;
  readonly __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
  readonly intounderlyingbytesource_type: (a: number) => number;
  readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
  readonly intounderlyingbytesource_start: (a: number, b: any) => void;
  readonly intounderlyingbytesource_pull: (a: number, b: any) => any;
  readonly intounderlyingbytesource_cancel: (a: number) => void;
  readonly __wbg_intounderlyingsource_free: (a: number, b: number) => void;
  readonly intounderlyingsource_pull: (a: number, b: any) => any;
  readonly intounderlyingsource_cancel: (a: number) => void;
  readonly __wbg_intounderlyingsink_free: (a: number, b: number) => void;
  readonly intounderlyingsink_write: (a: number, b: any) => any;
  readonly intounderlyingsink_close: (a: number) => any;
  readonly intounderlyingsink_abort: (a: number, b: any) => any;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_5: WebAssembly.Table;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0aae396199523fd1: (a: number, b: number) => void;
  readonly closure972_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure1169_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure1176_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure1749_externref_shim: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
