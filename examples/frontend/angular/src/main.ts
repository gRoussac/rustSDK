
import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, EnvironmentProviders, importProvidersFrom, Provider } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { NODE_ADDRESS, VERBOSITY, WASM_ASSET_PATH, WasmModule } from '@util/wasm';
import { config, CONFIG, ENV } from '@util/config';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { Verbosity } from 'casper-sdk/casper_rust_wasm_sdk';

if (environment.production) {
  enableProdMode();
}

const providers: Array<Provider | EnvironmentProviders> = [
  { provide: ENV, useValue: environment },
  { provide: CONFIG, useValue: config },
  { provide: WASM_ASSET_PATH, useValue: config['wasm_asset_path'] },
  { provide: NODE_ADDRESS, useValue: environment.node_address },
  { provide: VERBOSITY, useValue: Verbosity[config['verbosity'] as any] },
  importProvidersFrom([
    HttpClientModule,
    WasmModule,
  ]),
];

bootstrapApplication(AppComponent, { providers })
  .then(() => {
    //
  })
  .catch(() => {
    //
  });