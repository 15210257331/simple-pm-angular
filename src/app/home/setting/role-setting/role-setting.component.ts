import { UserService } from './../../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Appstate, DeleteRoleSuccess, LoadRoleList } from '../../../store';
import { Store } from '@ngrx/store';
import { TaskService } from 'src/app/service/task.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';
import { RoleAddComponent } from './role-add/role-add.component';
import { SetAuthorityComponent } from './set-authority/set-authority.component';

@Component({
  selector: 'app-role-setting',
  templateUrl: './role-setting.component.html',
  styleUrls: ['./role-setting.component.scss']
})
export class RoleSettingComponent implements OnInit {

  roleList: any[] = [];

  name: string;

  constructor(
    private store: Store<Appstate>,
    private taskService: TaskService,
    private modalService: NzModalService,
    private userService: UserService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit() {
    this.store.pipe(map(data => data.roleList)).subscribe(res => {
      this.roleList = res || [];
    });
  }

  searchRole() {
    this.store.dispatch(new LoadRoleList(String(this.name)));
  }

  addRole(item?) {
    const modal = this.modalService.create({
      nzTitle: item ? '修改角色' : '添加角色',
      nzContent: RoleAddComponent,
      nzComponentParams: {
        title: '新建项目',
        data: item
      },
      nzFooter: null,
      nzWidth: 640,
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(res => {
      if (res && res.result) { }
    });
  }

  deleteRole(id, name, event) {
    event.stopPropagation();
    this.modalService.confirm({
      nzTitle: '警告',
      nzContent: `确定删除${name}吗？`,
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.userService.deleteRole(id).subscribe(res => {
          if (res.code === 200) {
            this.notification.create('success', 'sucess', res.msg);
            this.store.dispatch(new DeleteRoleSuccess(res));
          }
        });
      },
      nzCancelText: '取消',
    });
  }

  setAuthority(item) {
    const modal = this.modalService.create({
      nzTitle: '权限配置',
      nzContent: SetAuthorityComponent,
      nzComponentParams: {
        title: '权限配置',
        data: item
      },
      nzFooter: null,
      nzWidth: 840,
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(res => {
      if (res && res.result) { }
    });
  }

}
