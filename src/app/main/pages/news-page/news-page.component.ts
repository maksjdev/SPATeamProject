import {Component, OnInit} from '@angular/core';
import {NewsDataService} from '@shared/news-data.service';
import {News} from '@shared/models/News';
import {Advertising} from '@components/block-components/ad-item-block/Advertising';
import {Comment} from '@shared/models/Comment';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {filter, switchMap} from 'rxjs/operators';
import {AppScrollService} from '@shared/services/app-scroll.service';
import {AppRoutingService} from '@routes/app-routing.service';
import {CONSTANTS} from '@shared/config/constants';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  public fullNews: News;
  public commentsList: Array<Comment>;
  public adv: Advertising;

  constructor(
    private route: ActivatedRoute,
    private routerService: AppRoutingService,
    private newsService: NewsDataService,
    private scrollService: AppScrollService
  ) {
    scrollService.scrollToTop(false);
    this.adv =  new Advertising('Burger King',
      'https://burgerking.ru/images/actions/BK-2115_HALLOWEEN-WHOPPER_710x459px.jpg',
      'https://burgerking.ru/actions');
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('id');
        return this.newsService.getFullNewsData(id);
      })
    ).subscribe( (news: News) => {
      this.fullNews = news;
      if (!news) {
        // Если как-то так вышло что новости нету
        this.routerService.goToLinkWithQuery(CONSTANTS.APP.MAIN)
      }
    });

    this.scrollService.scrollState.pipe(
      filter( (value: Event) => {
        return window.pageYOffset > 500 && this.fullNews && !this.commentsList
      }),
      switchMap((value: Event) => {
        let id = this.fullNews.getId();
        return this.newsService.getComments(id);
      })
    ).subscribe( (comments: Array<Comment>) => {
      this.commentsList = comments;
    });
  }

  onAddComment(comment){
    console.log(`Add comment: ${comment}`);
  }
  onDeleteComment(comment: Comment){
    console.log(`Delete comment: ${comment.id}`);
  }
  onEdit(event){
    let id = this.fullNews.getId();
    this.routerService.goToEditNews(id);
  }
  onFavorites (state){
    // Необходимо добавить / удалить в избранное
    console.log(`On favorites: ${state}`);
  }
}
