import {AfterViewInit, Component, ContentChildren, ElementRef, OnInit, QueryList} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {NgForOf} from "@angular/common";
import {MockMovieService} from "../../services/mock-movie.service";
import {SpecialMovieService} from "../../services/special-movie.service";
import {ApiService} from "../../services/api.service";
import {
  NOTIFICATION_FORMAT_TOKEN,
  NotificationFormatFunction,
  NotificationLibComponent,
  NotificationLibService
} from "ibs-notification-lib";

const customFormat: NotificationFormatFunction = (message, type) => {
  switch (type) {
    case 'success':
      return `🎉 [SUCCESS]: ${message}`;
    case 'error':
      return `❌ [ERROR]: ${message}`;
    case 'warning':
      return `⚠️ [WARNING]: ${message}`;
    default:
      return `[${type}] ${message}`;
  }
};

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    NgForOf,
    NotificationLibComponent,
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
  providers: [
    MovieService,
    NotificationLibService,
    {
      provide: NOTIFICATION_FORMAT_TOKEN, useValue: customFormat
    },
    {
      provide: SpecialMovieService, useExisting: MovieService
    }
  ]
})
export class MovieDetailComponent implements AfterViewInit, OnInit {
  @ContentChildren('movieDescription', {descendants: true}) moviewDescriptions: QueryList<ElementRef>
  msID = ''
  movies: string[];
  mockMovies: string[];

  constructor(private movieService: MovieService,
              private apiService: ApiService,
              private ns: NotificationLibService,
              private mockService: MockMovieService) {
  }


  ngOnInit() {

    this.movies = this.movieService.getMovies()
    this.mockMovies = this.mockService.getMovies()
  }

  ngAfterViewInit() {
    this.moviewDescriptions.forEach(tag => {
      tag.nativeElement.style.color = 'green'
    })
  }

  showSuccess() {
    this.ns.showSuccess('Succes message')

  }

  showWarning() {
    this.ns.showWarning('Some warning msg')
  }

  showError() {
    this.ns.showError('some error msg')
  }
}
