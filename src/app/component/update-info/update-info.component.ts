import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService, NzModalRef } from 'ng-zorro-antd';
import { ProjectService } from '../../service/project.service';
import { UserService } from '../../service/user.service';
import { Store } from '@ngrx/store';
import { Appstate, UpdateUserInfoSuccess } from '../../store';
import { environment } from '../../../environments/environment';

const API: string = environment.API;

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {

  @Input() title;

  form: FormGroup;

  avatarUrl: string;

  uploadUrl = `${API}/user/uploadImg`;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private projectService: ProjectService,
    private userService: UserService,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      introduction: ['']
    });
  }

  submitForm() {
    const data = Object.assign({}, this.form.value, {
      avatar: this.avatarUrl
    });
    this.userService.updateUserInfo(data).subscribe(res => {
      if (res.code === 200) {
        this.modal.destroy({ result: true });
        this.store.dispatch(new UpdateUserInfoSuccess(res));
        this.notification.create('success', 'sucess', res.msg);
      }
    });
  }

  // uploadUrl(file) {   // 上传文件
  //   const formData = new FormData();
  //   const avatar = file.target.files[0];
  //   formData.append('avatar', avatar);
  //   this.userService.uploadImg(formData).subscribe(res => {
  //     if (res.code === 200) {
  //       this.avatarUrl = res.data;
  //       console.log(this.avatarUrl);
  //     }
  //   });
  // }

  cancel() {
    this.modal.destroy();
  }

  handleChange(event) {
    if (event.type === 'success') {
      this.avatarUrl = event.file.response.data;
    }
  }

}
