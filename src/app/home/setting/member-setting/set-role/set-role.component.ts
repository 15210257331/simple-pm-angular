import { UserService } from './../../../../service/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../../../store';
import { map } from 'rxjs/operators';
import { NzNotificationService, NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-set-role',
  templateUrl: './set-role.component.html',
  styleUrls: ['./set-role.component.scss']
})
export class SetRoleComponent implements OnInit {

  @Input() title: string;

  @Input() data: any;

  roleList: any[] = [];

  allChecked = false;

  indeterminate = true;

  constructor(
    private store: Store<Appstate>,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.store.pipe(map(data => data.roleList)).subscribe(res => {
      const arr = res || [];
      let settedRoleNames = [];
      if (this.data.role.length > 0) {
        settedRoleNames = this.data.role.map(item => item.name);
      }
      this.roleList = arr.map(item => {
        let checked = false;
        if (settedRoleNames.indexOf(item.name) > -1) {
          checked = true;
        }
        return {
          label: item.name,
          value: item._id,
          checked
        };
      });
      this.updateSingleChecked();
    });
  }

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.roleList = this.roleList.map(item => {
        return {
          ...item,
          checked: true
        };
      });
    } else {
      this.roleList = this.roleList.map(item => {
        return {
          ...item,
          checked: false
        };
      });
    }
  }

  updateSingleChecked(): void {
    if (this.roleList.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.roleList.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

  submitForm() {
    const data = {
      memberId: this.data._id,
      roleIds: this.roleList.filter(item => item.checked === true).map(item => item.value)
    };
    this.userService.setMemberRole(data).subscribe(res => {
      if (res.code === 10000) {
        this.modal.destroy({ result: true });
        this.notification.create('success', '修改成功', res.msg);
      }
    });
  }

  cancel() {
    this.modal.destroy();
  }
}
