import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate, LoadMemberList, DeleteMemberSuccess } from '../../../store';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';
import { SetRoleComponent } from './set-role/set-role.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-member-setting',
  templateUrl: './member-setting.component.html',
  styleUrls: ['./member-setting.component.scss']
})
export class MemberSettingComponent implements OnInit {

  memberList: any[] = [];

  name: string = '';

  constructor(
    private store: Store<Appstate>,
    private modalService: NzModalService,
    private userService: UserService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit() {
    this.store.pipe(map(data => data.memberList)).subscribe(res => {
      this.memberList = res || [];
    });
  }

  searchMember() {
    this.store.dispatch(new LoadMemberList(String(this.name)));
  }

  setRole(item) {
    const modal = this.modalService.create({
      nzTitle: '设置角色',
      nzContent: SetRoleComponent,
      nzComponentParams: {
        title: '设置角色',
        data: item
      },
      nzFooter: null,
      nzWidth: 540,
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(res => {
      if (res && res.result) {
        this.searchMember();
      }
    });
  }

  deleteMember(id, name, event) {
    event.stopPropagation();
    this.modalService.confirm({
      nzTitle: '警告',
      nzContent: `确定删除${name}吗？`,
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.userService.deleteMember(id).subscribe(res => {
          if (res.code === 10000) {
            this.notification.create('success', 'sucess', res.msg);
            this.store.dispatch(new DeleteMemberSuccess(res));
          }
        });
      },
      nzCancelText: '取消',
    });
  }

  addMember() {
    const modal = this.modalService.create({
      nzTitle: '添加新成员',
      nzContent: AddMemberComponent,
      nzComponentParams: {
        title: '添加新成员'
      },
      nzFooter: null,
      nzWidth: 740,
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(res => {
      if (res && res.result) { }
    });
  }

}
