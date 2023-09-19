# Casper Rust/Wasm SDK

The Rust/Wasm SDK allows developers to interact with the Casper Blockchain using Rust or TypeScript.
You can use the Casper Rust/Wasm SDK in two ways.

- In a <strong>Rust application</strong> by importing the SDK crate.
- In a <strong>Typescript application</strong> by importing the SDK Wasm file and the Typescript interfaces.

This page covers different examples of using the SDK.

## Install

<details>
  <summary><strong><code>Rust Project</code></strong></summary>

## Rust Project

Add the sdk as dependency of your project

> Cargo.toml

```toml
casper-rust-wasm-sdk = { version = "0.1.0", git = "https://github.com/casper-ecosystem/rustSDK.git" }
```

## Usage

> main.rs

```rust
use casper_rust_wasm_sdk::{SDK, Verbosity};

let sdk = SDK::new(
  Some("https://rpc.testnet.casperlabs.io".to_string()),
  Some(Verbosity.High)
);
```

</details>

<details>
  <summary><strong><code>Typescript Project</code></strong></summary>

## Typescript Project

You can directly use the content of the [pkg folder](https://github.com/casper-ecosystem/rustSDK/tree/dev/pkg) for a browser project or [pkg-nodejs](https://github.com/casper-ecosystem/rustSDK/tree/dev/pkg-nodejs) for a Node project.

Or you can use the [TODO][npm package](https://todo)

#### Build package with wasm pack

If you want to compile the wasm package from Rust you might need to install wasm-pack for ease of use.

```shell
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

```shell
$ make prepare
$ make build
```

will create a `pkg` and `pkg-nodejs` cointaining the typescript interfaces. You can find more details about building the sdk for javascript with wasm-pack in the [wasm-pack documention](https://rustwasm.github.io/docs/wasm-pack/commands/build.html).

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

## Usage

<details>
  <summary><strong><code>React</code></strong></summary>

## Web React

> package.json

```json
{
  "name": "my-react-app",
  "dependencies": {
    // This path is relative
    "casper-sdk": "file:pkg", // [TODO] Npm package
    ...
}
```

The React app needs to load the wasm file through a dedicated `init()` method as per this example

> App.tsx

```ts
import init, {
  SDK,
  Verbosity,
} from 'casper-sdk';

const node_address = 'https://rpc.testnet.casperlabs.io';
const verbosity = Verbosity.High;

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

  const sdk = new SDK(node_address, verbosity);
  console.log(sdk);
  ...
}
```

#### Frontend React example

You can look at a very basic example of usage in the [React example app](https://github.com/casper-ecosystem/rustSDK/blob/dev/examples/frontend/react/src/App.tsx)

```shell
$ cd ./examples/frontend/react
$ npm install
$ npm start
```

</details>
<details>
  <summary><strong><code>Angular</code></strong></summary>

## Web Angular

> package.json

```json
{
  "name": "my-angular-app",
  "dependencies": {
    // This path is relative
    "casper-sdk": "file:pkg", // [TODO] Npm package
    ...
}
```

The Angular app needs to load the wasm file through a dedicated `init()` method as per this example. You can import it into a component through a service but it is advised to import it through a factory with the injection token [APP_INITIALIZER](https://angular.io/api/core/APP_INITIALIZER).

> wasm.factory.ts

```js
import init, { SDK, Verbosity } from "casper-sdk";

export const SDK_TOKEN = new InjectionToken<SDK>('SDK');
export const WASM_ASSET_PATH = new InjectionToken<string>('wasm_asset_path');
export const NODE_ADDRESS = new InjectionToken<string>('node_address');
export const VERBOSITY = new InjectionToken<Verbosity>('verbosity');

type Params = {
  wasm_asset_path: string,
  node_address: string;
  verbosity: Verbosity;
};

export const fetchWasmFactory = async (
  params: Params
): Promise<SDK> => {
    const wasm = await init(params.wasm_asset_path);
    return new SDK(params.node_address, params.verbosity);
  };
};
```

> wasm.module.ts

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SDK_TOKEN, fetchWasmFactory, provideSafeAsync } from './wasm.factory';

const providers = provideSafeAsync(SDK_TOKEN, fetchWasmFactory);

@NgModule({
  imports: [CommonModule],
  providers,
})
export class WasmModule {}
```

You can look at a basic example of factory usage in the [Angular example app](https://github.com/casper-ecosystem/rustSDK/blob/dev/examples/frontend/angular/libs/util/services/wasm/src/lib/wasm.factory.ts)

Add the sdk wasm file to assets of your project with path parameter being ` wasm_asset_path:'assets/casper_rust_wasm_sdk_bg.wasm'`, Angular will then copy the file from `pkg` in `assets` on build making it available for the fetch wasm factory.

> project.json

```json
"assets": [
  ...,
  {
    "input": "pkg",
    "glob": "casper_rust_wasm_sdk_bg.wasm",
    "output": "assets"
  }
]
```

#### Frontend Angular example

You can look at a more advanced example of usage in the [Angular example app](https://github.com/casper-ecosystem/rustSDK/blob/dev/examples/frontend/angular/src/app/app.component.ts)

```shell
$ cd ./examples/frontend/angular
$ npm install
$ npm start
$ npm build
```

</details>

<details>
  <summary><strong><code>Node</code></strong></summary>

## Desktop Node

> package.json

```json
{
  "name": "my-node-app",
  "dependencies": {
    // This path is relative
    "casper-sdk": "file:pkg-nodejs", // [TODO] Npm package
    ...
}
```

The Node app loads the SDK with `require()`. You can find more details about building the sdk for [Node with wasm-pack](https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html#nodejs)
Note that this method requires a version of Node.js with WebAssembly support, which is currently Node 8 and above.

> index.ts

```ts
const casper_rust_wasm_sdk = require('casper-sdk');
const { SDK } = casper_rust_wasm_sdk;

const node_address = 'https://rpc.integration.casperlabs.io';
let sdk: typeof SDK = new SDK(node_address);
console.log(sdk);
```

#### Desktop Node example

You can look at a very basic example of usage in the [Node example app](https://github.com/casper-ecosystem/rustSDK/blob/dev/examples/desktop/node/index.ts)

```shell
$ cd ./examples/desktop/node
$ npm install
$ npm start
```

</details>

</details>

## Usage

<br>

# Desktop Electron demo app

This Electron based demo app loads the Angular example build.

```shell
$ cd ./examples/desktop/electron
$ npm install
$ npm start
$ npm build
```
