/* global BigInt */

import { useEffect, useState } from 'react';
import './App.css';

import init, { SDK, Verbosity, DeployHash } from 'casper-wasm-sdk';

const host = 'http://localhost:3000';

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
        BigInt('8'),
        Verbosity.High
      );
      setHash(get_state_root_hash.result.state_root_hash);
      console.log('js get_state_root_hash', get_state_root_hash);

      const chain_get_block = await sdk.chain_get_block(
        host,
        BigInt('8'),
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
