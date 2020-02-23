import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate, DeleteMember } from '../../store';
import { TaskService } from '../../service/task.service';
import { map } from 'rxjs/operators';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss']
})
export class MyComponent implements OnInit {

  userInfo: any;

  memberList: any[] = [];

  constructor(
    private store: Store<Appstate>,
    private taskService: TaskService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.store.pipe(map(data => data.userState.userInfo)).subscribe(res => {
      this.userInfo = res;
    });
    this.store.pipe(map(data => data.userState.memberList)).subscribe(res => {
      this.memberList = res || [];
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
