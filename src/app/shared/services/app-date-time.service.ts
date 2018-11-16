import { Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';

@Injectable()
export class AppDateTimeService {

  constructor(
    private datePipe: DatePipe
  ) {}

  findDiffInDays(date1: Date, date2: Date): number {
    let diff = Math.abs(date1.getTime() - date2.getTime());
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  }
  getDateVisual(date: Date): string {
    return this.datePipe.transform(date, 'dd.MM.yyyy');
  }
  getDateReal(visualDate: string): Date {
    //  expect smth like '05.07.2019'
    if (this.visualFormatCheck(visualDate)) {
      let arr: number[] = visualDate.split('.').map(function (item) {
        return +item;
      });
      return new Date(arr[2], arr[1] - 1, arr[0]);
    } else return;
  }
  visualFormatCheck(visual: string): boolean {
    return RegExp('^(3[01]|[12][0-9]|0[1-9]).(1[0-2]|0[1-9]).[0-9]{4}').test(visual);
  }
  checkDateToday(date: Date) {
    let today = new Date();
    return this.getDateVisual(date) === this.getDateVisual(today);
  }
  unixToDate(timestamp): Date {
    return new Date(+timestamp * 1000);
  }
}
