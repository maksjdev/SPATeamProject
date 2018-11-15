import {Component, OnInit} from '@angular/core';
import {NewsDataService} from '@shared/news-data.service';
import {News} from '@shared/models/News';

@Component({
  selector: 'app-top-news-block',
  templateUrl: './top-news-block.component.html',
  styleUrls: ['./top-news-block.component.scss']
})
export class TopNewsBlockComponent implements OnInit {
  newsList: Array<News>;

  constructor(
    private newsService: NewsDataService
  ){}

  ngOnInit(): void {
    this.newsList = this.newsService.getTopNews();
  }

}
