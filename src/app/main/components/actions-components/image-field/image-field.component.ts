import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-image-field',
  templateUrl: './image-field.component.html',
  styleUrls: ['./image-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ImageFieldComponent),
    multi: true,
  }]
})
export class ImageFieldComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() _imageLink: string = '';
  subscribe: Subscription;

  constructor() { }

  @ViewChild('imageField') imageField: ElementRef;
  ngAfterViewInit(): void {
    let example = fromEvent(this.imageField.nativeElement, 'keyup')
      .pipe(map(i => i['currentTarget']['value']));
    let debouncedInput = example.pipe(debounceTime(500));

    this.subscribe = debouncedInput.subscribe(val => {
      this.imageLink = val;
    });
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  public get imageLink() {
    return this._imageLink;
  }
  public set imageLink(val) {
    this._imageLink = val;
    this.onChange(this._imageLink);
  }

  writeValue(value: string): void {
    if (value){
      this.imageLink = value;
    } else {
      this.imageLink = '';
    }
  }
  onChange: any = (_: any) => {};
  onTouched: any = () => {};

  setDisabledState(isDisabled: boolean): void { }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
