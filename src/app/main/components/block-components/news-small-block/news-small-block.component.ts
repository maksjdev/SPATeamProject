import {Component, Input} from '@angular/core';
import {News} from '@shared/models/News';

@Component({
  selector: 'app-news-small-block',
  templateUrl: './news-small-block.component.html',
  styleUrls: ['./news-small-block.component.scss']
})
export class NewsSmallBlockComponent {
  @Input() news: News;

  constructor(){

  }

}
