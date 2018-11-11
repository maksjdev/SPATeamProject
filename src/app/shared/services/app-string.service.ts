import { Injectable } from '@angular/core';
import {ShortenPipe} from 'ngx-pipes';

@Injectable()
export class AppStringService {

  constructor(
    private shortPipe: ShortenPipe
  ) { }

  public trimmString(string, maxLenght, suffix?): string {
    let lengthShort: number = this.trimmedLenght(string, maxLenght);
    return this.shortPipe.transform(string, lengthShort, suffix? suffix : ' ...');
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
}
