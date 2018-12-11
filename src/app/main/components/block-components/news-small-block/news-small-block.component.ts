import {Component, Input} from '@angular/core';
import {News} from '@shared/models/News';
import {AppRoutingService} from '@routes/app-routing.service';

@Component({
  selector: 'app-news-small-block',
  templateUrl: './news-small-block.component.html',
  styleUrls: ['./news-small-block.component.scss']
})
export class NewsSmallBlockComponent {
  @Input() news: News;

  constructor(
    private routingService: AppRoutingService,
  ){ }

  public goToNews(event){
    let id: string = this.news.getId();
    this.routingService.goToNews(id);
  }
}
