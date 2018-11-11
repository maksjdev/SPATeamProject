import {Component, HostListener} from '@angular/core';
import {Debounce} from 'lodash-decorators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isScroled: boolean = false;

  constructor(){}

  @HostListener('window:scroll', ['$event'])
  @Debounce(50)
  trackScroll(event) {
    this.isScroled = window.pageYOffset > 300;
  }
  scrollToTop(event) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }
}
