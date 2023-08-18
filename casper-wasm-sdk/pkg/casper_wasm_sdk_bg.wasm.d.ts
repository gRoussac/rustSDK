/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function sdk_speculative_transfer(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number): number;
export function __wbg_transferaddr_free(a: number): void;
export function transferaddr_new(a: number, b: number, c: number): void;
export function fromTransfer(a: number, b: number): number;
export function __wbg_cltype_free(a: number): void;
export function cltype_Bool(): number;
export function cltype_I32(): number;
export function cltype_I64(): number;
export function cltype_U8(): number;
export function cltype_U32(): number;
export function cltype_U64(): number;
export function cltype_U128(): number;
export function cltype_U256(): number;
export function cltype_U512(): number;
export function cltype_Unit(): number;
export function cltype_String(): number;
export function cltype_Key(): number;
export function cltype_URef(): number;
export function cltype_PublicKey(): number;
export function cltype_Option(): number;
export function cltype_List(): number;
export function cltype_ByteArray(): number;
export function cltype_Result(): number;
export function cltype_Map(): number;
export function cltype_Tuple1(): number;
export function cltype_Tuple2(): number;
export function cltype_Tuple3(): number;
export function cltype_Any(): number;
export function cltype_new(a: number): number;
export function __wbg_eraid_free(a: number): void;
export function eraid_new(a: number): number;
export function eraid_value(a: number): number;
export function sdk_make_transfer(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): number;
export function __wbg_deployhash_free(a: number): void;
export function deployhash_new(a: number, b: number, c: number): void;
export function deployhash_fromDigest(a: number, b: number): void;
export function __wbg_path_free(a: number): void;
export function path_new(a: number): number;
export function sdk_speculative_deploy(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number;
export function sdk_transfer(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number): number;
export function log(a: number, b: number): void;
export function error(a: number, b: number): void;
export function __wbg_key_free(a: number): void;
export function key_new(a: number, b: number): void;
export function key_fromURef(a: number): number;
export function key_fromDeployInfo(a: number): number;
export function key_fromAccount(a: number): number;
export function key_fromHash(a: number): number;
export function key_fromTransfer(a: number, b: number): number;
export function key_fromEraInfo(a: number): number;
export function key_fromBalance(a: number): number;
export function key_fromBid(a: number): number;
export function key_fromWithdraw(a: number): number;
export function key_fromDictionary(a: number): number;
export function key_fromSystemContractRegistry(): number;
export function key_fromEraSummary(): number;
export function key_fromUnbond(a: number): number;
export function key_fromChainspecRegistry(): number;
export function key_fromChecksumRegistry(): number;
export function key_toFormattedString(a: number, b: number): void;
export function sdk_get_auction_info(a: number, b: number, c: number, d: number, e: number): number;
export function sdk_get_block_transfers(a: number, b: number, c: number, d: number, e: number): number;
export function sdk_get_era_info(a: number, b: number, c: number, d: number, e: number): number;
export function sdk_get_era_summary(a: number, b: number, c: number, d: number, e: number): number;
export function sdk_query_balance(a: number, b: number, c: number, d: number, e: number, f: number): number;
export function sdk_speculative_exec(a: number, b: number, c: number, d: number, e: number, f: number): number;
export function __wbg_accounthash_free(a: number): void;
export function accounthash_new(a: number, b: number, c: number): void;
export function accounthash_from_public_key(a: number): number;
export function accounthash_fromFormattedStr(a: number, b: number, c: number): void;
export function accounthash_toFormattedString(a: number, b: number): void;
export function accounthash_fromUint8Array(a: number, b: number): number;
export function blockhash_new(a: number, b: number): number;
export function blockhash_toBytes(a: number, b: number): void;
export function __wbg_clvalue_free(a: number): void;
export function __wbg_globalstateidentifier_free(a: number): void;
export function globalstateidentifier_new(a: number): number;
export function globalstateidentifier_fromBlockHash(a: number): number;
export function globalstateidentifier_fromBlockHeight(a: number): number;
export function globalstateidentifier_fromStateRootHash(a: number): number;
export function sdk_get_account(a: number, b: number, c: number, d: number, e: number, f: number): number;
export function sdk_state_get_account_info(a: number, b: number, c: number, d: number, e: number, f: number): number;
export function sdk_get_block(a: number, b: number, c: number, d: number, e: number): number;
export function sdk_chain_get_block(a: number, b: number, c: number, d: number, e: number): number;
export function sdk_get_state_root_hash(a: number, b: number, c: number, d: number, e: number): number;
export function sdk_chain_get_state_root_hash(a: number, b: number, c: number, d: number, e: number): number;
export function sdk_query_global_state(a: number, b: number, c: number, d: number, e: number, f: number, g: number): number;
export function sdk_deploy(a: number, b: number, c: number, d: number, e: number, f: number, g: number): number;
export function sdk_sign_deploy(a: number, b: number, c: number, d: number): number;
export function __wbg_blockhash_free(a: number): void;
export function __wbg_accessrights_free(a: number): void;
export function accessrights_NONE(): number;
export function accessrights_READ(): number;
export function accessrights_WRITE(): number;
export function accessrights_ADD(): number;
export function accessrights_READ_ADD(): number;
export function accessrights_READ_WRITE(): number;
export function accessrights_ADD_WRITE(): number;
export function accessrights_READ_ADD_WRITE(): number;
export function accessrights_new(a: number, b: number): void;
export function accessrights_from_bits(a: number, b: number, c: number): number;
export function accessrights_is_readable(a: number): number;
export function accessrights_is_writeable(a: number): number;
export function accessrights_is_addable(a: number): number;
export function accessrights_is_none(a: number): number;
export function __wbg_dictionaryaddr_free(a: number): void;
export function dictionaryaddr_new(a: number, b: number, c: number): void;
export function hashaddr_new(a: number, b: number, c: number): void;
export function __wbg_purseidentifier_free(a: number): void;
export function purseidentifier_new_main_purse_under_public_key(a: number): number;
export function purseidentifier_new_main_purse_under_account_hash(a: number): number;
export function purseidentifier_new_purse_uref(a: number): number;
export function sdk_get_balance(a: number, b: number, c: number, d: number, e: number, f: number): number;
export function sdk_state_get_balance(a: number, b: number, c: number, d: number, e: number, f: number): number;
export function sdk_get_chainspec(a: number, b: number, c: number, d: number): number;
export function sdk_get_deploy(a: number, b: number, c: number, d: number, e: number, f: number): number;
export function sdk_info_get_deploy(a: number, b: number, c: number, d: number, e: number, f: number): number;
export function sdk_get_dictionary_item(a: number, b: number, c: number, d: number, e: number, f: number): number;
export function sdk_state_get_dictionary_item(a: number, b: number, c: number, d: number, e: number, f: number): number;
export function sdk_get_node_status(a: number, b: number, c: number, d: number): number;
export function sdk_get_peers(a: number, b: number, c: number, d: number): number;
export function sdk_get_validator_changes(a: number, b: number, c: number, d: number): number;
export function sdk_list_rpcs(a: number, b: number, c: number, d: number): number;
export function sdk_put_deploy(a: number, b: number, c: number, d: number, e: number): number;
export function sdk_account_put_deploy(a: number, b: number, c: number, d: number, e: number): number;
export function __wbg_hashaddr_free(a: number): void;
export function __wbg_urefaddr_free(a: number): void;
export function urefaddr_new(a: number, b: number, c: number): void;
export function __wbg_blockidentifier_free(a: number): void;
export function blockidentifier_new(a: number): number;
export function blockidentifier_from_hash(a: number): number;
export function blockidentifier_fromHeight(a: number): number;
export function __wbg_paymentstrparams_free(a: number): void;
export function paymentstrparams_new(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number, u: number): number;
export function paymentstrparams_payment_amount(a: number, b: number): void;
export function paymentstrparams_set_payment_amount(a: number, b: number, c: number): void;
export function paymentstrparams_payment_hash(a: number, b: number): void;
export function paymentstrparams_set_payment_hash(a: number, b: number, c: number): void;
export function paymentstrparams_payment_name(a: number, b: number): void;
export function paymentstrparams_set_payment_name(a: number, b: number, c: number): void;
export function paymentstrparams_payment_package_hash(a: number, b: number): void;
export function paymentstrparams_set_payment_package_hash(a: number, b: number, c: number): void;
export function paymentstrparams_payment_package_name(a: number, b: number): void;
export function paymentstrparams_set_payment_package_name(a: number, b: number, c: number): void;
export function paymentstrparams_payment_path(a: number, b: number): void;
export function paymentstrparams_set_payment_path(a: number, b: number, c: number): void;
export function paymentstrparams_payment_args_simple(a: number): number;
export function paymentstrparams_set_payment_args_simple(a: number, b: number): void;
export function paymentstrparams_payment_args_json(a: number, b: number): void;
export function paymentstrparams_set_payment_args_json(a: number, b: number, c: number): void;
export function paymentstrparams_payment_args_complex(a: number, b: number): void;
export function paymentstrparams_set_payment_args_complex(a: number, b: number, c: number): void;
export function paymentstrparams_payment_version(a: number, b: number): void;
export function paymentstrparams_set_payment_version(a: number, b: number, c: number): void;
export function paymentstrparams_payment_entry_point(a: number, b: number): void;
export function paymentstrparams_set_payment_entry_point(a: number, b: number, c: number): void;
export function __wbg_sessionstrparams_free(a: number): void;
export function sessionstrparams_new(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number): number;
export function sessionstrparams_set_session_hash(a: number, b: number, c: number): void;
export function sessionstrparams_set_session_name(a: number, b: number, c: number): void;
export function sessionstrparams_set_session_package_hash(a: number, b: number, c: number): void;
export function sessionstrparams_set_session_package_name(a: number, b: number, c: number): void;
export function sessionstrparams_set_session_path(a: number, b: number, c: number): void;
export function sessionstrparams_session_args_simple(a: number): number;
export function sessionstrparams_set_session_args_simple(a: number, b: number): void;
export function sessionstrparams_session_args_json(a: number, b: number): void;
export function sessionstrparams_set_session_args_json(a: number, b: number, c: number): void;
export function sessionstrparams_set_session_args_complex(a: number, b: number, c: number): void;
export function sessionstrparams_set_session_version(a: number, b: number, c: number): void;
export function sessionstrparams_set_session_entry_point(a: number, b: number, c: number): void;
export function sessionstrparams_is_session_transfer(a: number): number;
export function sessionstrparams_set_is_session_transfer(a: number, b: number): void;
export function sessionstrparams_session_hash(a: number, b: number): void;
export function sessionstrparams_session_name(a: number, b: number): void;
export function sessionstrparams_session_package_hash(a: number, b: number): void;
export function sessionstrparams_session_package_name(a: number, b: number): void;
export function sessionstrparams_session_path(a: number, b: number): void;
export function sessionstrparams_session_args_complex(a: number, b: number): void;
export function sessionstrparams_session_version(a: number, b: number): void;
export function sessionstrparams_session_entry_point(a: number, b: number): void;
export function __wbg_bytes_free(a: number): void;
export function bytes_new(): number;
export function bytes_len(a: number): number;
export function bytes_is_empty(a: number): number;
export function bytes_push(a: number, b: number): void;
export function bytes_extend(a: number, b: number, c: number): void;
export function bytes_asSlice(a: number): number;
export function bytes_fromSlice(a: number, b: number): number;
export function bytes_iter(a: number): number;
export function __wbg_deploy_free(a: number): void;
export function deploy_new(a: number): number;
export function deploy_toJson(a: number): number;
export function deploy_withPaymentAndSession(a: number, b: number, c: number): number;
export function deploy_withTransfer(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number;
export function deploy_withTTL(a: number, b: number, c: number, d: number, e: number): number;
export function deploy_withTimestamp(a: number, b: number, c: number, d: number, e: number): number;
export function deploy_withChainName(a: number, b: number, c: number, d: number, e: number): number;
export function deploy_withAccount(a: number, b: number, c: number, d: number): number;
export function deploy_withEntryPoint(a: number, b: number, c: number, d: number, e: number): number;
export function deploy_withSecretKey(a: number, b: number, c: number): number;
export function deploy_withStandardPayment(a: number, b: number, c: number, d: number, e: number): number;
export function deploy_validateDeploySize(a: number): number;
export function deploy_isValid(a: number): number;
export function deploy_hasValidHash(a: number): number;
export function deploy_isExpired(a: number): number;
export function deploy_sign(a: number, b: number, c: number): number;
export function deploy_footprint(a: number): number;
export function deploy_approvalsHash(a: number): number;
export function deploy_addArg(a: number, b: number, c: number, d: number): number;
export function __wbg_deploystrparams_free(a: number): void;
export function deploystrparams_new(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number): number;
export function deploystrparams_secret_key(a: number, b: number): void;
export function deploystrparams_set_secret_key(a: number, b: number, c: number): void;
export function deploystrparams_timestamp(a: number, b: number): void;
export function deploystrparams_set_timestamp(a: number, b: number, c: number): void;
export function deploystrparams_ttl(a: number, b: number): void;
export function deploystrparams_set_ttl(a: number, b: number, c: number): void;
export function deploystrparams_chain_name(a: number, b: number): void;
export function deploystrparams_set_chain_name(a: number, b: number, c: number): void;
export function deploystrparams_session_account(a: number, b: number): void;
export function deploystrparams_set_session_account(a: number, b: number, c: number): void;
export function __wbg_dictionaryitemstrparams_free(a: number): void;
export function dictionaryitemstrparams_new(): number;
export function dictionaryitemstrparams_set_account_named_key(a: number, b: number, c: number, d: number, e: number, f: number, g: number): void;
export function dictionaryitemstrparams_set_contract_named_key(a: number, b: number, c: number, d: number, e: number, f: number, g: number): void;
export function dictionaryitemstrparams_set_uref(a: number, b: number, c: number, d: number): void;
export function dictionaryitemstrparams_set_dictionary(a: number, b: number, c: number): void;
export function __wbg_uref_free(a: number): void;
export function uref_new(a: number, b: number, c: number, d: number): void;
export function uref_fromUint8Array(a: number, b: number, c: number): number;
export function sdk_new(): number;
export function __wbg_sdk_free(a: number): void;
export function bytes_innerBytes(a: number): number;
export function __wbg_argssimple_free(a: number): void;
export function __wbg_dictionaryitemidentifier_free(a: number): void;
export function dictionaryitemidentifier_new_from_account_info(a: number, b: number, c: number, d: number, e: number): number;
export function dictionaryitemidentifier_new_from_contract_info(a: number, b: number, c: number, d: number, e: number): number;
export function dictionaryitemidentifier_new_from_seed_uref(a: number, b: number, c: number): number;
export function __wbg_digest_free(a: number): void;
export function digest_new(a: number, b: number, c: number): void;
export function digest_fromDigest(a: number, b: number, c: number): void;
export function __wbg_publickey_free(a: number): void;
export function publickey_new(a: number, b: number, c: number): void;
export function publickey_fromUint8Array(a: number, b: number): number;
export function sdk_make_deploy(a: number, b: number, c: number, d: number): number;
export function hexToUint8Array(a: number, b: number, c: number): void;
export function jsonPrettyPrint(a: number, b: number): number;
export function privateToPublicKey(a: number, b: number): number;
export function getTimestamp(): number;
export function __wbindgen_malloc(a: number, b: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number, d: number): number;
export const __wbindgen_export_2: WebAssembly.Table;
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd0d6e959b0cbb07a(a: number, b: number, c: number): void;
export function __wbindgen_add_to_stack_pointer(a: number): number;
export function __wbindgen_free(a: number, b: number, c: number): void;
export function __wbindgen_exn_store(a: number): void;
export function wasm_bindgen__convert__closures__invoke2_mut__h70dd628200031030(a: number, b: number, c: number, d: number): void;
