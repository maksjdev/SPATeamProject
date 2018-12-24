import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Comment} from '@shared/models/Comment';
import {CONSTANTS} from '@shared/config/constants';
import {AppDialogService} from '@shared/services/app-dialog.service';

@Component({
  selector: 'app-comment-full-item',
  templateUrl: './comment-full-item.component.html',
  styleUrls: ['./comment-full-item.component.scss']
})
export class CommentFullItemComponent  {
  @Input() comment: Comment;
  @Output() commentDelete = new EventEmitter();

  constructor(
    private dialogService: AppDialogService
  ) { }

  OnDelete($event) {
    this.dialogService.confirmDialog(CONSTANTS.MSG.CONFIRM_DEL_COMMENT).toPromise().then((value: boolean) => {
      if (value) this.commentDelete.emit(this.comment);
    });
  }

  ratingRaise($event){
    // Передать родителью что кликнули
  }
  ratingDowngrade($event){
    // Передать родителью что кликнули
  }
}
