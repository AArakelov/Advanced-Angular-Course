import {Component, Injector} from '@angular/core';
import {NgComponentOutlet} from "@angular/common";
import {MovieDynamicContentComponent} from "../movie-dynamic-content/movie-dynamic-content.component";

@Component({
  selector: 'app-movie-outlet',
  standalone: true,
  imports: [
    NgComponentOutlet
  ],
  templateUrl: './movie-outlet.component.html',
  styleUrl: './movie-outlet.component.scss'
})
export class MovieOutletComponent {
  dynamicComponent: any;
  customInjector: Injector;


  constructor(private injector: Injector) {
  }

  LoadDynamicData() {
    this.dynamicComponent = MovieDynamicContentComponent;
    this.customInjector = Injector.create({
      providers: [
        {provide: 'title', useValue: 'Movie 1'},
        {provide: 'details', useValue: 'details for movie'},
      ],
      parent: this.injector
    })
  }
}
