import { Verbosity } from "casper-sdk";

export type EnvironmentConfig = {
  [key: string]: string | object | Verbosity;
};

const action_needs_private_key = ['deploy', 'transfer', 'put_deploy', 'speculative_deploy', 'speculative_transfer', 'speculative_exec', 'sign_deploy', 'call_entrypoint', 'install'];
const action_needs_public_key = ['make_deploy', 'make_transfer', ...action_needs_private_key];

export const config: EnvironmentConfig = {
  wasm_asset_path: 'assets/casper_rust_wasm_sdk_bg.wasm',
  default_action: 'get_node_status',
  verbosity: Verbosity.High,
  minimum_transfer: '2500000000',
  TTL: '30m',
  gas_fee_transfer: '100000000',
  action_needs_private_key,
  action_needs_public_key,
  networks: {
    localhost: {
      node_address: 'http://localhost:11101',
      chain_name: 'casper-net-1'
    },
    integration: {
      node_address: 'https://rpc.integration.casperlabs.io',
      chain_name: 'integration-test'
    },
    testnet: {
      node_address: 'https://rpc.testnet.casperlabs.io',
      chain_name: 'casper-test'
    },
    mainnet: {
      node_address: 'https://rpc.mainnet.casperlabs.io',
      chain_name: 'casper'
    },
    ip: {
      node_address: 'http://3.136.227.9:7777',
      chain_name: 'integration-test'
    },
  },
  default_port: '7777',
  default_protocol: 'http://',
};