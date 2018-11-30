import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '@shared/models/Comment';

@Component({
  selector: 'app-comment-full-item',
  templateUrl: './comment-full-item.component.html',
  styleUrls: ['./comment-full-item.component.scss']
})
export class CommentFullItemComponent  {
  @Input() comment: Comment;
  isDeleted: boolean = false;

  constructor() { }


  OnDelete($event) {
    this.isDeleted = true;
  }
}
