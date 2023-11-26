export type InputField = {
  id: string;
  type?: string;
  wrap_class?: string;
  class: string;
  label: string;
  label_class?: string;
  name: string;
  controlName: string;
  placeholder?: string;
  e2e: string;
  state_name?: string[];
  config_name?: string;
  maxlength?: string,
  pattern?: string,
  placeholder_config_value?: string;
  change?: string;
  disabled_when?: string[];
};

export type InputContainer = {
  input?: InputField;
  textarea?: InputField;
  required?: boolean;
  wasm_button?: boolean;
  file_button?: boolean;
};

const blockIdentifierHeight: InputField = {
  id: 'blockIdentifierHeightElt',
  type: 'search',
  wrap_class: 'col-sm-2 mb-2',
  class: 'form-control',
  label: 'Block Height',
  name: 'block_identifier_height',
  controlName: 'blockIdentifierHeight',
  placeholder: 'Block Height',
  e2e: 'blockIdentifierHeightElt'
};

const blockIdentifierHash: InputField = {
  id: 'blockIdentifierHashElt',
  type: 'search',
  wrap_class: 'col-sm-6 mb-2',
  class: 'form-control',
  label: 'Block Hash',
  name: 'block_identifier_hash',
  controlName: 'blockIdentifierHash',
  placeholder: 'Block Hash',
  e2e: 'blockIdentifierHashElt',
};

const accountIdentifier: InputField = {
  id: 'accountIdentifierElt',
  type: 'search',
  wrap_class: 'col-sm-7',
  class: 'form-control',
  label: 'Account identifier *',
  name: 'account_identifier',
  controlName: 'accountIdentifier',
  placeholder: 'Public Key, AccountHash, Purse URef',
  e2e: 'accountIdentifierElt',
  state_name: ['account_hash', 'public_key', 'main_purse'],
};

const stateRootHash: InputField = {
  id: 'stateRootHashElt',
  type: 'search',
  wrap_class: 'col-sm-6 mb-2',
  class: 'form-control',
  label: 'State Root Hash',
  name: 'state_root_hash',
  controlName: 'stateRootHash',
  placeholder: '0x',
  e2e: 'stateRootHashElt',
  state_name: ['state_root_hash'],
};

const purseUref: InputField = {
  id: 'purseUrefElt',
  type: 'search',
  wrap_class: 'col-sm-7 mb-2',
  class: 'form-control',
  label: 'Purse Uref',
  name: 'purse_uref',
  controlName: 'purseUref',
  placeholder: 'uref-0x',
  e2e: 'purseUrefElt',
  state_name: ['main_purse'],
};

const purseIdentifier: InputField = {
  id: 'purseIdentifierElt',
  type: 'search',
  wrap_class: 'col-sm-7 mb-2',
  class: 'form-control',
  label: 'Purse Identifier',
  name: 'purse_identifier',
  controlName: 'purseIdentifier',
  placeholder: 'Public Key, AccountHash, Purse URef',
  e2e: 'purseIdentifierElt',
  state_name: ['main_purse', 'account_hash', 'public_key'],
};

const transferAmount: InputField = {
  id: 'transferAmountElt',
  type: 'tel',
  wrap_class: 'col-sm-3 mb-2',
  class: 'form-control',
  label: 'Transfer Amount',
  name: 'transfer_amount',
  controlName: 'transferAmount',
  e2e: 'transferAmountElt',
  config_name: 'minimum_transfer',
  maxlength: "28",
  pattern: "\\d*",
  change: "motesToCSPR"
};

const paymentAmount: InputField = {
  id: 'paymentAmountElt',
  type: 'tel',
  wrap_class: 'col-sm-3 mb-2',
  class: 'form-control',
  label: 'Payment Amount',
  name: 'payment_amount',
  controlName: 'paymentAmount',
  placeholder: '',
  e2e: 'paymentAmountElt',
  state_name: ['payment_amount'],
  change: "motesToCSPR"
};

const ttlInput: InputField = {
  id: 'TTLElt',
  type: 'search',
  wrap_class: 'col-sm-1 mb-2',
  class: 'form-control',
  label: 'TTL',
  name: 'ttl',
  controlName: 'TTL',
  e2e: 'TTLElt',
  config_name: 'TTL',
};

const targetAccount: InputField = {
  id: 'targetAccountElt',
  type: 'search',
  wrap_class: 'col-sm-7',
  class: 'form-control',
  label: 'Target Account',
  name: 'target_account',
  controlName: 'targetAccount',
  placeholder: 'Public Key, AccountHash, Purse URef',
  e2e: 'targetAccountElt',
  state_name: ['target_account'],
};

const sessionHash: InputField = {
  id: 'sessionHashElt',
  type: 'search',
  wrap_class: 'col-sm-6 mb-2',
  class: 'form-control',
  label: 'Smart Contract hash or Package hash',
  name: 'session_hash',
  controlName: 'sessionHash',
  placeholder: 'Contract Hash or Package Hash',
  e2e: 'sessionHashElt',
  state_name: ['session_hash'],
  disabled_when: ['has_wasm', 'sessionName.value']
};

const callPackage: InputField = {
  id: 'callPackageElt',
  type: 'checkbox',
  wrap_class: 'col-sm-2 mb-2',
  class: 'form-check-input mt-0',
  label: 'Call Package',
  name: 'call_package',
  controlName: 'callPackage',
  placeholder: '',
  e2e: 'callPackageElt',
  label_class: 'form-label',
  disabled_when: ['has_wasm']
};

const versionInput: InputField = {
  id: 'versionElt',
  type: 'search',
  wrap_class: 'col-sm-3 mb-2',
  class: 'form-control',
  label: 'Version',
  name: 'version',
  controlName: 'version',
  placeholder: 'e.g.1, empty for last version',
  e2e: 'versionElt',
  state_name: ['version'],
  disabled_when: ['has_wasm']
};

const sessionNameInput: InputField = {
  id: 'sessionNameElt',
  type: 'search',
  wrap_class: 'col-sm-7 mb-2',
  class: 'form-control',
  label: 'Smart Contract name or Package name',
  name: 'session_name',
  controlName: 'sessionName',
  placeholder: 'Counter',
  e2e: 'sessionNameElt',
  state_name: ['session_name'],
  disabled_when: ['has_wasm', 'sessionHash.value']
};

const entryPointInput: InputField = {
  id: 'entryPointElt',
  type: 'search',
  wrap_class: 'col-sm-5 mb-2',
  class: 'form-control',
  label: 'Entry point',
  name: 'entry_point',
  controlName: 'entryPoint',
  placeholder: 'counter_inc',
  e2e: 'entryPointElt',
  state_name: ['entry_point'],
  disabled_when: ['has_wasm']
};

const argsSimpleInput: InputField = {
  id: 'argsSimpleElt',
  type: 'search',
  wrap_class: 'col-sm-8 mb-2',
  class: 'form-control',
  label: 'Args',
  name: 'args_simple',
  controlName: 'argsSimple',
  placeholder: 'foo:Bool=\'true\', bar:String=\'value\'',
  e2e: 'argsSimpleElt',
  state_name: ['args_simple'],
  disabled_when: ['argsJson.value']
};

const argsJson: InputField = {
  id: 'argsJsonElt',
  type: 'search',
  wrap_class: 'col-sm-8 mb-2',
  class: 'form-control',
  label: 'Args Json',
  name: 'args_json',
  controlName: 'argsJson',
  placeholder: '[{ "name": "foo", "type": "U256", "value": 1 }]',
  e2e: 'argsJsonElt',
  state_name: ['args_json'],
  disabled_when: ['argsSimple.value']
};

const deployHash: InputField = {
  id: 'deployHashElt',
  type: 'search',
  wrap_class: 'col-sm-6',
  class: 'form-control',
  label: 'Deploy Hash',
  name: 'deploy_hash',
  controlName: 'deployHash',
  placeholder: '0x',
  e2e: 'deployHashElt',
};

const finalizedApprovals: InputField = {
  id: 'finalizedApprovalsElt',
  type: 'checkbox',
  wrap_class: 'col-sm-2',
  class: 'form-check-input mt-0',
  label: 'Finalized approvals',
  name: 'finalized_approvals',
  controlName: 'finalizedApprovals',
  placeholder: '',
  e2e: 'finalizedApprovalsElt',
  label_class: 'form-label',
};

const seedUref: InputField = {
  id: 'seedUrefElt',
  type: 'search',
  wrap_class: 'col-sm-7 mb-2',
  class: 'form-control',
  label: 'Dictionary Uref',
  name: 'seed_uref',
  controlName: 'seedUref',
  placeholder: 'uref-0x',
  e2e: 'seedUrefElt',
  state_name: ['seed_uref'],
};

const seedAccountHash: InputField = {
  id: 'seedAccountHashElt',
  type: 'search',
  wrap_class: 'col-sm-7 mb-2',
  class: 'form-control',
  label: 'Account Hash',
  name: 'seed_account_hash',
  controlName: 'seedAccountHash',
  placeholder: 'account-hash-0x',
  e2e: 'seedAccountHashElt',
  state_name: ['seed_account_hash'],
};

const seedContractHash: InputField = {
  id: 'seedContractHashElt',
  type: 'search',
  wrap_class: 'col-sm-6 mb-2',
  class: 'form-control',
  label: 'Contract Hash',
  name: 'seed_contract_hash',
  controlName: 'seedContractHash',
  placeholder: 'hash-0x',
  e2e: 'seedContractHashElt',
  state_name: ['seed_contract_hash'],
};

const seedKey: InputField = {
  id: 'seedKeyElt',
  type: 'search',
  wrap_class: 'col-sm-7 mb-2',
  class: 'form-control',
  label: 'Dictionary Key',
  name: 'seed_key',
  controlName: 'seedKey',
  placeholder: 'dictionary-0x',
  e2e: 'seedKeyElt',
  state_name: ['seed_key'],
};

const seedName: InputField = {
  id: 'seedNameElt',
  type: 'search',
  wrap_class: 'col-sm-4 mb-2',
  class: 'form-control',
  label: 'Dictionary Name',
  name: 'seed_name',
  controlName: 'seedName',
  placeholder: 'events',
  e2e: 'seedNameElt',
  state_name: ['seed_name'],
};

const itemKey: InputField = {
  id: 'itemKeyElt',
  type: 'search',
  wrap_class: 'col-sm-6 mb-2',
  class: 'form-control',
  label: 'Dictionary Item key',
  name: 'item_key',
  controlName: 'itemKey',
  placeholder: 'Item key string',
  e2e: 'itemKeyElt',
  state_name: ['item_key'],
};

const queryKey: InputField = {
  id: 'queryKeyElt',
  type: 'search',
  wrap_class: 'col-sm-7 mb-2',
  class: 'form-control',
  label: 'Key',
  name: 'query_key',
  controlName: 'queryKey',
  placeholder: 'uref-0x || hash-0x || account-hash-0x',
  e2e: 'queryKeyElt',
};

const queryContractKey: InputField = {
  ...queryKey,
  label: 'Contract Hash',
  placeholder: 'hash-0x',
};

const queryPath: InputField = {
  id: 'queryPathElt',
  type: 'search',
  wrap_class: 'col-sm-4 mb-2',
  class: 'form-control',
  label: 'Path',
  name: 'query_path',
  controlName: 'queryPath',
  placeholder: 'counter/count',
  e2e: 'queryPathElt',
  state_name: ['query_path'],
};

const deployJson: InputField = {
  id: 'deployJsonElt',
  type: 'textarea',
  wrap_class: 'col-sm-12',
  class: 'form-control',
  label: 'Deploy as Json string',
  name: 'deploy_json',
  controlName: 'deployJson',
  placeholder: 'Deploy as Json string',
  e2e: 'deployJsonElt',
  state_name: ['deploy_json'],
};

const getBlockFields: InputContainer[][] = [
  [{ input: blockIdentifierHeight }, { input: blockIdentifierHash }]
];

const getAccountFields: InputContainer[][] = [
  ...getBlockFields,
  [{ input: accountIdentifier, required: true }],
];

const getBalanceFields: InputContainer[][] = [
  [{ input: stateRootHash }],
  [{ input: purseUref, required: true }],
];

const queryBalanceFields: InputContainer[][] = [
  ...getBlockFields,
  [{ input: stateRootHash }],
  [{ input: purseIdentifier, required: true }],
];

const queryGlobalStateFields: InputContainer[][] = [
  ...getBlockFields,
  [{ input: stateRootHash }],
  [{ input: queryKey, required: true }],
  [{ input: queryPath }],
];

const queryContractDictFields: InputContainer[][] = [
  [{ input: stateRootHash }],
  [{ input: seedContractHash }],
  [{ input: seedName }],
  [{ input: itemKey }],
];

const queryContractKeyFields: InputContainer[][] = [
  [{ input: stateRootHash }],
  [{ input: queryContractKey }],
  [{ input: queryPath }],
];

const getDictionaryItemFields: InputContainer[][] = [
  [{ input: stateRootHash }],
  [{ input: seedContractHash }],
  [{ input: seedName }],
  [{ input: itemKey }],
];

const getDeployFields: InputContainer[][] = [
  [{ input: deployHash, required: true }, { input: finalizedApprovals }],
];

const getTransferFields: InputContainer[][] = [
  [{ input: transferAmount, required: true }, { input: ttlInput }],
  [{ input: targetAccount, required: true }],
];

const getSpeculativeTransferFields: InputContainer[][] = [
  ...getBlockFields,
  ...getTransferFields
];

const installFields: InputContainer[][] = [
  [{ input: paymentAmount, required: true }, { input: ttlInput }, { wasm_button: true }],
  [{ input: argsSimpleInput }],
  [{ input: argsJson }],
];

const makeDeployFields: InputContainer[][] = [
  [{ input: paymentAmount, required: true }, { input: ttlInput }, { wasm_button: true }],
  [{ input: sessionHash, required: true }, { input: callPackage }, { input: versionInput }],
  [{ input: sessionNameInput, required: true }],
  [{ input: entryPointInput, required: true }],
  [{ input: argsSimpleInput }],
  [{ input: argsJson }],
];

const speculativeDeployFields: InputContainer[][] = [
  ...getBlockFields,
  ...makeDeployFields
];

const callEntrypointFields: InputContainer[][] = [
  [{ input: paymentAmount, required: true }, { input: ttlInput }],
  [{ input: sessionHash }, { input: callPackage }, { input: versionInput }],
  [{ input: sessionNameInput }],
  [{ input: entryPointInput }],
  [{ input: argsSimpleInput }],
  [{ input: argsJson }],
];

const speculativeExecFields: InputContainer[][] = [
  ...getBlockFields,
  [{ file_button: true }],
  [{ textarea: deployJson, required: true }],
];

const putDeployFields: InputContainer[][] = [
  [{ file_button: true }],
  [{ textarea: deployJson, required: true }],
];

const signDeployFields: InputContainer[][] = [
  [{ file_button: true }],
  [{ textarea: deployJson, required: true }],
];

const formFields = new Map<string, InputContainer[][]>([
  ['call_entrypoint', callEntrypointFields],
  ['deploy', makeDeployFields],
  ['get_account', getAccountFields],
  ['get_balance', getBalanceFields],
  ['get_block', getBlockFields],
  ['get_block_transfers', getBlockFields],
  ['get_deploy', getDeployFields],
  ['get_dictionary_item', getDictionaryItemFields],
  ['get_era_info', getBlockFields],
  ['get_era_summary', getBlockFields],
  ['get_state_root_hash', getBlockFields],
  ['install', installFields],
  ['make_deploy', makeDeployFields],
  ['make_transfer', getTransferFields],
  ['put_deploy', putDeployFields],
  ['query_balance', queryBalanceFields],
  ['query_contract_dict', queryContractDictFields],
  ['query_contract_key', queryContractKeyFields],
  ['query_global_state', queryGlobalStateFields],
  ['sign_deploy', signDeployFields],
  ['speculative_deploy', speculativeDeployFields],
  ['speculative_exec', speculativeExecFields],
  ['speculative_transfer', getSpeculativeTransferFields],
  ['transfer', getTransferFields],
]);

export default formFields;