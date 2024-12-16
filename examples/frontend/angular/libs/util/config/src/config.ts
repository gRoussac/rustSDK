import { Verbosity, PricingMode } from "casper-sdk";

export type EnvironmentConfig = {
  [key: string]: string | object | Verbosity | boolean | PricingMode;
};

const action_needs_secret_key = ['deploy', 'transfer', 'put_deploy', 'speculative_deploy', 'speculative_transfer', 'speculative_exec_deploy', 'sign_deploy', 'call_entrypoint_deploy', 'install'];
const action_needs_public_key = ['make_deploy', 'make_transfer', ...action_needs_secret_key];

export const config: EnvironmentConfig = {
  wasm_asset_path: 'assets/casper_rust_wasm_sdk_bg.wasm',
  default_action: 'get_node_status',
  verbosity: Verbosity.High,
  minimum_transfer: '2500000000',
  TTL: '30m',
  standard_payment_amount: '100000000',
  default_pricing_mode: PricingMode.Classic,
  default_gas_price_tolerance: '1',
  default_additional_computation_factor: '0',
  default_is_install_upgrade: true,
  action_needs_secret_key,
  action_needs_public_key,
  networks: {
    'js-node-launcher': {
      rpc_address: 'http://localhost:7777',
      node_address: 'localhost:7779',
      stream_address: 'http://localhost:9999/events/main',
      chain_name: 'casper-net-1'
    },
    'ntcl': {
      rpc_address: 'http://localhost:11101',
      node_address: 'localhost:4300', // ws proxy to 28101
      stream_address: 'http://localhost:18101/events/main',
      chain_name: 'casper-net-1'
    },
    'integration': {
      rpc_address: 'https://rpc.integration.casperlabs.io',
      node_address: 'localhost:7779',
      stream_address: 'https://events.integration.casperlabs.io/events/main',
      chain_name: 'integration-test'
    },
    'testnet': {
      rpc_address: 'https://rpc.testnet.casperlabs.io',
      node_address: 'localhost:7779',
      stream_address: 'https://events.testnet.casperlabs.io/events/main',
      chain_name: 'casper-test'
    },
    'mainnet': {
      rpc_address: 'https://rpc.mainnet.casperlabs.io',
      node_address: 'localhost:7779',
      stream_address: 'https://events.mainnet.casperlabs.io/events/main',
      chain_name: 'casper'
    },
    'custom': {
      rpc_address: 'http://3.136.227.9:7777',
      node_address: 'localhost:4300', // ws proxy to 28101
      stream_address: 'http://3.136.227.9:9999/events/main',
      chain_name: 'casper-test'
    },
    'dev': {
      rpc_address: 'http://localhost:4200',
      node_address: 'localhost:4300', // ws proxy to 28101
      stream_address: 'http://localhost:4200/events/main',
      chain_name: 'casper-net-1'
    },
  },
  localhost: 'localhost',
  app_port: '4200',
  default_port: '7777',
  default_protocol: 'http://',
};