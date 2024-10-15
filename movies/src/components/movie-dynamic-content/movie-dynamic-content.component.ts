import {Component, Inject, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-movie-dynamic-content',
  standalone: true,
  imports: [],
  templateUrl: './movie-dynamic-content.component.html',
  styleUrl: './movie-dynamic-content.component.scss'
})
export class MovieDynamicContentComponent implements OnChanges {

  constructor(@Inject('title') public title: string,
              @Inject('details') public details: string) {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
}
