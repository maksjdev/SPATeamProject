import {Component, OnInit} from '@angular/core';
import {NewsDataService} from '@shared/news-data.service';
import {News} from '@shared/models/News';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  fullNews: News;

  constructor(
    private newsService: NewsDataService
  ) { }

  ngOnInit() {
    this.fullNews = this.newsService.getFullNewsData();
  }

}
