import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {PaginationItem} from '@shared/models/PaginationItem';
import {CONSTANTS} from '@shared/config/constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges{
  @Input() currentPagination: PaginationItem;
  @Output() paginationChg = new EventEmitter();
  paramName: string;

  constructor(
    private routingService: AppRoutingService,
  ) {
    this.paramName = CONSTANTS.QUERY.PAGE;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('currentPagination') &&  changes['currentPagination'].currentValue){
      setTimeout(_ =>{
        let param = {[this.paramName]: this.currentPagination.current};
        this.routingService.setQueryParam(param);
      },20);
    }
  }

  onPagination(page: number){
    this.paginationChg.emit(page);
  }
}
