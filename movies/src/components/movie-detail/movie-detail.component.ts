import {AfterViewInit, Component, ContentChildren, ElementRef, QueryList} from '@angular/core';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements AfterViewInit {
  @ContentChildren('movieDescription', {descendants: true}) moviewDescriptions: QueryList<ElementRef>

  ngAfterViewInit() {
    this.moviewDescriptions.forEach(tag => {
      tag.nativeElement.style.color = 'green'
    })
  }
}
