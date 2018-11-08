import {Component} from '@angular/core';
import {News} from '@shared/models/News';
import {NewsDataService} from '@shared/news-data.service';

@Component({
  selector: 'app-full-news-block',
  templateUrl: './full-news-block.component.html',
  styleUrls: ['./full-news-block.component.scss']
})
export class FullNewsBlockComponent  {
  news: News;

  constructor(
    private newsSercice: NewsDataService,
  ) {
    this.news = this.newsSercice.getMockNews();
  }
}
