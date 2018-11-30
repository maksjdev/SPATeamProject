import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {News} from '@shared/models/News';
import {AppStringService} from '@shared/services/app-string.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-news-big-block',
  templateUrl: './news-big-block.component.html',
  styleUrls: ['./news-big-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsBigBlockComponent implements OnChanges {
  @Input() news: News;
  _textContent: string;

  constructor(
    private _sanitizer: DomSanitizer,
  private stringService: AppStringService
  ) {
    this._textContent = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('news') &&  changes['news'].currentValue) {
      this._textContent = this.news.text;
      this._textContent = this.stringService.trimmString(this._textContent, 500, '...');
      this._textContent = this.stringService.getAllBeforeTag(this._textContent, 'div');
    }
  }

  public get textContent(): SafeHtml {
    let string = this._textContent? this._textContent : '';
    return this._sanitizer.bypassSecurityTrustHtml(string);
  }
}
