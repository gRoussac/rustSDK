# rustSDK

Casper Labs Rust SDK Demo

# Install wasm pack

```shell
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

# Install

```shell
git clone --recurse-submodules https://github.com/casper-ecosystem/rustSDK.git

// compiling the casper-client-rs is not required but just in case
cd ./casper-client-rs
cargo build

cd ./casper-wasm-sdk
rustup target add wasm32-unknown-unknown
// app compilation will trigger sdk wasm compilation (in casper-client-rs will translate to wasm-pack build --target web --no-default-features --features sdk)
wasm-pack build --target web

cd ./frontend
npm install
npm start
```
