import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppRestService} from '@shared/http/app-rest.service';
import {NewsDataService} from '@shared/news-data.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoPageComponent implements OnDestroy {
  private subscribe: Subscription;
  public _htmlText: string;

  constructor(
    private restService: AppRestService,
    private newsService: NewsDataService,
    private _sanitizer: DomSanitizer
  ) {
    this._htmlText = this.newsService.getFullNewsData('1111').text;
  }

  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }

  public get htmlContent(): SafeHtml {
    let string = this._htmlText? this._htmlText : '';
    return this._sanitizer.bypassSecurityTrustHtml(string);
  }

  public loadData(event){
    this.subscribe = this.restService.getUserData('1').subscribe( (data) => {
      Object.keys(data).length > 0 ? alert(JSON.stringify(data)) : alert('Запути сервер *npm mock*, дурашка))');
    });
  }
}
