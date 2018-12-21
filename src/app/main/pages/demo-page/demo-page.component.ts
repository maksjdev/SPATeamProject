import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppRestService} from '@shared/http/app-rest.service';
import {NewsDataService} from '@shared/news-data.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {News} from '@shared/models/News';
import {UserDataService} from '@shared/user-data.service';
import {AppDialogService} from '@shared/services/app-dialog.service';

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
    private _sanitizer: DomSanitizer,
    private userService: UserDataService,
    private newsService: NewsDataService,
    private dialogService: AppDialogService,
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
    let id: string = this.userService.getCurrentUserData().getValue().id;
    this.subscribe = this.userService.getUserData(id).subscribe( (data) => {
      this.dialogService.showDialog(
        Object.keys(data).length > 0 ? data.toString()
          : 'Запути сервер *npm server|mock*, дурашка))'
      );
    });
  }
}
