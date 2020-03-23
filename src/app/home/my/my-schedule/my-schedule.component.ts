import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.scss']
})
export class MyScheduleComponent implements OnInit {

  @Input() data: any[] = [];

  color: any;

  colors: string[] = ['#f50', '#2db7f5', '#87d068', 'orange', '#108ee9'];

  constructor() { }

  ngOnInit() {
    const index = Math.floor(Math.random() * 5);
    this.color = this.colors[index];
  }
}
