import { ApplicationInitStatus, APP_INITIALIZER, inject, InjectionToken, Provider } from "@angular/core";
import init, { SDK } from "casper-sdk";

export const SDK_TOKEN = new InjectionToken<SDK>('SDK');

export const fetchWasmFactory = async (): Promise<SDK> => {
  const wasm = await init('assets/casper_wasm_sdk_bg.wasm');
  return wasm && new SDK();
};

export function provideSafeAsync<T>(
  token: T | InjectionToken<T>,
  initializer: () => Promise<T>
): Provider[] {
  const container: { value?: T; } = { value: undefined };
  return [
    {
      provide: APP_INITIALIZER,
      useValue: async () => {
        container.value = await initializer();
      },
      multi: true,
    },
    {
      provide: token,
      useFactory: () => {
        if (!inject(ApplicationInitStatus).done) {
          throw new Error(
            `Cannot inject ${token} until bootstrap is complete.`
          );
        }
        return container.value;
      },
    },
  ];
}