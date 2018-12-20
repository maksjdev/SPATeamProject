import {ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-html-edit',
  templateUrl: './html-edit.component.html',
  styleUrls: ['./html-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HtmlEditComponent),
    multi: true,
  }]
})
export class HtmlEditComponent implements ControlValueAccessor {
  @Input() _htmlContent: string = '';
  toolbarConfig: Array<Array<string>>;

  @ViewChild('ngxEditor') ngxEditor: any;
  constructor(
    // private _sanitizer: DomSanitizer
  ) {
    this.toolbarConfig = [
      ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
      ["fontSize", "color"],
      ["justifyLeft", "justifyCenter", "justifyRight", "indent", "outdent"],
      ["delete", "removeFormat", "undo"],
      ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
      ["link", "img_url", "video"]
    ];
  }

  onBlur(event){
    this.htmlContent = this.htmlContent;
  }

  public set htmlContent(val: string) {
    this._htmlContent = val;
    this.onChange(this._htmlContent);
  }
  public get htmlContent(): string {
    // let string = this._htmlContent? this._htmlContent : '';
    // return this._sanitizer.bypassSecurityTrustHtml(string).toString();
    return this._htmlContent;
  }

  writeValue(value: string): void {
    if (value){
      this.htmlContent = value;
      this.ngxEditor.refreshView(this._htmlContent);
    } else {
      this.htmlContent = '';
    }
  }
  onChange: any = () => {};
  onTouched: any = () => {};

  setDisabledState(isDisabled: boolean): void { }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
