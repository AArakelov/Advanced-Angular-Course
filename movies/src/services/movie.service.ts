import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  id = Math.random().toString()

  constructor() {
    console.log(`MovieService instance created with IF ${this.id}`)
  }

  getMovies() {
    return ['Movie 1', 'Movie 2', 'Movie 3'];
  }
}
