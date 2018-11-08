import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating-filter',
  templateUrl: './rating-filter.component.html',
  styleUrls: ['./rating-filter.component.scss']
})
export class RatingFilterComponent {
  @Input() currentRating = 'any';

  mockRatings: Array<object> = [
    {name: 'Любой', value: 'any'},
    {name: '≥ 10', value: '10'},
    {name: '≥ 25', value: '25'},
    {name: '≥ 50', value: '50'},
    {name: '≥ 100', value: '100'}
  ];

  constructor() { }

  onRatingChange(value: string): void {
    console.info(`Change rating: ${value}`);
    this.currentRating = value;
  }
}
