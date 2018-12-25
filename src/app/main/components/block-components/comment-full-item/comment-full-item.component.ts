import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Comment} from '@shared/models/Comment';
import {CONSTANTS} from '@shared/config/constants';
import {AppDialogService} from '@shared/services/app-dialog.service';
import {UserDataService} from '@shared/user-data.service';

@Component({
  selector: 'app-comment-full-item',
  templateUrl: './comment-full-item.component.html',
  styleUrls: ['./comment-full-item.component.scss']
})
export class CommentFullItemComponent implements OnChanges {
  @Input() comment: Comment;
  public onLiked: boolean;
  @Output() delete = new EventEmitter();
  @Output() like = new EventEmitter();

  constructor(
    private dialogService: AppDialogService,
    private userService: UserDataService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('comment') && changes['comment'].currentValue) {
      if (!this.comment) { return; }
      let commetnId = this.comment.getId();
      this.onLiked = this.userService.likedComment(commetnId);
    }
  }

  OnDelete($event) {
    this.dialogService.confirmDialog(CONSTANTS.MSG.CONFIRM_DEL_COMMENT).toPromise().then((value: boolean) => {
      if (value) this.delete.emit(this.comment);
    });
  }
  OnLike($event){
    let commentId = this.comment.getId();
    this.like.emit({id: commentId, liked: !this.onLiked});
  }
}
