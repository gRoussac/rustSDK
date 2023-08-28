import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CONFIG, ENV, EnvironmentConfig } from '@util/config';
import { SDK_TOKEN } from '@util/wasm';
import { BlockIdentifier, SDK, Verbosity, getBlockOptions, getStateRootHashOptions, DeployHash, GlobalStateIdentifier, Digest, DictionaryItemIdentifier } from "casper-sdk";

const imports = [
  CommonModule,
];


@Component({
  standalone: true,
  imports,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'casper';
  state_root_hash = '';
  peers = [];
  sdk_methods: string[] = [];
  sdk_rpc_methods: string[] = [];
  sdk_contract_methods: string[] = [];
  sdk_deploy_methods: string[] = [];
  sdk_deploy_utils_methods: string[] = [];
  result = '';
  verbosity = Verbosity.High;
  node_address = this.env['node_address'];
  action = '';
  block_identifier_height = '';
  block_identifier_height_default = this.config['block_identifier_height_default'];
  block_identifier_hash = '';
  block_identifier_hash_default = this.config['block_identifier_hash'];
  account_hash = '';
  main_purse = '';
  purse_uref = '';
  finalized_approvals = true;
  deploy_hash = '';
  purse_identifier = '';
  item_key = '';
  select_dict_identifier = 'newFromSeedUref';
  seed_uref = '';
  seed_contract_hash = '';
  seed_account_hash = '';
  seed_name = '';
  seed_key = '';
  query_key = '';
  query_path = '';
  global_identifier = '';
  public_key = '';

  @ViewChild('selectKeyElt') selectKeyElt!: ElementRef;
  @ViewChild('blockIdentifierHeightElt') blockIdentifierHeightElt!: ElementRef;
  @ViewChild('blockIdentifierHashElt') blockIdentifierHashElt!: ElementRef;
  @ViewChild('purseUrefElt') purseUrefElt!: ElementRef;
  @ViewChild('stateRootHashElt') stateRootHashElt!: ElementRef;
  @ViewChild('finalizedApprovalsElt') finalizedApprovalsElt!: ElementRef;
  @ViewChild('deployHashElt') deployHashElt!: ElementRef;
  @ViewChild('purseIdentifierElt') purseIdentifierElt!: ElementRef;
  @ViewChild('itemKeyElt') itemKeyElt!: ElementRef;
  @ViewChild('seedUrefElt') seedUrefElt!: ElementRef;
  @ViewChild('seedAccounttHashElt') seedAccounttHashElt!: ElementRef;
  @ViewChild('seedContractHashElt') seedContractHashElt!: ElementRef;
  @ViewChild('seedNameElt') seedNameElt!: ElementRef;
  @ViewChild('seedKeyElt') seedKeyElt!: ElementRef;
  @ViewChild('queryKeyElt') queryKeyElt!: ElementRef;
  @ViewChild('queryPathElt') queryPathElt!: ElementRef;
  @ViewChild('globalIdentifierElt') globalIdentifierElt!: ElementRef;
  @ViewChild('publicKeyElt') publicKeyElt!: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    @Inject(ENV) public readonly env: EnvironmentConfig,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  async ngOnInit(): Promise<void> {
    console.log(this.sdk);
    this.sdk_methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this.sdk))
      .filter(name => typeof (this.sdk as any)[name] === 'function')
      .filter(name => !['free', 'constructor', '__destroy_into_raw'].includes(name))
      .filter(name => !name.endsWith('_options'))
      .filter(name => !name.startsWith('chain_'))
      .filter(name => !name.startsWith('state_'))
      .filter(name => !name.startsWith('info_'))
      .filter(name => !name.startsWith('account'))
      .sort();

    this.sdk_deploy_methods = this.sdk_methods.filter(name => ['deploy', 'speculative_deploy', 'speculative_transfer', 'transfer'].includes(name));

    this.sdk_deploy_utils_methods = this.sdk_methods.filter(name => ['make_deploy', 'make_transfer', 'sign_deploy'].includes(name));

    this.sdk_contract_methods = this.sdk_methods.filter(name => ['call_entrypoint', 'install', 'query_contract_dict', 'query_contract_key'].includes(name));

    this.sdk_rpc_methods = this.sdk_methods.filter(name => !this.sdk_deploy_methods.concat(this.sdk_deploy_utils_methods, this.sdk_contract_methods).includes(name));
  }

  cleanDisplay() {
    this.result = '';
    this.peers = [];
  }

  async selectAction($event: Event) {
    const action = ($event.target as HTMLInputElement).value;
    await this.execAction(action);
    this.changeDetectorRef.markForCheck();
  }

  async get_peers() {
    const peers_result = await this.sdk.get_peers(this.node_address, this.verbosity);
    if (peers_result) {
      this.peers = peers_result.result.peers;
    }
  }

  async get_node_status() {
    const get_node_status = await this.sdk.get_node_status(this.node_address, this.verbosity);
    get_node_status && (this.result = get_node_status);
  }

  async get_state_root_hash() {
    const options: getStateRootHashOptions = this.sdk.get_state_root_hash_options({
      node_address: this.node_address
    });
    const state_root_hash = await this.sdk.get_state_root_hash(options);
    this.state_root_hash = state_root_hash.result?.state_root_hash;
    this.state_root_hash && (this.result = this.state_root_hash);
  }

  // TODO Refacto with get_block
  async get_account() {
    const account_identifier: string = this.globalIdentifierElt && this.globalIdentifierElt.nativeElement.value.toString().trim();
    if (!account_identifier) {
      return;
    }
    const get_account_options = this.sdk.get_account_options({
      node_address: this.node_address,
      verbosity: this.verbosity,
    });
    get_account_options.account_identifier = account_identifier;
    this.getIdentifieBlock(get_account_options);
    const get_account = await this.sdk.get_account(get_account_options);
    get_account && (this.result = get_account);
    // this.account_hash = get_account?.result?.account.account_hash;
    // this.main_purse = get_account?.result?.account.main_purse;
  }

  async get_auction_info() {
    const get_auction_info_options = this.sdk.get_auction_info_options({
      node_address: this.node_address,
      verbosity: this.verbosity,
    });
    this.getIdentifieBlock(get_auction_info_options);
    const get_auction_info = await this.sdk.get_auction_info(get_auction_info_options);
    get_auction_info && (this.result = get_auction_info);
  }

  async get_balance() {
    const purse_uref_as_string: string = this.purseUrefElt && this.purseUrefElt.nativeElement.value.toString().trim();
    const state_root_hash: string = this.stateRootHashElt && this.stateRootHashElt.nativeElement.value.toString().trim();
    if (!purse_uref_as_string) {
      return;
    }
    const get_balance_options = this.sdk.get_balance_options({
      node_address: this.node_address,
      state_root_hash_as_string: state_root_hash || this.state_root_hash || '',
      purse_uref_as_string,
      verbosity: this.verbosity,
    });
    const get_balance = await this.sdk.get_balance(get_balance_options);
    get_balance && (this.result = get_balance?.result?.balance_value);
  }

  async get_block_transfers() {
    const get_block_transfers_options = this.sdk.get_block_transfers_options({
      node_address: this.node_address,
      verbosity: this.verbosity
    });
    this.getIdentifieBlock(get_block_transfers_options);
    const get_block_transfers = await this.sdk.get_block_transfers(get_block_transfers_options);
    this.result = get_block_transfers;
  }

  async get_block() {
    const chain_get_block_options: getBlockOptions = this.sdk.get_block_options({
      node_address: this.node_address,
      verbosity: this.verbosity
    });
    this.getIdentifieBlock(chain_get_block_options);
    const chain_get_block = await this.sdk.get_block(chain_get_block_options);
    this.result = chain_get_block;
  }

  async submitAction(action: string) {
    await this.execAction(action);
    this.changeDetectorRef.markForCheck();
  }

  async get_chainspec() {
    const get_chainspec = await this.sdk.get_chainspec(this.node_address, this.verbosity);
    this.result = get_chainspec;
  }

  async get_deploy() {
    const finalized_approvals: boolean = this.finalizedApprovalsElt && this.finalizedApprovalsElt.nativeElement.value as boolean;
    const deploy_hash_as_string: string = this.deployHashElt && this.deployHashElt.nativeElement.value.toString().trim();
    if (!deploy_hash_as_string) {
      return;
    }
    const get_deploy_options = this.sdk.get_deploy_options({
      node_address: this.node_address,
      verbosity: this.verbosity,
    });
    get_deploy_options.deploy_hash = new DeployHash(deploy_hash_as_string);
    get_deploy_options.finalized_approvals = finalized_approvals;
    const get_deploy = await this.sdk.get_deploy(get_deploy_options);
    get_deploy && (this.result = get_deploy);
  }

  async get_dictionary_item() {
    const state_root_hash: string = this.stateRootHashElt && this.stateRootHashElt.nativeElement.value.toString().trim();
    const item_key: string = this.itemKeyElt && this.itemKeyElt.nativeElement.value.toString().trim();
    if (!item_key) {
      return;
    }
    const seed_uref: string = this.seedUrefElt && this.seedUrefElt.nativeElement.value.toString().trim();
    let dictionary_item_identifier: DictionaryItemIdentifier | undefined;
    if (seed_uref && this.select_dict_identifier === 'newFromSeedUref') {
      dictionary_item_identifier =
        DictionaryItemIdentifier.newFromSeedUref(
          seed_uref,
          item_key
        );
    } else {
      const seed_key: string = this.seedKeyElt && this.seedKeyElt.nativeElement.value.toString().trim();
      if (seed_key && this.select_dict_identifier === 'newFromDictionaryKey') {
        dictionary_item_identifier =
          DictionaryItemIdentifier.newFromDictionaryKey(
            seed_key
          );
      } else {
        const seed_contract_hash: string = this.seedContractHashElt && this.seedContractHashElt.nativeElement.value.toString().trim();
        const seed_account_hash: string = this.seedAccounttHashElt && this.seedAccounttHashElt.nativeElement.value.toString().trim();
        const seed_name: string = this.seedNameElt && this.seedNameElt.nativeElement.value.toString().trim();
        if (!seed_name) {
          return;
        }
        if (seed_contract_hash && this.select_dict_identifier === 'newFromContractInfo') {
          dictionary_item_identifier =
            DictionaryItemIdentifier.newFromContractInfo(
              seed_contract_hash,
              seed_name,
              item_key
            );
        }
        else if (seed_account_hash && this.select_dict_identifier === 'newFromContractInfo') {
          dictionary_item_identifier =
            DictionaryItemIdentifier.newFromAccountInfo(
              seed_account_hash,
              seed_name,
              item_key
            );
        }
      }
    }
    if (!dictionary_item_identifier) {
      return;
    }
    const get_dictionary_item_options = this.sdk.get_dictionary_item_options({
      node_address: this.node_address,
      verbosity: this.verbosity,
      state_root_hash_as_string: state_root_hash || this.state_root_hash || '',
    });
    get_dictionary_item_options.dictionary_item_identifier = dictionary_item_identifier;
    const state_get_dictionary_item = await this.sdk.state_get_dictionary_item(get_dictionary_item_options);
    state_get_dictionary_item && (this.result = state_get_dictionary_item);
  }

  async get_era_info() {
    const get_era_info_options = this.sdk.get_era_info_options({
      node_address: this.node_address,
      verbosity: this.verbosity
    });
    this.getIdentifieBlock(get_era_info_options);
    const get_era_info = await this.sdk.get_era_info(get_era_info_options);
    this.result = get_era_info;
  }

  async get_era_summary() {
    const get_era_summary_options = this.sdk.get_era_summary_options({
      node_address: this.node_address,
      verbosity: this.verbosity
    });
    this.getIdentifieBlock(get_era_summary_options);
    const get_era_summary = await this.sdk.get_era_summary(get_era_summary_options);
    this.result = get_era_summary;
  }

  async get_validator_changes() {
    const get_validator_changes = await this.sdk.get_validator_changes(this.node_address, this.verbosity);
    this.result = get_validator_changes;
  }

  async list_rpcs() {
    const list_rpcs = await this.sdk.list_rpcs(this.node_address, this.verbosity);
    this.result = list_rpcs;
  }

  async query_balance() {
    const purse_identifier_as_string: string = this.purseIdentifierElt && this.purseIdentifierElt.nativeElement.value.toString().trim();
    if (!purse_identifier_as_string) {
      return;
    }
    const query_balance_options = this.sdk.query_balance_options({
      node_address: this.node_address,
      purse_identifier_as_string,
      verbosity: this.verbosity,
    });
    this.getGlobalIdentifier(query_balance_options);
    const query_balance = await this.sdk.query_balance(query_balance_options);
    query_balance && (this.result = query_balance);
  }

  async query_global_state() {
    const path_as_string: string = this.queryPathElt && this.queryPathElt.nativeElement.value.toString().trim().replace(/^\/+|\/+$/g, '');
    const key_as_string: string = this.queryKeyElt && this.queryKeyElt.nativeElement.value.toString().trim();
    if (!key_as_string) {
      return;
    }
    const query_global_state_options = this.sdk.query_global_state_options({
      node_address: this.node_address,
      key_as_string,
      path_as_string,
      verbosity: Verbosity.High,
    });
    this.getGlobalIdentifier(query_global_state_options);
    const query_global_state = await this.sdk.query_global_state(query_global_state_options);
    query_global_state && (this.result = query_global_state?.result?.stored_value);
  }

  async make_deploy() {
    // deploy_params = new DeployStrParams(
    //   chain_name,
    //   session_account
    // );
    // console.log(deploy_params);

    // let session_params = new SessionStrParams();
    // // Call an erc 20 token in the wild
    // session_params.session_hash =
    //   '9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477';
    // session_params.session_entry_point = 'decimals';
    // session_params.session_args_simple = ["joe:bool='true'", "bob:bool='false'"]; // session_args_simple or session_args_json but not both
    // //session_params.session_args_json = JSON.stringify([{ "name": "joe", "type": "U256", "value": 1 }]); // Arrary of objects as multiple args
    // console.log(session_params);

    // payment_params = new PaymentStrParams();
    // payment_params.payment_amount = '5500000000';
    // console.log(payment_params);

    // // let test_deploy = Deploy.withPaymentAndSession(
    // //   deploy_params,
    // //   session_params,
    // //   payment_params,
    // // );

    // // test_deploy = test_deploy.sign(secret_key);
    // // test_deploy = test_deploy.withTTL('60m', secret_key);
    // // test_deploy = test_deploy.withSession(JSON.parse('{ "StoredContractByHash": { "hash": "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477", "entry_point": "decimals", "args": []}}'));
    // // console.log(test_deploy.toJson());

    // // let test_transfer = Deploy.withTransfer(
    // //   '2500000000',
    // //   '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54',
    // //   undefined,
    // //   deploy_params,
    // //   payment_params,
    // // );
    // // console.log(test_transfer);

    // const make_deploy = sdk.make_deploy(
    //   deploy_params,
    //   session_params,
    //   payment_params,
    // );
    // setMake_deploy(jsonPrettyPrint(make_deploy));
    // console.log(jsonPrettyPrint(make_deploy, Verbosity.Medium));
  }

  async make_transfer() {
    // const session_account =
    //   privateToPublicKey(secret_key);
    // const timestamp = getTimestamp(); // or Date.now().toString().trim(); // or undefined
    // const ttl = '1h';

    // console.log("privateToPublicKey result", session_account);

    // let deploy_params = new DeployStrParams(
    //   chain_name,
    //   session_account,
    //   secret_key,
    //   timestamp,
    //   ttl
    // );
    // console.log(deploy_params);

    // let payment_params = new PaymentStrParams();
    // payment_params.payment_amount = '500000000';
    // console.log(payment_params);

    // // Transfer minimum amount of tokens to recipient
    // const make_transfer = sdk.make_transfer(
    //   '2500000000',
    //   '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54',
    //   undefined, // transfer_id
    //   deploy_params,
    //   payment_params,
    // );
    // setMake_transfer(jsonPrettyPrint(make_transfer));
    // console.log(jsonPrettyPrint(make_transfer, Verbosity.Medium));

  }

  async deploy() {

  }

  async put_deploy() {

  }

  async sign_deploy() {

  }

  async speculative_exec() {

  }

  async speculative_transfer() {

  }

  async speculative_deploy() {

  }



  async call_entrypoint() {
    // // test call entry point
    // let session_account = privateToPublicKey(secret_key);
    // let deploy_params = new DeployStrParams(
    //   chain_name,
    //   session_account,
    //   secret_key
    // );
    // console.log(deploy_params);
    // let session_params = new SessionStrParams();
    // // Call an erc 20 token in the wild
    // session_params.session_hash =
    //   '9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477';
    // session_params.session_entry_point = 'decimals';
    // // let payment_params = new PaymentStrParams();
    // // payment_params.payment_amount = '5500000000';
    // // console.log(payment_params);
    // let test_call_entrypoint = await sdk.call_entrypoint(
    //   host,
    //   deploy_params,
    //   session_params,
    //   '5500000000'
    // );
    // console.log(test_call_entrypoint.result.deploy_hash);
  }

  async install() {
    // const selectedFile = event.target.files?.[0];
    // if (!selectedFile || !(sdk instanceof SDK)) {
    //   return;
    // }
    // const sdkInstance = sdk as SDK;
    // selectedFile && setSessionPath(selectedFile.name);
    // const session_account = privateToPublicKey(secret_key);
    // let deploy_params = new DeployStrParams(
    //   chain_name,
    //   session_account,
    //   secret_key
    // );
    // console.log(deploy_params);
    // let session_params = new SessionStrParams();
    // session_params.session_args_simple = ["message:string='hello casper"];
    // console.log(session_params);
    // const file = event.target.files?.[0];
    // const buffer = await file?.arrayBuffer();
    // const wasm = buffer && new Uint8Array(buffer);
    // const wasmBuffer = wasm?.buffer;
    // if (!wasmBuffer) {
    //   return;
    // }
    // if (wasm) {
    //   let test_install = await sdkInstance.install(
    //     host,
    //     deploy_params,
    //     session_params,
    //     '500000000',
    //     wasm
    //   );
    //   console.log(test_install);
    // } else {
    //   console.error("Failed to read wasm file.");
    // }
  }

  async query_contract_dict() {

  }

  async query_contract_key() {

  }

  async ngAfterViewInit() {
    await this.get_state_root_hash();
    this.changeDetectorRef.markForCheck();
  }

  private async execAction(action: string) {
    const fn = (this as any)[action];
    if (typeof fn === 'function') {
      this.cleanDisplay();
      await fn.bind(this).call();
      this.action = action;
    } else {
      console.error(`Method ${action} is not defined on the component.`);
    }
  }

  private getGlobalIdentifier(options: { global_state_identifier?: GlobalStateIdentifier; }) {
    const state_root_hash: string = this.stateRootHashElt && this.stateRootHashElt.nativeElement.value.toString().trim();
    const global_state_identifier = GlobalStateIdentifier.fromStateRootHash(
      new Digest(state_root_hash || this.state_root_hash)
    );
    options.global_state_identifier = global_state_identifier;
  }

  private getIdentifieBlock(options: { maybe_block_id_as_string?: string; maybe_block_identifier?: BlockIdentifier; }) {
    const block_identifier_height: string = this.blockIdentifierHeightElt && this.blockIdentifierHeightElt.nativeElement.value.toString().trim();
    const block_identifier_hash: string = this.blockIdentifierHashElt && this.blockIdentifierHashElt.nativeElement.value.toString().trim();
    if (block_identifier_hash) {
      options.maybe_block_id_as_string = block_identifier_hash;
      options.maybe_block_identifier = undefined;
    } else if (block_identifier_height) {
      const maybe_block_identifier = BlockIdentifier.fromHeight(BigInt(block_identifier_height));
      options.maybe_block_id_as_string = undefined;
      options.maybe_block_identifier = maybe_block_identifier;
    } else {
      options.maybe_block_id_as_string = undefined;
      options.maybe_block_identifier = undefined;
    }
  }

}
