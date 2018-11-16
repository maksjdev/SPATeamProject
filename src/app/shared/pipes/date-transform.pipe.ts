import {Pipe, PipeTransform} from '@angular/core';
import {AppDateTimeService} from '@shared/services/app-date-time.service';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {

  constructor (
    private datePipe: DatePipe,
    private dateTimeService: AppDateTimeService
  ){}

  transform(date: Date, args?: any): string {
    let result: string = '';
    switch (this.dateTimeService.findDiffInDays(date, new Date())) {
      case 1: result = `сегодня в ${this.datePipe.transform(date, 'h:mm')}`; break;
      case 2: result = `вчера в ${this.datePipe.transform(date, 'h:mm')}`; break;
      default: {
        result = this.datePipe.transform(date, 'd MMMM y в h:mm'); break;
      }
    }
    return result;
  }
}
