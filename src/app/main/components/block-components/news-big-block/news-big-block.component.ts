import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {News} from '@shared/models/News';
import {AppStringService} from '@shared/services/app-string.service';

@Component({
  selector: 'app-news-item-block',
  templateUrl: './news-big-block.component.html',
  styleUrls: ['./news-big-block.component.scss']
})
export class NewsBigBlockComponent implements OnChanges {
  @Input() news: News;
  textContent: string;

  constructor(
    private stringServivce: AppStringService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.textContent = this.stringServivce.leftText(this.news.text);
  }
}
