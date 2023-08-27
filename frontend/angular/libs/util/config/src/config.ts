export type EnvironmentConfig = {
  [key: string]: string;
};
const pubKey_default =
  '0115c9b40c06ff99b0cbadf1140b061b5dbf92103e66a6330fbcc7768f5219c1ce';
const secret_key_default = `-----BEGIN PRIVATE KEY-----
  MC4CAQAwBQYDK2VwBCIEIFQBgrG+PRSS0uehoYE15rjUP1J28UIjGWGvNpcsw+xU
  -----END PRIVATE KEY-----`;
export const config: EnvironmentConfig = {
  chainName_localhost: "casper-net-1",
  path_sep: "/",
  gasPrice: '1',
  gasFee: '1500000000',
  minimumTransfer: '2500000000',
  TTL: '1800000',
  gasFeeTransfer: '10000',
  pubKey_default,
  secret_key_default,
  block_identifier_height_default: '1958541',
  block_identifier_hash: '372e4c83a6ca19c027d3daf4807ad8fc16b9f01411ef39d5e00888128bf4fd59'
};