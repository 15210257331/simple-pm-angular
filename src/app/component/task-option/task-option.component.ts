import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-task-option',
  templateUrl: './task-option.component.html',
  styleUrls: ['./task-option.component.scss']
})
export class TaskOptionComponent implements OnInit {

  @Output() new: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  click() {
    this.new.emit({});
  }

}
