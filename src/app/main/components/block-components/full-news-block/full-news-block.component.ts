import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {News} from '@shared/models/News';
import {MockDataService} from '@shared/mock-data.service';
import {Comment} from '@shared/models/Comment';

@Component({
  selector: 'app-full-news-block',
  templateUrl: './full-news-block.component.html',
  styleUrls: ['./full-news-block.component.scss']
})
export class FullNewsBlockComponent implements OnInit {
  @Input() news: News;
  favorites: boolean;
  commentsList: Array<Comment>;

  constructor(
    private mockService: MockDataService
  ) {}

  ngOnInit(): void {
    this.commentsList = this.mockService.getMockCommentList(5);
  }

  toggle(event){
    this.favorites = !this.favorites;
  }
}
