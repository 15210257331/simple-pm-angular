import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss'],
})
export class ColorListComponent implements OnInit {

  colors: string[] = ['#FFB6C1', '#00BFFF', '#00FFFF', '#FFA500', '#F08080', '#f50', '#108ee9'];

  selectIndex = null;

  // tslint:disable-next-line: no-output-native
  @Output() select: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  click(item, i) {
    this.selectIndex = i;
    this.select.emit(item);
  }
}
