import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-search-block',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements AfterViewInit, OnDestroy{
  @Input() stringPlaceHolder: string = "Поиск..";
  @Output() search = new EventEmitter();
  subscribe: Subscription;

  @ViewChild('searchField') searchField: ElementRef;
  ngAfterViewInit(): void {
    let example = fromEvent(this.searchField.nativeElement, 'keyup')
      .pipe(map(i => i['currentTarget']['value']));
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

