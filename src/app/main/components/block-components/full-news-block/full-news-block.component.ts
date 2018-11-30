import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {News} from '@shared/models/News';
import {MockDataService} from '@shared/mock-data.service';
import {Comment} from '@shared/models/Comment';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-full-news-block',
  templateUrl: './full-news-block.component.html',
  styleUrls: ['./full-news-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullNewsBlockComponent implements OnChanges{
  @Input() news: News;
  public _htmlContent: string;

  favorites: boolean;

  constructor(
    private _sanitizer: DomSanitizer
  ) { }

  toggle(event) {
    this.favorites = !this.favorites;
  }

  public get htmlContent(): SafeHtml {
    let string = this._htmlContent ? this._htmlContent : '';
    return this._sanitizer.bypassSecurityTrustHtml(string);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('news') && changes['news'].currentValue){
      this._htmlContent = this.news.text;
    }
  }
}
