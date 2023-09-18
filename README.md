# Casper Rust/Wasm SDK

The Rust/Wasm SDK allows developers to interact with the Casper Blockchain using Rust or TypeScript. This page covers different examples of using the SDK.

# Install

### Rust Project

Add the sdk as dependency of your project

```toml
casper-wasm-sdk = { version = "0.1.0", git = "https://github.com/casper-ecosystem/rustSDK.git" }
```

#### Usage

```
use casper_wasm_sdk::{...}
```

### Typescript Project

#### Install wasm pack

```shell
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

```
make prepare
make build
```

# Frontend React example

```
cd ./examples/frontend/react
npm install
npm start

```

# Frontend Angular example

```
cd ./examples/frontend/angular
npm install
npm start
npm build // build the app in ./frontend/angular/dist folder

```

# Desktop Node example

```
cd ./examples/desktop/node
npm install
npm start

```

# Desktop Electron example (loading Angular frontend)

```
cd ./examples/desktop/electron
npm install
npm start
npm build // build the app in ./desktop/electron/release folder

```
