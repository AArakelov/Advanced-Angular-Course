import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {APP_CONFIG, appConfigFactory} from "../tokens/config";
import {PluginAService} from "../services/plugin-a.service";
import {PluginBService} from "../services/plugin-b.service";
import {MY_PLUGIN_TOKEN} from "../tokens/plugin-tokn";
// Определяем кастомную функцию форматирования


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),

    {
      provide: APP_CONFIG, useFactory: appConfigFactory, deps: [HttpClient]

    },
    {provide: MY_PLUGIN_TOKEN, useClass: PluginBService, multi: true},
    {provide: MY_PLUGIN_TOKEN, useClass: PluginAService, multi: true},
    provideHttpClient()]
};
