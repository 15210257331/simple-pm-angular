import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService, NzModalRef } from 'ng-zorro-antd';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  @Input() title: string;

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      nickname: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      introduction: [null, [Validators.required]],
    });
  }

  submitForm() {
    const data = Object.assign({}, this.validateForm.value, {});
    this.userService.register(data).subscribe(res => {
      if (res.code === 10000) {
        this.modal.destroy({ result: true });
        this.notification.create('success', 'sucess', res.msg);
      }
    });
  }

  cancel() {
    this.modal.destroy();
  }

}
