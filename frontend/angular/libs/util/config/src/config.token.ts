import { InjectionToken } from "@angular/core";
import { EnvironmentConfig } from "./config";

export const CONFIG = new InjectionToken<EnvironmentConfig>('EnvironmentConfig');
export const ENV = new InjectionToken<EnvironmentConfig>('EnvironmentConfig');
