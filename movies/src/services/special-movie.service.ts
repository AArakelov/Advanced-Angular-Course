import {Injectable} from '@angular/core';
import {MovieService} from "./movie.service";

@Injectable({
  providedIn: 'root'
})
export class SpecialMovieService extends MovieService {

  getACTIONS() {
    return ['Action 1', 'action 2']
  }
}
