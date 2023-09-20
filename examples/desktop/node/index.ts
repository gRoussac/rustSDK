const casper_rust_wasm_sdk = require('casper-sdk');
const { SDK } = casper_rust_wasm_sdk;
const http = require('http');

const node_address = 'https://rpc.integration.casperlabs.io';
let sdk: typeof SDK = new SDK(node_address);

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  let peers_object = await sdk.get_peers();
  console.log(peers_object.peers);
  const peers_as_json = peers_object.toJson();
  console.log(peers_as_json);
  res.end(JSON.stringify(peers_as_json));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});