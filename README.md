# Casper Rust/Wasm SDK

The Rust/Wasm SDK allows developers to interact with the Casper Blockchain using Rust or TypeScript. This page covers different examples of using the SDK.

# Install

### - Rust Project

Add the sdk as dependency of your project

```toml
casper-rust-wasm-sdk = { version = "0.1.0", git = "https://github.com/casper-ecosystem/rustSDK.git" }
```

#### Usage

```rust
use casper_rust_wasm_sdk::{SDK, ...};

let sdk = SDK::new();
```

### - Typescript Project

You can directly use the content of the [pkg folder](https://github.com/casper-ecosystem/rustSDK/tree/dev/pkg) for a browser project or [pkg-nodejs](https://github.com/casper-ecosystem/rustSDK/tree/dev/pkg-nodejs) for a Node project.

Or you can use the [TODO][npm package](https://todo)

#### Build package with wasm pack

If you want to compile the wasm package from Rust

```shell
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

```shell
$ make prepare
$ make build
```

will create a `pkg` and `pkg-nodejs` cointaining the typescript interfaces. You can find more details about building the with wasm-pack in the [wasm-pack documention](https://rustwasm.github.io/docs/wasm-pack/commands/build.html).

This folders will contain a wasm binary, a JS wrapper file, typescript types definitions, and a package.json file that you can load in your proper project.

```shell
$ tree pkg
pkg
├── casper_rust_wasm_sdk_bg.wasm
├── casper_rust_wasm_sdk_bg.wasm.d.ts
├── casper_rust_wasm_sdk.d.ts
├── casper_rust_wasm_sdk.js
├── LICENSE
├── package.json
└── README.md
```

#### Usage

> React

```json
{
  "name": "my-react-app",
  "dependencies": {
    "casper-sdk": "file:pkg", // [TODO] Npm package
    ...
}
```

The React app needs to load the wasm file through a dedicated `init()` method

```js
import init, {
  SDK,
  ...
} from 'casper-sdk';

function App() {
  const [wasm, setWasm] = useState(false);
  const fetchWasm = async () => {
    await init();
    setWasm(true);
  };

  useEffect(() => {
    initApp(); // take care here to initiate app only once and not on every effect
  }, []);

  const initApp = async () => {
  if (!wasm) {
    await fetchWasm();
  };

  const sdk = new SDK();
  console.log(sdk);
  ...
}
```

#### Frontend React example

You can look at a very basic example of usage in the [React demo app](https://github.com/casper-ecosystem/rustSDK/blob/dev/examples/frontend/react/src/App.tsx)

```shell
$ cd ./examples/frontend/react
$ npm install
$ npm start
```

#### Usage

> Angular

The Angular app needs to load the wasm file through a dedicated `init()` method. You can import it into a component but it is advised to import it through a service.

```js

```

#### Frontend Angular example

```shell
$ cd ./examples/frontend/angular
$ npm install
$ npm start
$ npm build
```

# Desktop Node example

```shell
$ cd ./examples/desktop/node
$ npm install
$ npm start
```

# Desktop Electron example (loading Angular frontend)

```shell
$ cd ./examples/desktop/electron
$ npm install
$ npm start
$ npm build
```

```

```
