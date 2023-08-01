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
  hexToUint8Array,
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
      const chain_get_state_root_hash = await sdk.chain_get_state_root_hash(
        host,
        Verbosity.High,
        undefined
      );
      setHash(chain_get_state_root_hash.result.state_root_hash);
      console.log('js chain_get_state_root_hash', chain_get_state_root_hash);

      const chain_get_block = await sdk.chain_get_block(
        host,
        Verbosity.High,
        BlockIdentifier.fromHeight(block_identifier_height)
      );
      console.log('js chain_get_block', chain_get_block);

      let hex_str =
        '397acea5a765565c7d11839f2d30bf07a8e7740350467d3a358f596835645445';
      let deploy_hash = new DeployHash(hex_str);
      let finalized_approvals = true;
      const info_get_deploy = await sdk.get_deploy(
        host,
        Verbosity.High,
        deploy_hash,
        finalized_approvals
      );

      console.log('js info_get_deploy', info_get_deploy);
      const state_get_account_info = await sdk.state_get_account_info(
        host,
        Verbosity.High,
        BlockIdentifier.fromHeight(block_identifier_height),
        '0115c9b40c06ff99b0cbadf1140b061b5dbf92103e66a6330fbcc7768f5219c1ce'
      );
      console.log('js state_get_account_info', state_get_account_info);

      const addressHex =
        'b1d24c7a1502d70d8cf1ad632c5f703e5f3be0622583a00e47cad08a59025d2e';
      const accessRights = 7; // or 0o07 in octal notation
      const addressBytes = hexToUint8Array(addressHex);
      const uref = new URef(addressBytes, accessRights);
      const stateRootHashHex = chain_get_state_root_hash.result.state_root_hash;
      const stateRootHashBytes = hexToUint8Array(stateRootHashHex);
      const state_get_balance = await sdk.state_get_balance(
        host,
        Verbosity.High,
        new Digest(stateRootHashBytes),
        uref
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
        Verbosity.High,
        new Digest(stateRootHashBytes),
        dictionary_item_identifier
      );
      console.log('js state_get_dictionary_item', state_get_dictionary_item);

      const uref_addressHex =
        'b57dfc006ca3cff3f3f17852447d3de86ca69c1086405097ceda3b2a492290e8'; // named key "name" should be "USDC" parsed value
      const uref_addressBytes = hexToUint8Array(uref_addressHex);

      const query_global_state = await sdk.query_global_state(
        host,
        Verbosity.High,
        GlobalStateIdentifier.fromStateRootHash(new Digest(stateRootHashBytes)),
        Key.fromURef(new URef(uref_addressBytes, 1)),
        new Path([])
      );
      console.log('js query_global_state', query_global_state);

      const deployAsString =
        '{"hash":"1fca183a9760e3925657867c3c17946ffc8c37ae68f55d6a6af529e2e12af043","header":{"account":"01d589b1ff893657417d180148829e2e0c509182f0f4678c2af7d1ddd58012ccd9","timestamp":"2023-07-31T16:10:04.463Z","ttl":"30m","gas_price":1,"body_hash":"0f7bbc79a5f02f2621347005c62fb440d8d07d5c97e2cd11da090da24989f61f","dependencies":[],"chain_name":"integration-test"},"payment":{"ModuleBytes":{"module_bytes":"","args":[["amount",{"bytes":"058e31a6553a","cl_type":"U512"}]]}},"session":{"StoredContractByHash":{"hash":"9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477","entry_point":"decimals","args":[]}},"approvals":[{"signer":"01d589b1ff893657417d180148829e2e0c509182f0f4678c2af7d1ddd58012ccd9","signature":"018e64c442f6a4ccae0758bcf43a3f76a36e3d3744332d65ee1cafd0b2f30ffa362ad14c500742ed58c3736a863de34e1266c354f76e5915ac991c834aee3aeb08"}]}';

      let deploy = new Deploy(JSON.parse(deployAsString));
      console.log(deploy);
      const account_put_deploy = await sdk.account_put_deploy(
        host,
        Verbosity.High,
        deploy
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
