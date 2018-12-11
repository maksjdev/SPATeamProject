import {Injectable} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Injectable()
export class AppScrollService {
  public scrollState: Observable<Event>;

  constructor(){
    this.scrollState = fromEvent(window, "scroll").pipe(debounceTime(50));
  }

  public getScrollState(): Observable<Event> {
    return this.scrollState;
  }
  public scrollToTop(smooth: boolean = true): void {
    let type: ScrollBehavior = smooth? 'smooth' : 'instant';
    window.scrollTo({ left: 0, top: 0, behavior: type });
  }
}
