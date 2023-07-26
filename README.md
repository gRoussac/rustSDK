# rustSDK

Casper Labs Rust SDK Demo

# Install wasm pack

```shell
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

# Install

```shell
git clone --recurse-submodules https://github.com/casper-ecosystem/rustSDK.git

// compiling the rust-client-rs-sdk is not required but just in case
cd ./casper-client-rs-sdk
cargo build

cd ./app
rustup target add wasm32-unknown-unknown
// app compilation will trigger sdk wasm compilation (wasm-pack build --target web --no-default-features --features sdk)
wasm-pack build --target web

cd ./frontend
npm install
npm start
```
