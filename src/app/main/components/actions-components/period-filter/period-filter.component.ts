import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {CONSTANTS} from '@shared/config/constants';

@Component({
  selector: 'app-period-filter',
  templateUrl: './period-filter.component.html',
  styleUrls: ['./period-filter.component.scss'],
})
export class PeriodFilterComponent implements OnChanges {
  @Input() currentPeriod;
  @Output() periodChg = new EventEmitter();
  paramName: string;

  mockPeriod: Array<object> = [
    {name: 'Все время', value: 'all'},
    {name: 'Сегодня', value: 'today'},
    {name: 'Неделя', value: 'week'},
    {name: 'Месяц', value: 'month'},
  ];

  constructor(
    private routingService: AppRoutingService
  ) {
    this.paramName = CONSTANTS.QUERY.PERIOD;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('currentPeriod') &&  changes['currentPeriod'].currentValue){
      setTimeout(_ =>{
        let param = {[this.paramName]: this.currentPeriod};
        this.routingService.setQueryParam(param);
      },20);
    }
  }

  OnPeriodChg(value){
    this.periodChg.emit(value);
  }
}
