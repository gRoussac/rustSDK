
import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, EnvironmentProviders, importProvidersFrom, Provider } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { WasmModule } from '@util/wasm';
import { config, CONFIG, ENV } from '@util/config';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

const providers: Array<Provider | EnvironmentProviders> = [
  importProvidersFrom([
    HttpClientModule,
    WasmModule,
  ])
];

providers.push({
  provide: CONFIG,
  useValue: config
});

providers.push({
  provide: ENV,
  useValue: environment
});

bootstrapApplication(AppComponent, { providers })
  .then(() => {
    //
  })
  .catch(() => {
    //
  });