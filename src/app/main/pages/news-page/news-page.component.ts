import {Component, OnInit} from '@angular/core';
import {NewsDataService} from '@shared/news-data.service';
import {News} from '@shared/models/News';
import {Comment} from '@shared/models/Comment';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {catchError, filter, switchMap} from 'rxjs/operators';
import {AppScrollService} from '@shared/services/app-scroll.service';
import {AppRoutingService} from '@routes/app-routing.service';
import {CONSTANTS} from '@shared/config/constants';
import {of} from 'rxjs';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  public fullNews: News;
  public commentsList: Array<Comment>;
  public imageArr: Array<string>;

  constructor(
    private newsService: NewsDataService,
    private route: ActivatedRoute,
    private routerService: AppRoutingService,
    private scrollService: AppScrollService,
  ) {
    scrollService.scrollToTop(false);
    this.imageArr = [
      'https://s23188.pcdn.co/wp-content/uploads/2016/12/banquet_hall_fireplace_img_6946.jpg',
      'https://revistatcn.com/wp-content/uploads/2018/10/awesome-mini-white-christmas-tree-for-your-home-battery-christmas-tree-awesome-luxury-christmas-tree-lights-battery-of-awesome-mini-white-christmas-tree-for-your-home.jpg',
      'https://farm7.staticflickr.com/6067/6112323095_505ed95435_b.jpg',
      'http://newyearxmas.com/wp-content/uploads/2018/11/christmas-videos-vlcsnap-buy-merry-magic-video-with-fireplace-and-xmas-tree-splendi-picture-ideas-online-for-kids.jpg'
    ];
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('id');
        return this.newsService.getFullNewsData(id);
      }),
      catchError(err => {
        return of(null);
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
        return window.pageYOffset > 300 && this.fullNews && !this.commentsList
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
