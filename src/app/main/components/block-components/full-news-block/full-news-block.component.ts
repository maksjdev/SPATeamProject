import {Component, OnInit} from '@angular/core';
import {News} from '@shared/models/News';
import {NewsDataService} from '@shared/news-data.service';
import {CONSTANTS} from '@shared/config/constants';


@Component({
  selector: 'app-full-news-block',
  templateUrl: './full-news-block.component.html',
  styleUrls: ['./full-news-block.component.scss']
})
export class FullNewsBlockComponent implements OnInit {
  news: News;
  commentsList: Array<object>;

  constructor(
    private newsSercice: NewsDataService,
  ) {
    this.news = this.newsSercice.getMockNews();
  }

  ngOnInit(): void {
    this.commentsList = [
      { user: {
          image: [CONSTANTS.MOCK.USER_IMAGE],
          nickname: 'AuthorNickname1'
        },
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
        date: '1542196324'
      },
      { user: {
          image: [CONSTANTS.MOCK.USER_IMAGE],
          nickname: 'AuthorNickname2'
        },
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
        date: '1542196324'
      },
      { user: {
          image: [CONSTANTS.MOCK.USER_IMAGE],
          nickname: 'AuthorNickname3'
        },
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
        date: '1542196324'
      },
      { user: {
          image: [CONSTANTS.MOCK.USER_IMAGE],
          nickname: 'AuthorNickname4'
        },
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
        date: '1542196324'
      },
    ];
  }

}
