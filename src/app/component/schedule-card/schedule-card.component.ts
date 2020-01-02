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

  constructor() { }

  ngOnInit() {
    const startTime = moment(this.data.startTime).format('x');
    const now = moment().format('x');
    if (Number(startTime) - Number(now) < 1000 * 60 * 60 * 24) {
      this.color = 'rgb(250, 90, 85)';
    } else if (Number(startTime) - Number(now) >= 1000 * 60 * 60 * 24) {
      this.color = '#348FE4';
    } else {
      this.color = 'greed';
    }
  }

}
