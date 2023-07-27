/* global BigInt */

import { useEffect, useState } from 'react';
import './App.css';

import init, { SDK, Verbosity, DeployHash } from 'mytest';

const host = 'http://localhost:3000';

function App() {
  const [wasm, setWasm] = useState();
  const [ready, setReady] = useState(false);
  const [hash, setHash] = useState({});

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
      const hash = JSON.parse(get_state_root_hash);
      setHash(hash);
      console.log('js get_state_root_hash', get_state_root_hash);

      const chain_get_block = await sdk.chain_get_block(
        host,
        BigInt('8'),
        Verbosity.High
      );
      const block = JSON.parse(chain_get_block);
      console.log('js chain_get_block', block);

      let hex_str =
        '397acea5a765565c7d11839f2d30bf07a8e7740350467d3a358f596835645445';
      let deploy_hash = new DeployHash(hex_str);
      const info_get_deploy = await sdk.info_get_deploy(
        host,
        deploy_hash,
        true,
        Verbosity.High
      );
      const info = JSON.parse(info_get_deploy);
      console.log('js  info', info);
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
          {hash && hash.result && hash.result.state_root_hash}
          <br />
        </div>
      </>
    </div>
  );
}

export default App;
