import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockMovieService {


  getMovies() {
    return ['Mock Movie 1', 'Mock Movie 2', 'Mock Movie 3'];
  }
}
