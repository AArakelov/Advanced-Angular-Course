import {Component, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MoviewListComponent} from "../components/moview-list/moview-list.component";
import {MovieDetailComponent} from "../components/movie-detail/movie-detail.component";
import {FooterComponent} from "../components/footer/footer.component";
import {PopoverDirective} from "./directives/popover.directive";
import {MovieDynamicContentComponent} from "../components/movie-dynamic-content/movie-dynamic-content.component";
import {MovieOutletComponent} from "../components/movie-outlet/movie-outlet.component";
import {CardComponent} from "../components/card/card.component";
import {APP_CONFIG, AppConfig} from "../tokens/config";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MoviewListComponent,
    MovieDetailComponent, PopoverDirective,
    MovieDynamicContentComponent, MovieOutletComponent, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'movies';
  @ViewChild('footerTmpl', {read: ViewContainerRef, static: true}) footerContainer: ViewContainerRef;


  constructor(@Inject(APP_CONFIG) public config: AppConfig) {
    console.log('Config loaded:', this.config);
  }

  ngOnInit() {
    setTimeout(() => {
      this.creatFooter()
    }, 500)
  }

  creatFooter() {
    this.footerContainer.clear();
    const compRef = this.footerContainer.createComponent(FooterComponent)
    compRef.instance.log();
  }


}
