import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../store';
import { TaskService } from '../../service/task.service';
import { map } from 'rxjs/operators';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import * as moment from 'moment';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss']
})
export class MyComponent implements OnInit {

  userInfo: any;

  memberList: any[] = [];

  scheduleList: any[] = [];

  myTaskList: any[] = [];

  constructor(
    private store: Store<Appstate>,
    private taskService: TaskService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.store.pipe(map(data => data.userInfo)).subscribe(res => {
      this.userInfo = res;
    });
    this.store.pipe(map(data => data.scheduleList)).subscribe(res => {
      this.scheduleList = res.filter(item => Number(moment(item.startTime).format('x')) > Number(moment().format('x')));
    });
    this.getMyTask();
  }

  getMyTask() {
    this.taskService.getMyTasks().subscribe(res => {
      if (res.code === 10000) {
        this.myTaskList = res.data || [];
      }
    });
  }
}
