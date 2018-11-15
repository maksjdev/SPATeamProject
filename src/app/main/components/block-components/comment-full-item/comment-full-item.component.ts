import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-comment-full-item',
  templateUrl: './comment-full-item.component.html',
  styleUrls: ['./comment-full-item.component.scss']
})
export class CommentFullItemComponent implements OnInit {
  @Input() comment: object;

  constructor() { }

  ngOnInit() {
  }

}
