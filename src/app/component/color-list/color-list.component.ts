import { Component, OnInit, Output, EventEmitter, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorListComponent),
      multi: true
    }
  ],
})
export class ColorListComponent implements OnInit, ControlValueAccessor {

  colors: string[] = ['#FFB6C1', '#00BFFF', '#00FFFF', '#FFA500', '#F08080', '#f50', '#108ee9'];

  selectIndex = null;

  onChange: (value: string) => void = () => null;

  onTouched: () => void = () => null;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  writeValue(value: string): void {
    if (value) {
      this.colors.map((item, i) => {
        if (value === item) {
          this.selectIndex = i;
        }
      });
    } else {
      this.selectIndex = null;
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  click(item, i) {
    this.selectIndex = i;
    this.onChange(item);
    this.cdr.markForCheck();
  }
}
