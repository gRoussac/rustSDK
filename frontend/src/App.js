/* global BigInt */

import { useEffect, useState } from 'react';
import './App.css';

import init, {
  SDK,
  Verbosity,
  DeployHash,
  URef,
  Key,
  Digest,
  DictionaryItemIdentifier,
  BlockIdentifier,
  GlobalStateIdentifier,
  Path,
  Deploy,
} from 'casper-wasm-sdk';

const host = 'http://localhost:3000';
const block_identifier_height = BigInt(1958541);

function App() {
  const [wasm, setWasm] = useState();
  const [ready, setReady] = useState(false);
  const [hash, setHash] = useState('');

  let test = false;

  const fetchWasm = async () => {
    // console.log('fetchWasm');
    const wasm = await init();
    //console.log(wasm);
    setWasm(wasm);
  };

  const initApp = async () => {
    setReady(false);
    if (!wasm) {
      await fetchWasm();
    }
    const sdk = SDK.new();
    console.log(sdk);

    try {
      const get_state_root_hash = await sdk.get_state_root_hash(
        host,
        BlockIdentifier.fromHeight(block_identifier_height),
        Verbosity.High
      );
      setHash(get_state_root_hash.result.state_root_hash);
      console.log('js get_state_root_hash', get_state_root_hash);

      const chain_get_block = await sdk.chain_get_block(
        host,
        BlockIdentifier.fromHeight(block_identifier_height),
        Verbosity.High
      );
      console.log('js chain_get_block', chain_get_block);

      let hex_str =
        '397acea5a765565c7d11839f2d30bf07a8e7740350467d3a358f596835645445';
      let deploy_hash = new DeployHash(hex_str);
      const info_get_deploy = await sdk.info_get_deploy(
        host,
        deploy_hash,
        true,
        Verbosity.High
      );

      console.log('js info_get_deploy', info_get_deploy);
      const state_get_account_info = await sdk.state_get_account_info(
        host,
        '0115c9b40c06ff99b0cbadf1140b061b5dbf92103e66a6330fbcc7768f5219c1ce',
        BlockIdentifier.fromHeight(block_identifier_height),
        Verbosity.High
      );
      console.log('js state_get_account_info', state_get_account_info);

      const addressHex =
        'b1d24c7a1502d70d8cf1ad632c5f703e5f3be0622583a00e47cad08a59025d2e';
      const accessRights = 7; // or 0o07 in octal notation
      const addressBytes = hexToUint8Array(addressHex);
      const uref = new URef(addressBytes, accessRights);
      const stateRootHashHex = get_state_root_hash.result.state_root_hash;
      const stateRootHashBytes = hexToUint8Array(stateRootHashHex);
      const state_get_balance = await sdk.state_get_balance(
        host,
        new Digest(stateRootHashBytes),
        uref,
        Verbosity.High
      );
      console.log('js state_get_balance', state_get_balance);

      const dict_addressHex =
        '386f3d77417ac76f7c0b8d5ea8764cb42de8e529a091da8e96e5f3c88f17e530'; // event
      const dict_addressBytes = hexToUint8Array(dict_addressHex);
      const seedURef = new URef(dict_addressBytes, accessRights);
      const dictionary_item_identifier = new DictionaryItemIdentifier(
        seedURef,
        '0' // event key
      );
      const state_get_dictionary_item = await sdk.state_get_dictionary_item(
        host,
        new Digest(stateRootHashBytes),
        dictionary_item_identifier,
        Verbosity.High
      );
      console.log('js state_get_dictionary_item', state_get_dictionary_item);

      const uref_addressHex =
        'b57dfc006ca3cff3f3f17852447d3de86ca69c1086405097ceda3b2a492290e8'; // named key "name" should be "USDC" parsed value
      const uref_addressBytes = hexToUint8Array(uref_addressHex);

      const query_global_state = await sdk.query_global_state(
        host,
        GlobalStateIdentifier.fromStateRootHash(new Digest(stateRootHashBytes)),
        Key.fromURef(new URef(uref_addressBytes, 1)),
        new Path([]),
        Verbosity.High
      );
      console.log('js query_global_state', query_global_state);

      const deployJson =
        '{"hash":"8e403531b00823aaac1035a6133ef9e9ae66572a792aba11d97d73295010e1ec","header":{"account":"01d589b1ff893657417d180148829e2e0c509182f0f4678c2af7d1ddd58012ccd9","timestamp":"2023-07-31T15:36:18.964Z","ttl":"30m","gas_price":1,"body_hash":"0f7bbc79a5f02f2621347005c62fb440d8d07d5c97e2cd11da090da24989f61f","dependencies":[],"chain_name":"integration-test"},"payment":{"ModuleBytes":{"module_bytes":"","args":[["amount",{"bytes":"058e31a6553a","cl_type":"U512"}]]}},"session":{"StoredContractByHash":{"hash":"9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477","entry_point":"decimals","args":[]}},"approvals":[{"signer":"01d589b1ff893657417d180148829e2e0c509182f0f4678c2af7d1ddd58012ccd9","signature":"0136987c507b09238895836c7e61f480da4e08a71ac655e2f9e3235e15b0d6454712d7b6942609d7fcf3e40d57915a639cc476d03889478a7b07ff583aea93c807"}]}';

      let deploy = await new Deploy(JSON.parse(deployJson));
      console.log(deploy);
      const account_put_deploy = await sdk.account_put_deploy(
        host,
        deploy,
        Verbosity.High
      );
      console.log('js account_put_deploy', account_put_deploy);
    } catch (error) {
      console.error(error);
    }
    setReady(true);
  };

  useEffect(() => {
    if (!test) {
      test = true;
      initApp();
    }
  }, [test]);

  return (
    <div className="App">
      <>
        <div>
          <br /> <br />
          State root hash
          <br /> <br />
          {hash}
          <br />
        </div>
      </>
    </div>
  );
}

export default App;

function hexToUint8Array(hexString) {
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
  }
  return bytes;
}
