import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppRestService} from '@shared/http/app-rest.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-demo-functions',
  templateUrl: './demo-functions.component.html',
  styleUrls: ['./demo-functions.component.scss']
})
export class DemoFunctionsComponent implements OnDestroy {
  _htmlContent: string;
  toolbarConfig: Array<Array<string>>;
  private subscribe: Subscription;

  constructor(
    private restService: AppRestService,
    private _sanitizer: DomSanitizer
  ) {
    this.toolbarConfig = [
      ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
      ["fontName", "fontSize", "color"],
      ["justifyLeft", "justifyCenter", "justifyRight", "indent", "outdent"],
      ["delete", "removeFormat", "undo"],
      ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
      ["link"]
    ];
  }

  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }

  public loadData(event){
    this.subscribe = this.restService.getMockData('users').subscribe( (data) => {
      Object.keys(data).length > 0 ? alert(JSON.stringify(data[0])) : alert('Запути сервер *npm mock*, дурашка))');
    });
  }
  public getHtml(){
    console.log(this._htmlContent);
  }
  public get htmlContent(): SafeHtml {
    let string = this._htmlContent? this._htmlContent : '';
    return this._sanitizer.bypassSecurityTrustHtml(string);
  }
}
