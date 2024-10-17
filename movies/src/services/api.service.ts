import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, AppConfig} from "../tokens/config";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {

    console.log(this.config)
  }
}
