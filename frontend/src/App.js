import { useEffect, useState } from 'react';
import './App.css';

import init, { SDK, InitOutput } from 'mytest';

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
      const hash_as_string = await sdk.get_state_root_hash();
      setHash(hash_as_string);
      const hash = JSON.parse(hash_as_string);
      setHash(hash);
      console.log(hash);
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
