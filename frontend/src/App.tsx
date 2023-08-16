import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
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
  AccessRights,
  PublicKey,
  DeployStrParams,
  SessionStrParams,
  PaymentStrParams,
  hexToUint8Array,
  jsonPrettyPrint,
  privateToPublicKey,
  getTimestamp,
  CLValue,
  CLType,
  Bytes
} from 'casper-wasm-sdk';

const host = 'http://localhost:3000';
const block_identifier_height_default = BigInt(1958541);
const pubKey_default =
  '0115c9b40c06ff99b0cbadf1140b061b5dbf92103e66a6330fbcc7768f5219c1ce';

function App() {
  const [wasm, setWasm] = useState(false);
  const [block_identifier_height, setBlock_identifier_height] = useState(
    block_identifier_height_default
  );
  const [hash, setHash] = useState(false);
  const [pubKey] = useState(pubKey_default);
  const [block, setBlock] = useState('');
  const [info_get_account_info_hash, setInfo_get_account_info_hash] =
    useState('');
  const [info_get_account_info_purse, setInfo_get_account_info_purse] =
    useState('');
  const [info_get_deploy, setInfo_get_deploy] = useState('');

  const [state_get_balance, setState_get_balance] = useState('');
  const [state_get_dictionary_item, setState_get_dictionary_item] = useState(
    []
  );
  const [query_global_state, setQuery_global_state] = useState('');

  const [account_put_deploy, setAccount_put_deploy] = useState('');
  const [make_deploy, setMake_deploy] = useState('');
  const [make_transfer, setMake_transfer] = useState('');

  let test = false;
  useEffect(() => {
    if (!test) {
      // FIX ME please
      test = true;
      initApp();
    }
  }, []);

  const fetchWasm = async () => {
    // console.log('fetchWasm');
    await init();
    //console.log(wasm);
    setWasm(true);
  };

  const initApp = async () => {
    if (!wasm) {
      await fetchWasm();
    };
    // console.log(wasm);
    const sdk: SDK = new SDK();
    console.log(sdk);

    try {
      const chain_get_state_root_hash = await sdk.chain_get_state_root_hash(
        host,
        Verbosity.High,
        undefined
      );
      setHash(chain_get_state_root_hash?.result.state_root_hash);
      console.log(
        'js chain_get_state_root_hash',
        chain_get_state_root_hash?.result.state_root_hash
      );
      console.log(chain_get_state_root_hash);

      const chain_get_block = await sdk.chain_get_block(
        host,
        Verbosity.High,
        BlockIdentifier.fromHeight(block_identifier_height)
      );
      setBlock(chain_get_block?.result.block.hash);
      console.log('js chain_get_block', chain_get_block);

      const public_key = new PublicKey(pubKey);

      const state_get_account_info = await sdk.state_get_account_info(
        host,
        Verbosity.High,
        BlockIdentifier.fromHeight(block_identifier_height),
        public_key
      );
      console.log('js state_get_account_info', state_get_account_info);

      setInfo_get_account_info_hash(
        state_get_account_info?.result.account.account_hash
      );
      setInfo_get_account_info_purse(
        state_get_account_info?.result.account.main_purse
      );

      const state_get_balance = await sdk.state_get_balance(
        host,
        Verbosity.High,
        new Digest(chain_get_state_root_hash?.result.state_root_hash),
        new URef(
          'b1d24c7a1502d70d8cf1ad632c5f703e5f3be0622583a00e47cad08a59025d2e',
          AccessRights.READ_ADD_WRITE()
        )
      );
      console.log('js state_get_balance', state_get_balance);
      setState_get_balance(state_get_balance?.result.balance_value);

      const dictionary_item_identifier =
        DictionaryItemIdentifier.new_from_seed_uref(
          new URef(
            '386f3d77417ac76f7c0b8d5ea8764cb42de8e529a091da8e96e5f3c88f17e530',
            AccessRights.READ_ADD_WRITE()
          ),
          '0' // event key
        );
      const state_get_dictionary_item = await sdk.state_get_dictionary_item(
        host,
        Verbosity.High,
        new Digest(chain_get_state_root_hash?.result.state_root_hash),
        dictionary_item_identifier
      );

      setState_get_dictionary_item(
        state_get_dictionary_item?.result.stored_value.CLValue.parsed
      );
      console.log('js state_get_dictionary_item', state_get_dictionary_item);

      const query_global_state = await sdk.query_global_state(
        host,
        Verbosity.High,
        GlobalStateIdentifier.fromStateRootHash(
          new Digest(chain_get_state_root_hash?.result.state_root_hash)
        ),
        Key.fromURef(
          new URef(
            'b57dfc006ca3cff3f3f17852447d3de86ca69c1086405097ceda3b2a492290e8',
            AccessRights.READ_ADD_WRITE()
          )
        ),
        new Path('')
      );
      console.log('js query_global_state', query_global_state);
      setQuery_global_state(
        query_global_state?.result.stored_value.CLValue.parsed
      );

      const secret_key = `-----BEGIN PRIVATE KEY-----
      MC4CAQAwBQYDK2VwBCIEIFQBgrG+PRSS0uehoYE15rjUP1J28UIjGWGvNpcsw+xU
      -----END PRIVATE KEY-----`;
      const chain_name = 'integration-test';
      const session_account =
        privateToPublicKey(secret_key);
      const timestamp = getTimestamp(); // or Date.now().toString(); // or undefined
      const ttl = '1h';

      console.log("privateToPublicKey result", session_account);

      let deploy_params = new DeployStrParams(
        chain_name,
        session_account,
        secret_key,
        timestamp,
        ttl
      );
      console.log(deploy_params);

      let payment_params = new PaymentStrParams();
      payment_params.payment_amount = '5500000000';
      console.log(payment_params);

      // Transfer minimum amount of tokens to recipient
      const make_transfer = sdk.make_transfer(
        '2500000000',
        '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54',
        undefined, // transfer_id
        deploy_params,
        payment_params,
      );
      setMake_transfer(jsonPrettyPrint(make_transfer));
      console.log(jsonPrettyPrint(make_transfer, Verbosity.Medium));

      deploy_params = new DeployStrParams(
        chain_name,
        session_account
      );
      console.log(deploy_params);

      let session_params = new SessionStrParams();
      // Call an erc 20 token in the wild
      session_params.session_hash =
        '9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477';
      session_params.session_entry_point = 'decimals';
      console.log(session_params);

      payment_params = new PaymentStrParams();
      payment_params.payment_amount = '5500000000';
      console.log(payment_params);

      const make_deploy = sdk.make_deploy(
        deploy_params,
        session_params,
        payment_params,
      );
      setMake_deploy(jsonPrettyPrint(make_deploy));
      console.log(jsonPrettyPrint(make_deploy, Verbosity.Medium));

      // Update hash && timestamp if you need to deploy this already signed deploy
      const deployAsString =
        '{"hash":"20f0ead3d5e93706598716ec4c1cd8afe987d80a7dffb444dd7f9c6bb9d40937","header":{"account":"01d589b1ff893657417d180148829e2e0c509182f0f4678c2af7d1ddd58012ccd9","timestamp":"2023-08-07T23:30:30.785Z","ttl":"30m","gas_price":1,"body_hash":"0f7bbc79a5f02f2621347005c62fb440d8d07d5c97e2cd11da090da24989f61f","dependencies":[],"chain_name":"integration-test"},"payment":{"ModuleBytes":{"module_bytes":"","args":[["amount",{"bytes":"058e31a6553a","cl_type":"U512"}]]}},"session":{"StoredContractByHash":{"hash":"9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477","entry_point":"decimals","args":[]}},"approvals":[{"signer":"01d589b1ff893657417d180148829e2e0c509182f0f4678c2af7d1ddd58012ccd9","signature":"018e64c442f6a4ccae0758bcf43a3f76a36e3d3744332d65ee1cafd0b2f30ffa362ad14c500742ed58c3736a863de34e1266c354f76e5915ac991c834aee3aeb08"}]}';

      let deploy_to_sign = new Deploy(JSON.parse(deployAsString));
      console.log(deploy_to_sign.ToJson());

      let deploy_signed = await sdk.sign_deploy(
        deploy_to_sign,
        secret_key
      );
      console.log('js deploy_signed two parties', deploy_signed.approvals);
      console.assert(deploy_signed.approvals.length === 2); // Deploy has two approvals

      deploy_to_sign = new Deploy(JSON.parse(deployAsString));

      // let cl_value_ = CLValue.bool(true);
      // console.log(CLType.Bool(), cl_value_);

      deploy_to_sign = deploy_to_sign.addArg("test:bool='false"); // Deploy was modified has no approvals anymore
      deploy_to_sign = deploy_to_sign.addArg({ "name": "name_of_my_key", "type": "U256", "value": 1 });
      console.assert(deploy_to_sign.ToJson().approvals.length === 0);
      console.log('deploy_to_sign ', deploy_to_sign.ToJson());
      deploy_signed = await sdk.sign_deploy(
        deploy_to_sign,
        secret_key
      );
      console.log('js deploy + addArg > sign_deploy', deploy_signed.approvals);
      console.assert(deploy_signed.approvals.length === 1); // Deploy should have one approval

      deploy_to_sign = new Deploy(make_deploy);
      console.assert(deploy_to_sign.ToJson().approvals.length === 0); // Deploy has no approval
      deploy_signed = deploy_to_sign.addArg("test:bool='true'", secret_key); // Deploy was modified has one approval
      console.log('make_deploy signed', deploy_signed.ToJson());
      console.log('js deploy + addArg + secret_key ', deploy_signed.ToJson().approvals);
      console.assert(deploy_signed.ToJson().approvals.length === 1); // Deploy should have one approval

      let signed_deploy = new Deploy(make_transfer); // or make_deploy
      console.log(signed_deploy);
      const account_put_deploy = await sdk.account_put_deploy(
        host,
        Verbosity.High,
        signed_deploy
      );
      console.log('js account_put_deploy', account_put_deploy);
      setAccount_put_deploy(account_put_deploy?.result?.deploy_hash);

      if (!account_put_deploy?.result.deploy_hash) {
        return;
      }

      let finalized_approvals = true;
      const info_get_deploy = await sdk.get_deploy(
        host,
        Verbosity.High,
        new DeployHash(
          // '397acea5a765565c7d11839f2d30bf07a8e7740350467d3a358f596835645445' // random deploy
          account_put_deploy?.result.deploy_hash
        ),
        finalized_approvals
      );
      console.log('js info_get_deploy', info_get_deploy);
      setInfo_get_deploy(info_get_deploy?.result?.api_version);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <>
        <img src={'./logo.png'} alt="CasperLabs"></img>
        <div className="text-start my-3 mx-4">
          <div className="my-2">
            <label className="fw-bold">State root hash</label>
            <div className="ms-2 d-inline-flex">{hash}</div>
          </div>

          <div className="my-2 w-50">
            <form className="form-inline">
              <label className="form-control">
                Block hash for height
                <input
                  className="ms-2 form-control-sm text-center"
                  type="number"
                  name="height"
                  placeholder={block_identifier_height_default.toString()}
                  defaultValue={block_identifier_height.toString()}
                ></input>
              </label>
            </form>
            <div className="my-2">
              <label className="fw-bold">Block Info Hash</label>
              <div className="ms-2 d-inline-flex">{block}</div>
            </div>
          </div>

          <div className="w-50">
            <form className="form-inline">
              <label className="ms-2fw-bold form-control">
                <span>Public key</span>
                <input
                  className="ms-2 form-control-sm w-75 text-center"
                  type="text"
                  name="pubKey"
                  placeholder={pubKey}
                  defaultValue={pubKey}
                ></input>
              </label>
            </form>
          </div>

          <div className="my-2">
            <label className="fw-bold">Account Info Hash</label>
            <div className="ms-2 d-inline-flex">
              {info_get_account_info_hash}
            </div>
          </div>
          <div className="my-2">
            <label className="fw-bold">Account Info Purse</label>
            <div className="ms-2 d-inline-flex">
              {info_get_account_info_purse}
            </div>
          </div>

          <div className="my-2 w-50">
            <form className="form-inline">
              <label className="form-control">
                Account main purse uref
                <input
                  className="ms-2 form-control-sm w-75 text-center"
                  type="text"
                  name="purse"
                  placeholder="uref-"
                  defaultValue={info_get_account_info_purse}
                ></input>
              </label>
            </form>
            <div className="my-2">
              <label className="fw-bold">State get balance</label>
              <div className="ms-2 d-inline-flex">{state_get_balance}</div>
            </div>
          </div>

          <div className="my-2">
            <label className="fw-bold">State get dictionary item</label>
            {state_get_dictionary_item.map((item, index) => (
              <div key={index}>
                <span>Key: {item['key']}</span>
                <span className="ms-2">{item['value']}</span>
              </div>
            ))}
          </div>
          <div className="my-2">
            <label className="fw-bold">Query global state</label>
            <div className="ms-2 d-inline-flex">{query_global_state}</div>
          </div>
          <div className="my-2">
            <label className="fw-bold">Make Deploy</label>
            <div>{make_deploy}</div>
          </div>
          <div className="my-2">
            <label className="fw-bold">Make transfer deploy</label>
            <div>{make_transfer}</div>
          </div>
          <div className="my-2">
            <label className="fw-bold">Put Deploy</label>
            <div>{account_put_deploy}</div>
          </div>
          <div className="my-2">
            <label className="fw-bold">Deploy info</label>
            <div>{info_get_deploy}</div>
          </div>
        </div>
      </>
    </div>
  );
}

export default App;
