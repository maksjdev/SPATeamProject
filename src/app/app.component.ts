import {Component, OnDestroy} from '@angular/core';
import {AppRestService} from '@shared/http/app-rest.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isScroled: boolean = false;

  constructor(){}
   scrollToTop(event) {
    console.log(`Scroll to top of page!`);
   }
}
