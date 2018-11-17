import { Component, OnInit } from '@angular/core';
import {NewsDataService} from '@shared/news-data.service';
import {News} from '@shared/models/News';

@Component({
  selector: 'app-add-news-page',
  templateUrl: './add-news-page.component.html',
  styleUrls: ['./add-news-page.component.scss']
})
export class AddNewsPageComponent implements OnInit {
  articleText: string;

  constructor(
    private newsService: NewsDataService
  ) { }

  ngOnInit() {
    let someNews: News = this.newsService.getFullNews('4324');
    this.articleText = someNews.text;
  }

}
