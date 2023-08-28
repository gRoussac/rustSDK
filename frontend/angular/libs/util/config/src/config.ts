export type EnvironmentConfig = {
  [key: string]: string;
};
export const config: EnvironmentConfig = {
  chain_name_localhost: "casper-net-1",
  chain_name_integration: "integration-test",
  chain_name_test: "casper-test",
  chain_name_mainnet: "casper",
  path_sep: "/",
  gas_price: '1',
  gas_fee: '1500000000',
  minimum_transfer: '2500000000',
  TTL: '30m',
  gas_fee_transfer: '10000',
  block_identifier_height_default: '1958541',
  block_identifier_hash: '372e4c83a6ca19c027d3daf4807ad8fc16b9f01411ef39d5e00888128bf4fd59'
};