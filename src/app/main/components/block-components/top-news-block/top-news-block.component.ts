import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NewsDataService} from '@shared/news-data.service';
import {News} from '@shared/models/News';
import {Subscription} from 'rxjs';
import {ConfigService} from '@shared/config/config.service';
import {Category} from '@shared/models/Category';

@Component({
  selector: 'app-top-news-block',
  templateUrl: './top-news-block.component.html',
  styleUrls: ['./top-news-block.component.scss']
})
export class TopNewsBlockComponent implements OnInit, OnDestroy {
  @Input() maxNumber: number;
  public newsList: Array<News>;
  private _subcription: Subscription;

  constructor(
    private newsService: NewsDataService,
    private configService: ConfigService
  ){
    if (!this.maxNumber || isNaN(this.maxNumber)){
      this.maxNumber = this.configService.getTopBlockMax();
    }
  }

  ngOnInit(): void {
    this._subcription = this.newsService.getTopNews(this.maxNumber, 'small').subscribe((value: Array<News>) => {
      if (!value) return;
      this.newsList = [...value];
    })
  }


  ngOnDestroy(): void {
    this._subcription.unsubscribe();
  }

}
