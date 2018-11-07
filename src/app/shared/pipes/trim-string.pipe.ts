import { Pipe, PipeTransform } from '@angular/core';
import {AppStringService} from '@shared/services/app-string.service';

@Pipe({
  name: 'trimString'
})
export class TrimStringPipe implements PipeTransform {
  constructor (
    private stringService: AppStringService
  ){}

  transform(value: string, maxLenght: number): string {
    return this.stringService.trimmString(value, maxLenght);
  }

}
