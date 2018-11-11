import {Component, Input, OnInit} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {PaginationItem} from '@shared/models/PaginationItem';
import {CONSTANTS} from '@shared/config/constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit{
  @Input() pagination: PaginationItem;
  paramName: string;

  constructor(
    private routingService: AppRoutingService,
  ) {
    this.paramName = CONSTANTS.QUERY.PAGE;

    // Значение по умолчанию
    this.pagination = new PaginationItem(10, 9,11, 1, 20);
  }

  ngOnInit(): void {
    // Просто для демонстрации ставим параметр
    let queryParam = {[this.paramName]: this.pagination.current};
    this.routingService.setQueryParam(queryParam);
  }

  onPagination(page: number){
    console.log(`Необходимо перейти на ${page} страницу!`);
  }
}
