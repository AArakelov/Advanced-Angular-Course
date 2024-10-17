import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-moview-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './moview-list.component.html',
  providers: [MovieService],
  styleUrl: './moview-list.component.scss'
})
export class MoviewListComponent implements OnInit, AfterViewInit {
  movies = ['Movie 1', 'Movie 2', 'Movie 3']
  templateType = 'list'
  specialServiceId: string;

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }
}
