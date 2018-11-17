import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppRestService} from '@shared/http/app-rest.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-demo-functions',
  templateUrl: './demo-functions.component.html',
  styleUrls: ['./demo-functions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoFunctionsComponent {
  @Input() _htmlContent: string;
  toolbarConfig: Array<Array<string>>;

  constructor(
    private _sanitizer: DomSanitizer
  ) {
    this.toolbarConfig = [
      ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
      ["fontSize", "color"],
      ["justifyLeft", "justifyCenter", "justifyRight", "indent", "outdent"],
      ["delete", "removeFormat", "undo"],
      ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
      ["link", "image", "video"]
    ];
  }

  public get htmlContent(): SafeHtml {
    let string = this._htmlContent? this._htmlContent : '';
    return this._sanitizer.bypassSecurityTrustHtml(string);
  }
}
