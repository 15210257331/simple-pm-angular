import { UserService } from '../../../../service/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService, NzModalRef } from 'ng-zorro-antd';
import { ProjectService } from '../../../../service/project.service';
import { Store } from '@ngrx/store';
import { Appstate, AddRoleSuccess, UpdateRoleSuccess } from '../../../../store';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {

  @Input() title: string;

  @Input() data: any;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private userService: UserService,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    if (this.data) {
      this.form = this.fb.group({
        name: [this.data.name, [Validators.required]],
        description: [this.data.description, [Validators.required]],
      });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
      });
    }

  }

  submitForm() {
    if (this.data) {
      const data = Object.assign({}, this.form.value, {
        authority: [],
        valid: true,
        id: this.data._id
      });
      this.userService.updateRole(data).subscribe(res => {
        if (res.code === 200) {
          this.modal.destroy({ result: true });
          this.store.dispatch(new UpdateRoleSuccess(res));
          this.notification.create('success', '修改成功', res.msg);
        } else {
          this.modal.destroy({ result: false });
          this.notification.create('error', 'error', res.msg);
        }
      });
    } else {
      const data = Object.assign({}, this.form.value, {
        authority: [],
        valid: true,
      });
      this.userService.addRole(data).subscribe(res => {
        if (res.code === 200) {
          this.modal.destroy({ result: true });
          this.store.dispatch(new AddRoleSuccess(res));
          this.notification.create('success', '添加成功', res.msg);
        } else {
          this.modal.destroy({ result: false });
          this.notification.create('error', 'error', res.msg);
        }
      });
    }
  }

  cancel() {
    this.modal.destroy();
  }

}
