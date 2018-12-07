import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsDataService} from '@shared/news-data.service';
import {News} from '@shared/models/News';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-top-news-block',
  templateUrl: './top-news-block.component.html',
  styleUrls: ['./top-news-block.component.scss']
})
export class TopNewsBlockComponent implements OnInit, OnDestroy {
  public newsList: Array<News>;
  private _subcription: Subscription;

  constructor(
    private newsService: NewsDataService
  ){}

  ngOnInit(): void {
    this._subcription = this.newsService.getTopNews().subscribe((list: Array<News>) => {
      this.newsList = list;
    });
  }

  ngOnDestroy(): void {
    this._subcription.unsubscribe();
  }

}
