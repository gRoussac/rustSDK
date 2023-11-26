import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { CONFIG, ENV, EnvironmentConfig } from '@util/config';
import { SDK_TOKEN } from '@util/wasm';
import { SDK, PeerEntry, Deploy, Verbosity, jsonPrettyPrint } from "casper-sdk";
import { ResultComponent, HeaderComponent, ErrorComponent, StatusComponent, ActionComponent, SubmitActionComponent, PublicKeyComponent, PrivateKeyComponent, SubmitWasmComponent, SubmitFileComponent } from '@components';
import { Subscription } from 'rxjs';
import { State, StateService } from '@util/state';
import { ResultService } from '@util/result';
import { ClientService } from '@util/client';
import { FormService, InputContainer } from '@util/form';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent, TextareaComponent } from '@util/ui';
import { ErrorService } from '@util/error';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  ResultComponent,
  HeaderComponent,
  ErrorComponent,
  StatusComponent,
  ActionComponent,
  SubmitActionComponent,
  PublicKeyComponent,
  PrivateKeyComponent,
  InputComponent,
  SubmitWasmComponent,
  SubmitFileComponent,
  TextareaComponent
];

@Component({
  standalone: true,
  imports,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Casper client';
  action!: string;
  deploy_json!: string;
  peers!: PeerEntry[];

  item_key!: string;
  seed_uref!: string;
  seed_contract_hash!: string;
  seed_account_hash!: string;
  seed_name!: string;
  seed_key!: string;

  select_dict_identifier = 'newFromContractInfo';

  form: FormGroup<any> = this.formService.form;
  formFields: Map<string, InputContainer[][]> = this.formService.formFields;

  private verbosity = this.config['verbosity'];
  private wasm!: Uint8Array | undefined;
  private stateSubscription!: Subscription;

  @ViewChild('selectDictIdentifierElt') selectDictIdentifierElt!: ElementRef;

  constructor(
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    @Inject(ENV) public readonly env: EnvironmentConfig,
    private readonly clientService: ClientService,
    private readonly resultService: ResultService,
    private readonly stateService: StateService,
    private readonly formService: FormService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly errorService: ErrorService,
  ) { }

  async ngOnInit(): Promise<void> {
    console.info(this.sdk);
  };

  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }

  private setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe((state: State) => {
      state.action && (this.action = state.action);
      state.deploy_json && (this.deploy_json = state.deploy_json);
    });
  }

  async ngAfterViewInit() {
    const no_mark_for_check = true;
    const action = this.config['default_action'].toString();
    try {
      const get_node_status = await this.get_node_status();
      if (get_node_status) {
        await this.get_state_root_hash(no_mark_for_check);
        this.stateService.setState({
          action
        });
      }
    } catch (error) {
      console.error(error);
      this.errorService.setError(error as string);
    }
    this.setStateSubscription();
  }

  async selectAction(action: string) {
    await this.cleanResult();
    this.stateService.setState({
      action
    });
    await this.handleAction(action);
  }

  async submitAction(action: string) {
    this.form.markAsTouched();
    await this.cleanResult();
    const exec = true;
    if (this.form.disabled || this.form.valid) {
      await this.handleAction(action, exec);
      this.changeDetectorRef.markForCheck();
    }
  }

  private async handleAction(action: string, exec?: boolean) {
    const fn = (this as any)[action];
    if (typeof fn === 'function') {
      if (exec) {
        await fn.bind(this).call();
      }
    } else {
      const error = `Method ${action} is not defined on the component.`;
      console.error(error);
      this.errorService.setError(error as string);
    }
  }

  async call_entrypoint() {
    return await this.clientService.call_entrypoint();
  }

  async deploy(deploy_result = true, speculative?: boolean) {
    return await this.clientService.deploy(deploy_result, speculative);
  }

  async get_account(account_identifier_param: string) {
    return await this.clientService.get_account(account_identifier_param);
  }

  async get_auction_info() {
    return await this.clientService.get_auction_info();
  }

  async get_balance() {
    return await this.clientService.get_balance();
  }

  async get_block() {
    return await this.clientService.get_block();
  }

  async get_block_transfers() {
    return await this.clientService.get_block_transfers();
  }

  async get_chainspec() {
    return await this.clientService.get_chainspec();
  }

  async get_deploy() {
    return await this.clientService.get_deploy();
  }

  async get_dictionary_item() {
    return await this.clientService.get_dictionary_item();
  }

  async get_era_info() {
    return await this.clientService.get_era_info();
  }

  async get_era_summary() {
    return await this.clientService.get_era_summary();
  }

  async get_node_status() {
    return await this.clientService.get_node_status();
  }

  async get_peers() {
    return this.peers = await this.clientService.get_peers();
  }

  async get_state_root_hash(no_mark_for_check?: boolean) {
    const state_root_hash = await this.clientService.get_state_root_hash(no_mark_for_check);
    this.stateService.setState({
      state_root_hash
    });
    return state_root_hash;
  }

  async get_validator_changes() {
    return await this.clientService.get_validator_changes();
  }

  async install() {
    return await this.clientService.install(this.wasm);
  }

  async list_rpcs() {
    return await this.clientService.list_rpcs();
  }

  async make_deploy() {
    return await this.clientService.make_deploy();
  }

  async make_transfer() {
    return await this.clientService.make_transfer();
  }

  async put_deploy() {
    return await this.clientService.put_deploy();
  }

  async query_balance() {
    return await this.clientService.query_balance();
  }

  async query_contract_dict() {
    return await this.clientService.query_contract_dict();
  }

  async query_contract_key() {
    return await this.clientService.query_contract_key();
  }

  async query_global_state() {
    return await this.clientService.query_global_state();
  }

  async sign_deploy() {
    return await this.clientService.sign_deploy();
  }

  async speculative_deploy() {
    return await this.clientService.speculative_deploy();
  }

  async speculative_exec() {
    return await this.clientService.speculative_exec();
  }

  async speculative_transfer() {
    return await this.clientService.speculative_transfer();
  }

  async transfer(deploy_result = true, speculative?: boolean) {
    return await this.clientService.transfer(deploy_result, speculative);
  }

  async onDeployFileSelected(deploy_json: string) {
    deploy_json = deploy_json && jsonPrettyPrint(new Deploy(deploy_json).toJson(), this.verbosity as Verbosity);
    deploy_json && this.stateService.setState({
      deploy_json
    });
  }

  async cleanResult() {
    this.errorService.setError('');
    await this.resultService.setResult('');
  }

  async onWasmSelected(wasm: Uint8Array | undefined) {
    wasm && (this.wasm = wasm);
    this.stateService.setState({
      has_wasm: !!wasm
    });
  }

  async copy(value: string) {
    this.resultService.copyClipboard(value);
  }

}
