import { Verbosity } from "casper-sdk";

export type EnvironmentConfig = {
  [key: string]: string | object | Verbosity;
};

const action_needs_secret_key = ['deploy', 'transfer', 'put_deploy', 'speculative_deploy', 'speculative_transfer', 'speculative_exec', 'sign_deploy', 'call_entrypoint', 'install'];
const action_needs_public_key = ['make_deploy', 'make_transfer', ...action_needs_secret_key];

export const config: EnvironmentConfig = {
  wasm_asset_path: 'assets/casper_rust_wasm_sdk_bg.wasm',
  default_action: 'get_node_status',
  verbosity: Verbosity.High,
  minimum_transfer: '2500000000',
  TTL: '30m',
  gas_fee_transfer: '100000000',
  action_needs_secret_key,
  action_needs_public_key,
  networks: {
    'node-launcher': {
      node_address: 'http://localhost:7777',
      stream_address: 'http://localhost:9999/events/main',
      chain_name: 'casper-net-1'
    },
    'ntcl': {
      node_address: 'http://localhost:11101',
      stream_address: 'http://localhost:18101/events/main',
      chain_name: 'casper-net-1'
    },
    'testnet': {
      node_address: 'https://node.testnet.casper.network',
      stream_address: 'https://node.testnet.casper.network/events/main',
      chain_name: 'casper-test'
    },
    'mainnet': {
      node_address: 'https://node.mainnet.casper.network',
      stream_address: 'https://node.mainnet.casper.network/events/main',
      chain_name: 'casper'
    },
    'custom': {
      node_address: 'http://135.181.115.109:7777',
      stream_address: 'http://135.181.115.109:9999/events/main',
      chain_name: 'casper-test'
    },
    'dev': {
      node_address: 'http://localhost:4200',
      stream_address: 'http://localhost:4200/events/main',
      chain_name: 'casper-net-1'
    },
  },
  localhost: 'localhost',
  app_port: '4200',
  default_port: '7777',
  default_protocol: 'http://',
  docker_gateway: '172.17.0.1',
  cors_anywhere_port: '11100',
};