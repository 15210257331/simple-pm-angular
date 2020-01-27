import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../store';
import { TaskService } from '../../service/task.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { TaskDetailComponent } from '../project-detail/task-detail/task-detail.component';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { SocketService } from '../../service/socket.service';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss']
})
export class MyComponent implements OnInit {

  completeNum = 0;

  penddingNum = 0;

  notStartNum = 0;

  mySchedule: any[] = [];

  myScheduleLoading = true;

  constructor(
    private store: Store<Appstate>,
    private taskService: TaskService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        map(data => data.scheduleState)
      )
      .subscribe(res => {
        this.mySchedule = res.filter(item => item.startTime > Number(moment().format('x'))).map(item => {
          return Object.assign({}, item, {
            startTime: moment(item.startTime).format('MM-DD HH:mm:ss')
          });
        });
        this.myScheduleLoading = false;
      });
  }
}
