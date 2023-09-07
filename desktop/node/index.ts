const casper_wasm_sdk = require('casper-wasm-sdk');
const { SDK, privateToPublicKey, Verbosity, GetPeersResult } = casper_wasm_sdk;
const http = require('http');

let sdk: typeof SDK;
const node_address = 'http://localhost:11101';

setup();

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  let peers_object = (await get_peers());
  console.log(peers_object.peers);
  console.log(peers_object.toJson());
  res.end(JSON.stringify(peers_object.peers));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function setup() {
  sdk = new SDK();
}

async function get_peers() {
  return await sdk.get_peers(node_address, Verbosity.High);
}

