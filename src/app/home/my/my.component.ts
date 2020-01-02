import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../store';
import { TaskService } from '../../service/task.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { TaskDetailComponent } from '../project/task-detail/task-detail.component';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss']
})
export class MyComponent implements OnInit {

  myTasks: any[] = [];

  completeNum = 0;

  penddingNum = 0;

  notStartNum = 0;

  mySchedule: any[] = [];

  myTasksLoading = true;

  myScheduleLoading = true;

  constructor(
    private store: Store<Appstate>,
    private taskService: TaskService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.getMytasks();
    this.store
      .pipe(
        map(data => data.scheduleState)
      )
      .subscribe(res => {
        this.mySchedule = res;
        this.mySchedule.map(item => {
          item.startTime = moment(item.startTime).format('YYYY-MM-DD');
        });
        this.myScheduleLoading = false;
      });
  }

  getMytasks() {
    this.taskService.getMyTasks().subscribe(res => {
      if (res.code === 200) {
        this.myTasks = res.data || [];
        this.notStartNum = this.myTasks.filter(item => item.status === 1).length;
        this.penddingNum = this.myTasks.filter(item => item.status === 2).length;
        this.completeNum = this.myTasks.filter(item => item.status === 3).length;
        this.myTasksLoading = false;
      }
    });
  }

}
