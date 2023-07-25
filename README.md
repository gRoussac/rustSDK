# rustSDK

Casper Labs Rust SDK Demo

# Install wasm pack

```shell
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

# Intall

```shell
git clone --recurse-submodules https://github.com/casper-ecosystem/rustSDK.git
git checkout dev
cd casper-client-rs-sdk
cargo build
cd ..
cd app
rustup target add wasm32-unknown-unknown
wasm-pack build --target web
cd ..
cd frontend
npm install
npm start
```
