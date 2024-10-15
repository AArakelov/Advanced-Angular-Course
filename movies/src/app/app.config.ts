import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {APP_CONFIG, appConfigFactory} from "../tokens/config";
import {HttpClient, provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
    {provide: APP_CONFIG, useFactory: appConfigFactory, deps: [HttpClient]}]
};
