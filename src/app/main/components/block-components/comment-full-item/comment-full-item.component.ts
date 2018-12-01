import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from '@shared/models/Comment';

@Component({
  selector: 'app-comment-full-item',
  templateUrl: './comment-full-item.component.html',
  styleUrls: ['./comment-full-item.component.scss']
})
export class CommentFullItemComponent  {
  @Input() comment: Comment;
  @Output() commentDelete = new EventEmitter();

  constructor() { }

  OnDelete($event) {
    this.commentDelete.emit(this.comment);
  }

  ratingRaise($event){
    // Передать родителью что кликнули
  }
  ratingDowngrade($event){
    // Передать родителью что кликнули
  }
}
