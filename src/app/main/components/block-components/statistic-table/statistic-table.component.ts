import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic-table',
  templateUrl: './statistic-table.component.html',
  styleUrls: ['./statistic-table.component.scss']
})
export class StatisticTableComponent implements OnInit {
  tableData = [
    {days: 3, weeks: 1, years: 0},
  ];
  constructor() { }

  ngOnInit() {
  }

}
