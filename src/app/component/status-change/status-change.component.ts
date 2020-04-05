import { Component, OnInit, Input, ChangeDetectorRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-status-change',
  templateUrl: './status-change.component.html',
  styleUrls: ['./status-change.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatusChangeComponent),
      multi: true
    }
  ],
})
export class StatusChangeComponent implements OnInit, ControlValueAccessor {

  @Input() data: any[] = [
    {
      name: '未开始',
      value: 1,
      color: '#2db7f5'
    },
    {
      name: '进行中',
      value: 2,
      color: '#22d7bb'
    },
    {
      name: '已完成',
      value: 3,
      color: '#87d068'
    },
    {
      name: '作废',
      value: 4,
      color: '#f50'
    },
  ];

  selectedStatus: any;

  showStatusList = false;

  onChange: (value: string) => void = () => null;

  onTouched: () => void = () => null;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  writeValue(value: number): void {
    if (value) {
      this.data.map(item => {
        if (item.value === value) {
          this.selectedStatus = item;
        }
      });
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  changeShow() {
    this.showStatusList = !this.showStatusList;
  }

  select(data: any) {
    this.selectedStatus = data;
    this.changeShow();
    this.onChange(data.value);
    this.cdr.markForCheck();
  }
}
