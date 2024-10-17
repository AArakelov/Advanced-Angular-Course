import {Injectable} from '@angular/core';
import {Plugin} from "../app/models/plugin";

@Injectable({
  providedIn: 'root'
})
export class PluginBService implements Plugin {

  name = 'PluginBService'

  run() {
    console.log(`${this.name} is running`)
  }
}
