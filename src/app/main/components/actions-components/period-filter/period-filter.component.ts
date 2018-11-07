import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-period-filter',
  templateUrl: './period-filter.component.html',
  styleUrls: ['./period-filter.component.scss']
})
export class PeriodFilterComponent {
  @Input() currentPeriod = 'all';

  mockPeriod: Array<object> = [
    {name: 'Все время', value: 'all'},
    {name: 'Сегодня', value: 'today'},
    {name: 'Неделя', value: 'week'},
    {name: 'Месяц', value: 'month'},
  ];

  constructor() { }

  onPeriodChange(value: string) {
    console.info(`Change period: ${value}`);
    this.currentPeriod = value;
  }
}
