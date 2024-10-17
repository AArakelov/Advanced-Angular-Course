import {InjectionToken} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export interface AppConfig {
    apiEndPoint: string;
    featureFlag: boolean
}


export const environmentConfig: { [key: string]: AppConfig } = {
    development: {
        apiEndPoint: '//api-dev.kinopoisk.com',
        featureFlag: true

    }, production: {
        apiEndPoint: '//api-prod.kinopoisk.com',
        featureFlag: true
    }
}

export function appConfigFactory(httpClient: HttpClient): AppConfig {
    const env = 'production';
    console.log(httpClient, 'httpClient')
    return environmentConfig[env]
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config')
