import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {ParamMap} from '@angular/router';
import {CONSTANTS} from '@shared/config/constants';
import {AppRoutingService} from '@routes/app-routing.service';

@Component({
  selector: 'app-search-block',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit, AfterViewInit, OnDestroy{
  @Input() stringPlaceHolder: string = "Поиск..";
  @Output() search = new EventEmitter();
  subscribe: Subscription;

  constructor(
    private routingService: AppRoutingService,
  ){}

  ngOnInit(): void {
    this.routingService.getActiveQueryParam().subscribe((params: ParamMap) => {
      let searchQuery: string = params.get(CONSTANTS.QUERY.SEARCH);
      if (!this.searchField.nativeElement.value) {
        this.searchField.nativeElement.value = searchQuery;
      }
    })
  }

  @ViewChild('searchField') searchField: ElementRef;
  ngAfterViewInit(): void {
    let example = fromEvent(this.searchField.nativeElement, 'keyup')
      .pipe(map((i: Event) => i.currentTarget['value']));
    let debouncedInput = example.pipe(debounceTime(500));
    this.subscribe = debouncedInput.subscribe(val => {
      this.filterEvent(val);
    });
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  filterEvent(filter) {
    this.search.emit(filter);
  }
}

