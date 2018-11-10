import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {News} from '@shared/models/News';
import {AppStringService} from '@shared/services/app-string.service';

@Component({
  selector: 'app-news-item-block',
  templateUrl: './news-item-block.component.html',
  styleUrls: ['./news-item-block.component.scss']
})
export class NewsItemBlockComponent implements OnChanges {
  @Input() news: News;
  textContent: string;

  constructor(
    private stringServivce: AppStringService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.textContent = this.stringServivce.leftText(this.news.text);
  }
}
