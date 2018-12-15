import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppRestService} from '@shared/http/app-rest.service';
import {NewsDataService} from '@shared/news-data.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {News} from '@shared/models/News';
import {UserDataService} from '@shared/user-data.service';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoPageComponent implements OnInit, OnDestroy {
  private subscribe: Subscription;
  public _htmlText: string;

  constructor(
    private userService: UserDataService,
    private newsService: NewsDataService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.newsService.getFullNewsData('100').subscribe( (news: News) => {
      this._htmlText = news.getText();
    });
  }
  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }

  public get htmlContent(): SafeHtml {
    let string = this._htmlText? this._htmlText : '';
    return this._sanitizer.bypassSecurityTrustHtml(string);
  }

  public loadData(event){
    this.subscribe = this.userService.getUserData('1').subscribe( (data) => {
      Object.keys(data).length > 0 ? alert(JSON.stringify(data)) : alert('Запути сервер *npm mock*, дурашка))');
    });
  }
}
