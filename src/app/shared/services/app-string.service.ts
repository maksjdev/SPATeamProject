import { Injectable } from '@angular/core';
import {ShortenPipe} from 'ngx-pipes';

@Injectable()
export class AppStringService {

  constructor(
    private shortPipe: ShortenPipe
  ) { }

  trimmString(string, maxLenght, suffix?): string {
    let lengthShort: number = this.trimmedLenght(string, maxLenght);
    return this.shortPipe.transform(string, lengthShort, suffix? suffix : ' ...');
  }
  trimmedLenght(str: string, maxLength: number): number{
    let trimmedString = str.substr(0, maxLength);
    return Math.min(trimmedString.length, trimmedString.lastIndexOf(" "));
  }
}
