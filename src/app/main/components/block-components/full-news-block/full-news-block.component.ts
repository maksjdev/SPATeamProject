import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {News} from '@shared/models/News';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-full-news-block',
  templateUrl: './full-news-block.component.html',
  styleUrls: ['./full-news-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullNewsBlockComponent implements OnChanges{
  @Input() news: News;
  @Input() onFavorites: boolean;
  public _htmlContent: string;

  @Output() favoritesToggle = new EventEmitter();
  @Output() editClick = new EventEmitter();

  constructor(
    private _sanitizer: DomSanitizer
  ) { }

  public get htmlContent(): SafeHtml {
    let string = this._htmlContent ? this._htmlContent : '';
    return this._sanitizer.bypassSecurityTrustHtml(string);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('news') && changes['news'].currentValue) {
      this._htmlContent = this.news.text;
    }
  }

  onEditNews (event) {
    this.editClick.emit(event);
  }
  toggleFavorites(event) {
    this.favoritesToggle.emit(!this.onFavorites);
  }
}
