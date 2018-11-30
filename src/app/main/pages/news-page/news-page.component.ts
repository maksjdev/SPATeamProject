import {Component, OnInit} from '@angular/core';
import {NewsDataService} from '@shared/news-data.service';
import {News} from '@shared/models/News';
import {Advertising} from '@components/block-components/ad-item-block/Advertising';
import {Comment} from '@shared/models/Comment';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  fullNews: News;
  commentsList: Array<Comment>;
  adv: Advertising;

  constructor(
    private newsService: NewsDataService,
  ) {
    this.adv =  new Advertising('Burger King',
      'https://burgerking.ru/images/actions/BK-2115_HALLOWEEN-WHOPPER_710x459px.jpg',
      'https://burgerking.ru/actions');
  }

  ngOnInit() {
    this.fullNews = this.newsService.getFullNewsData();
    this.commentsList = this.newsService.getComments(5);
  }

}
