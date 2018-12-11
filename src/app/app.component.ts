import {Component, OnInit} from '@angular/core';
import {AppScrollService} from '@shared/services/app-scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isScroled: boolean = false;
  private offsetY: number = 300;

  constructor(
    private scrollService: AppScrollService
  ){}

  ngOnInit(): void {
    this.scrollService.getScrollState().subscribe((event: Event) => {
      this.isScroled = window.pageYOffset > this.offsetY;
    });
  }

  scrollToTop(event) {
    this.scrollService.scrollToTop();
  }
}
