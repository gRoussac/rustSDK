import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ENV_CONFIG, ENV_CONFIG as ENV, EnvironmentConfig } from '@util/config';
import { SDK_TOKEN } from '@util/wasm';
import { SDK, Verbosity, getStateRootHashOptions } from "casper-sdk";

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
  node_address = '';
  status = '';
  peers = [];

  @ViewChild('selectKeyElt') selectKeyElt!: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    @Inject(ENV) public readonly env: EnvironmentConfig,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.node_address = env['node_address'];
  }

  async ngOnInit(): Promise<void> {
    console.log(this.sdk);
  }


  async selectAction($event: Event) {
    const value = ($event.target as HTMLInputElement).value;
    console.log(value);
    this.peers = [], this.status = '';
    switch (value) {
      case 'get_peers': {
        const peers_result = await this.sdk.get_peers(this.env['node_address'], Verbosity.High);
        if (peers_result) {
          this.peers = peers_result.result.peers;
        }
      }
        break;
      case 'get_status': {
        const status_result = await this.sdk.get_node_status(this.env['node_address'], Verbosity.High);
        if (status_result) {
          this.status = status_result;
        }
      }
        break;
    }
    this.changeDetectorRef.markForCheck();
  }

  async ngAfterViewInit() {
    const options: getStateRootHashOptions = this.sdk.get_state_root_hash_options({
      node_address: this.env['node_address']
    });
    const state_root_hash = await this.sdk.get_state_root_hash(options);
    this.state_root_hash = state_root_hash.result?.state_root_hash;
    this.changeDetectorRef.markForCheck();
  }

}
