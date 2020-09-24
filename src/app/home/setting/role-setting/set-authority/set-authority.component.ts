import { filter } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { UserService } from '../../../../service/user.service';
import { UtilsService } from '../../../../service/utils.service';
import { Store } from '@ngrx/store';
import { Appstate, UpdateRoleSuccess } from '../../../../store';

@Component({
  selector: 'app-set-authority',
  templateUrl: './set-authority.component.html',
  styleUrls: ['./set-authority.component.scss']
})
export class SetAuthorityComponent implements OnInit {

  @Input() title: string;

  @Input() data: any;

  authorityArray: any[] = [];

  constructor(
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private userService: UserService,
    private utilsService: UtilsService,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    this.authorityArray = [
      {
        label: '配置中心',
        value: '配置中心',
        checked: false,
        features: [
          {
            label: '配置角色',
            value: '123',
            checked: false,
          },
          {
            label: '添加成员',
            value: '123',
            checked: false,
          },
          {
            label: '添加角色',
            value: '123',
            checked: false,
          },
          {
            label: '修改角色',
            value: '123',
            checked: false,
          },
          {
            label: '删除角色',
            value: '123',
            checked: false,
          },
        ]
      },
      {
        label: '项目',
        value: '123',
        checked: false,
        indeterminate: false,
        features: [
          {
            label: '删除项目',
            value: '123',
            checked: false,
          },
          {
            label: '删除任务',
            value: '123',
            checked: false,
          },
        ]
      },
      {
        label: '日历',
        value: '123',
        checked: false,
        indeterminate: false,
        features: [
          {
            label: '删除日程',
            value: '123',
            checked: false,
          },
          {
            label: '创建日历',
            value: '123',
            checked: false,
          },
        ]
      }
    ];
    this.authorityArray.map(item => {
      if (this.data.authority.indexOf(item.label) > -1) {
        item.checked = true;
      }
      item.features.map(sonItem => {
        if (this.data.authority.indexOf(sonItem.label) > -1) {
          sonItem.checked = true;
        }
      });
    });
  }

  submitForm() {
    const arr = this.utilsService.treeToList(this.authorityArray, 'features').filter(item => item.checked).map(item => item.label);
    const data = {
      id: this.data._id,
      authority: arr
    };
    this.userService.setAuthority(data).subscribe(res => {
      if (res.code === 10000) {
        this.modal.destroy({ result: true });
        this.store.dispatch(new UpdateRoleSuccess(res));
        this.notification.create('success', '修改成功', res.msg);
      }
    });
  }

  cancel() {
    this.modal.destroy();
  }

}
