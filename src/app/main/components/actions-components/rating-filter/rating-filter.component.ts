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
  selector: 'app-rating-filter',
  templateUrl: './rating-filter.component.html',
  styleUrls: ['./rating-filter.component.scss'],
})
export class RatingFilterComponent implements OnChanges {
  @Input() currentRating;
  @Output() ratingChg = new EventEmitter();
  paramName: string;

  mockRatings: Array<object> = [
    {name: 'Любой', value: ''},
    {name: '≥ 10', value: '10'},
    {name: '≥ 25', value: '25'},
    {name: '≥ 50', value: '50'},
    {name: '≥ 100', value: '100'}
  ];

  constructor(
    private routingService: AppRoutingService
  ) {
    this.paramName = CONSTANTS.QUERY.RATING;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('currentRating') &&  changes['currentRating'].currentValue){
      setTimeout(_ => {
        let param = {[this.paramName]: this.currentRating};
        this.routingService.setQueryParam(param);
      }, 20);
    }
  }

  OnRatingChg(value){
    this.ratingChg.emit(value);
  }
}
