// Создаем токен для внедрения конфигурации
import {InjectionToken} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export interface AppConfig {
  apiEndpoint: string;
  featureFlag: boolean;
}

export const environmentConfig: { [key: string]: AppConfig } = {
  development: {
    apiEndpoint: 'https://api-dev.kinopoisk.com',
    featureFlag: true
  },
  production: {
    apiEndpoint: 'https://api.kinopoisk.com',
    featureFlag: false
  }
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// Фабрика для выбора конфигурации на основе ключа
export function appConfigFactory(http: HttpClient): AppConfig {
  http.get('')
  const env = 'development'; // Здесь можно определить логику для выбора окружения (например, из переменных окружения)
  return environmentConfig[env];
}
