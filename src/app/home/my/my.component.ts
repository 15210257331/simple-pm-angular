import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate, DeleteMember } from '../../store';
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

  myScheduleList: any[] = [];

  myTaskList: any[] = [];

  constructor(
    private store: Store<Appstate>,
    private taskService: TaskService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.store.pipe(map(data => data.userState.userInfo)).subscribe(res => {
      this.userInfo = res;
    });
    this.store.pipe(map(data => data.scheduleState)).subscribe(res => {
      this.myScheduleList = res.filter(item => item.startTime > Number(moment().format('x'))).map(item => {
        return Object.assign({}, item, {
          startTime: moment(item.startTime).format('MM-DD HH:mm:ss')
        });
      });
    });
    this.getMyTask();
  }

  getMyTask() {
    this.taskService.getMyTasks().subscribe(res => {
      if (res.code === 200) {
        this.myTaskList = res.data || [];
      }
    });
  }

  deleteMember(id, name, event) {
    event.stopPropagation();
    this.modalService.confirm({
      nzTitle: '警告',
      nzContent: `确定删除成员${name}吗？`,
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => this.store.dispatch(new DeleteMember(id)),
      nzCancelText: '取消',
    });
  }
}
