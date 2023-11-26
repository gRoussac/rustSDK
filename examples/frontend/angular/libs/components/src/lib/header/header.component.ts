import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONFIG, ENV, EnvironmentConfig, Network } from '@util/config';
import { PeerEntry, SDK } from 'casper-sdk';
import { SDK_TOKEN } from '@util/wasm';
import { StateService } from '@util/state';

@Component({
  selector: 'comp-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('selectNetworkElt') selectNetworkElt!: ElementRef;

  @Input() peers!: PeerEntry[];

  chain_name = this.env['chain_name'].toString();
  node_address = this.env['node_address'].toString();
  network: Network = {
    name: 'default',
    node_address: this.env['node_address'].toString(),
    chain_name: this.env['chain_name'].toString()
  };

  networks!: Network[];

  constructor(
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    @Inject(ENV) public readonly env: EnvironmentConfig,
    private readonly stateService: StateService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.stateService.setState({
      chain_name: this.chain_name
    });
  }

  async ngAfterViewInit() {
    this.networks = Object.entries(this.config['networks']).map(([name, network]) => ({
      name,
      ...network,
    }));
    this.changeDetectorRef.markForCheck();
  }

  selectNetwork() {
    let network = this.selectNetworkElt.nativeElement.value;
    network = network && this.networks.find(x => x.name == network);
    if (!network) {
      const network = this.selectNetworkElt.nativeElement.value;
      // To do fix chain-name
      if (network) {
        this.node_address = network;
      }
    }
    this.network = network;
    this.chain_name = network.chain_name;
    this.node_address = network.node_address;
    this.sdk.setNodeAddress(this.node_address);
    this.stateService.setState({
      chain_name: network.chain_name
    });
  }

  changePort(peer: PeerEntry) {
    const address = peer.address.split(':');
    const new_address = [this.config['default_protocol'], address.shift(), ':', this.config['default_port']].join('');
    return (new_address);
  }
}
