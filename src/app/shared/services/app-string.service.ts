import { Injectable } from '@angular/core';
import {ShortenPipe} from 'ngx-pipes';
import {Category} from '@shared/models/Category';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Injectable()
export class AppStringService {

  constructor(
    private shortPipe: ShortenPipe,
    private _sanitizer: DomSanitizer
  ) { }

  public getSafeHtml(html: string): SafeHtml {
    let string = html? html : '';
    return this._sanitizer.bypassSecurityTrustHtml(string);
  }
  public trimmString(string, maxLenght, suffix?): string {
    suffix = suffix? suffix : ' ...';
    let lengthShort: number = this.trimmedLenght(string, maxLenght);
    return this.shortPipe.transform(string, lengthShort, suffix);
  }
  private trimmedLenght(str: string, maxLength: number): number{
    let trimmedString = str.substr(0, maxLength);
    return Math.min(trimmedString.length, trimmedString.lastIndexOf(" "));
  }
  public leftText(arr: Array<object>): string {
    let result: string = '';
    arr.filter( (obj, ind, arr) => {
      return obj['type'] === 'text';
    }).forEach( (obj) => {
      result += obj['value'] + ' \n';
    });
    return result;
  }
  public getAllBeforeTag(text: string, tag: string): string{
    if (text.includes('<'+tag+'>')){
      let regExp = new RegExp('(.)+?(?:<'+tag+'>)', 'i');
      return text.match(regExp)[0];
    } else {
      return text;
    }
  }
}
