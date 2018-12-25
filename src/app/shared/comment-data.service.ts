import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Comment} from '@shared/models/Comment';
import {catchError, map} from 'rxjs/operators';
import {AppRestService} from '@shared/http/app-rest.service';
import {AppDialogService} from '@shared/services/app-dialog.service';
import {DtoService} from '@shared/dto.service';

@Injectable({
  providedIn: 'root'
})
export class CommentDataService {
  private currentComments: BehaviorSubject<Array<Comment>>;

  constructor(
    private restService: AppRestService,
    private dialogService: AppDialogService,
    private dtoService: DtoService
  ) {
    this.currentComments = new BehaviorSubject([]);
  }

  public reloadCurrentCommentsData(newsId: string, type?: string): void {
    this.getCurrentCommentsData(newsId, type, true);
  }
  public getCurrentCommentsData(newsId: string, type?: string, forceReload: boolean = true): BehaviorSubject<Array<Comment>> {
    let currentV = this.currentComments.getValue();
    if (!currentV || (currentV && currentV.length < 1) || forceReload){
      this.getComments(newsId, type).toPromise().then ( (comments: Array<Comment>) => {
        this.currentComments.next(comments);
      })
    } return this.currentComments;
  }

  public getComments(newsId: string, type?: string): Observable<Array<Comment>> {
    if (!newsId) {return of(null)}
    return this.restService.restGetAllComments(newsId, type).pipe(
      map((response: object) => {
        let commentArr: Array<Comment> = [];
        let comments: Array<object> = response['comments'];
        if (comments && comments.length > 0) {
          comments.forEach( (commentObj: object) => {
            let comment: Comment = this.dtoService.getCommentFromObj(commentObj);
            commentArr.push(comment);
          });
        }
        return commentArr;
      })
    );
  }
  public getCommetnData(commentId: string): Promise<Comment> {
    return this.restService.restGetCommentData(commentId).pipe(
      map((obj: object) => {
        return this.dtoService.getCommentFromObj(obj);
      }),
      catchError(this.restService.handleError<Comment>(`Get CommentData #${commentId}`))
    ).toPromise();
  }

  public createComment(newsId: string, comment: Comment): Promise<boolean>{
    return this.restService.restSendComment(newsId, comment).pipe(
      catchError((errorMsg: string) => {
        this.dialogService.showToastError(errorMsg);
        return of(errorMsg);
      })
    ).toPromise().then(value => {
      return value === Object(value);
    });
  }
  public deleteComment(commentId: string, newsId: string): Promise<boolean>{
    return this.restService.restDeleteComment(commentId, newsId).pipe(
      catchError((errorMsg: string) => {
        this.dialogService.showToastError(errorMsg);
        return of(errorMsg);
      })
    ).toPromise().then(value => {
      return value === Object(value);
    });
  }
}
