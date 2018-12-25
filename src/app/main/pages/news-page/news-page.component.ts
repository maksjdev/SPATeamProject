import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NewsDataService} from '@shared/news-data.service';
import {News} from '@shared/models/News';
import {Comment} from '@shared/models/Comment';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {catchError, filter, switchMap} from 'rxjs/operators';
import {AppScrollService} from '@shared/services/app-scroll.service';
import {AppRoutingService} from '@routes/app-routing.service';
import {CONSTANTS} from '@shared/config/constants';
import {of, Subscription} from 'rxjs';
import {AppDialogService} from '@shared/services/app-dialog.service';
import {CommentDataService} from '@shared/comment-data.service';
import {UserDataService} from '@shared/user-data.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit, OnDestroy {
  public fullNews: News;
  public commentsList: Array<Comment>;
  public imageArr: Array<string>;
  public favorites: boolean;

  private _subc1: Subscription;
  private _subc2: Subscription;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsDataService,
    private userService: UserDataService,
    private commentService: CommentDataService,
    private routerService: AppRoutingService,
    private scrollService: AppScrollService,
    private dialogService: AppDialogService
  ) {
    scrollService.scrollToTop(false);
    this.imageArr = [
      'https://s23188.pcdn.co/wp-content/uploads/2016/12/banquet_hall_fireplace_img_6946.jpg',
      'https://revistatcn.com/wp-content/uploads/2018/10/awesome-mini-white-christmas-tree-for-your-home-battery-christmas-tree-awesome-luxury-christmas-tree-lights-battery-of-awesome-mini-white-christmas-tree-for-your-home.jpg',
      'https://farm7.staticflickr.com/6067/6112323095_505ed95435_b.jpg',
      'http://newyearxmas.com/wp-content/uploads/2018/11/christmas-videos-vlcsnap-buy-merry-magic-video-with-fireplace-and-xmas-tree-splendi-picture-ideas-online-for-kids.jpg'
    ];
  }

  @ViewChild('commentForm') commentForm: any;
  ngOnInit() {
    this._subc1 = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('id');
        return this.newsService.getFullNewsData(id);
      }),
      catchError(err => {
        return of(null);
      })
    ).subscribe( (news: News) => {
      if (!news) {
        // Если как-то так вышло что новости нету
        this.routerService.goToLinkWithQuery(CONSTANTS.APP.MAIN)
      }
      this.fullNews = news;
      let newsId = this.fullNews.getId();
      this.favorites = this.userService.hasBookmark(newsId);
    });

    this._subc2 = this.scrollService.scrollState.pipe(
      filter( (value: Event) => {
        return window.pageYOffset > 300 && this.fullNews && !this.commentsList
      }),
      switchMap((value: Event) => {
        let id = this.fullNews.getId();
        return this.commentService.getCurrentCommentsData(id, 'full');
      })
    ).subscribe( (comments: Array<Comment>) => {
      if (comments && comments.length > 0){
        // Особенность и продвинутый хак )) ЧВС++
        this.commentsList = comments.splice(0, comments.length);
      }
    });
  }
  ngOnDestroy(): void {
    this._subc1.unsubscribe();
    this._subc2.unsubscribe();
  }

  onAddComment(comment: Comment){
    this.commentService.createComment(this.fullNews.getId(), comment).then((success: boolean) => {
      if (!success) { return; }
      this.dialogService.showToastSuccess(CONSTANTS.MSG.COMMENT_ADD);
      this.commentForm.resetForm();
      this.reloadComments();
    })
  }
  onDeleteComment(comment: Comment){
    this.commentService.deleteComment(comment.getId(), this.fullNews.getId()).then((success: boolean) => {
      if (!success) { return; }
      this.dialogService.showToastSuccess(CONSTANTS.MSG.COMMENT_DEL);
      this.reloadComments();
    })
  }

  onEdit(event){
    let id = this.fullNews.getId();
    this.routerService.goToEditNews(id);
  }
  onFavorites (state: boolean){
    let newsId = this.fullNews.getId();
    if (!newsId) { return; }
    if (state){
      this.userService.addToBookmarks(newsId).then((success: boolean) => {
        if (!success) { return; }
        this.favorites = true;
        this.userService.reloadCurrentUserData();
      });
    } else {
      this.userService.deleteFromBookmarks(newsId).then((success: boolean) => {
        if (!success) { return; }
        this.favorites = false;
        this.userService.reloadCurrentUserData();
      });
    }
  }
  OnLikeComment(obj: object): void {
    let id = obj['id'], liked = obj['liked'];
    if (liked){
      this.userService.likeComment(id).then( (success: boolean) => {
        if (!success) { return; }
        this.userService.reloadCurrentUserData();
        this.reloadComments();
      });
    } else {
      this.userService.unlikeComment(id).then( (success: boolean) => {
        if (!success) { return; }
        this.userService.reloadCurrentUserData();
        this.reloadComments();
      });
    }
  }

  private reloadComments(): void {
    if (!this.fullNews) { return; }
    let id = this.fullNews.getId();
    this.commentService.reloadCurrentCommentsData(id);
  }
}
