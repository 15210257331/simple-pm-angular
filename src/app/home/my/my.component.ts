import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../store';
import { TaskService } from '../../service/task.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss']
})
export class MyComponent implements OnInit {

  myTasks: any[] = [1, 2, 3, 4, 5, 6];

  mySchedule: any[] = [];

  constructor(
    private store: Store<Appstate>,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        map(data => data.userState)
      )
      .subscribe(res => {
        // this.userInfo = res.userInfo;
      });

    this.store
      .pipe(
        map(data => data.scheduleState)
      )
      .subscribe(res => {
        this.mySchedule = res;
        this.mySchedule.map(item => {
          item.startTime = moment(item.startTime).format('YYYY-MM-DD HH:mm:ss');
        });
      });
  }

}
