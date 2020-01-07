import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent implements OnInit {

  @Input() data: any;

  color: any;

  colors: string[] = ['#f50', '#2db7f5', '#87d068', 'orange', '#108ee9'];

  constructor() { }

  ngOnInit() {
    const index = Math.floor(Math.random() * 5);
    this.color = this.colors[index];
  }
}
