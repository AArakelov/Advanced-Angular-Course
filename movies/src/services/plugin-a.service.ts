import {Injectable} from '@angular/core';
import {Plugin} from "../app/models/plugin";

@Injectable({
  providedIn: 'root'
})
export class PluginAService implements Plugin {

  name = 'PluginAService'

  run() {
    console.log(`${this.name} is running`)
  }
}
