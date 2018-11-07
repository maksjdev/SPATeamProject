import {Component} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  mockPagination: object = {
    previous: 19,
    current: 20,
    next: 21,

    large_back: 10,
    large_forward: 30,
  };

  constructor() { }

}
