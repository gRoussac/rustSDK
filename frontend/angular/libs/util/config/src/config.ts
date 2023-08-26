export type EnvironmentConfig = {
  [key: string]: string;
};
const pubKey_default =
  '0115c9b40c06ff99b0cbadf1140b061b5dbf92103e66a6330fbcc7768f5219c1ce';
const secret_key = `-----BEGIN PRIVATE KEY-----
  MC4CAQAwBQYDK2VwBCIEIFQBgrG+PRSS0uehoYE15rjUP1J28UIjGWGvNpcsw+xU
  -----END PRIVATE KEY-----`;
export const config: EnvironmentConfig = {
  chainName_localhost: "casper-net-1",
  path_sep: "/",
  gasPrice: '1',
  gasFee: '1500000000',
  minimumTransfer: '2500000000',
  TTL: '1800000',
  gasFeeTransfer: '10000'
};