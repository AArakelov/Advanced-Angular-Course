import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MoviewListComponent} from "../components/moview-list/moview-list.component";
import {MovieDetailComponent} from "../components/movie-detail/movie-detail.component";
import {PopoverDirective} from "./directives/popover.directive";
import {MovieDynamicContentComponent} from "../components/movie-dynamic-content/movie-dynamic-content.component";
import {MovieOutletComponent} from "../components/movie-outlet/movie-outlet.component";
import {CardComponent} from "../components/card/card.component";


@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, MoviewListComponent,
    MovieDetailComponent, PopoverDirective,
    MovieDynamicContentComponent, MovieOutletComponent, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // title = 'movies';
  // @ViewChild('footerTmpl', {read: ViewContainerRef, static: true}) footerContainer: ViewContainerRef;
  //
  // constructor(@Inject(MY_PLUGIN_TOKEN) private plugins: Plugin[]) {
  //   this.runPlugins();
  // }
  //
  // ngOnInit() {
  //   setTimeout(() => {
  //     this.creatFooter()
  //   }, 500)
  // }
  //
  // creatFooter() {
  //   this.footerContainer.clear();
  //   const compRef = this.footerContainer.createComponent(FooterComponent)
  //   compRef.instance.log();
  // }
  //
  // runPlugins() {
  //   console.log(this.plugins, 'plugins')
  //   this.plugins.forEach(p => p.run())
  // }
  //

}
