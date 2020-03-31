import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService, NzModalRef } from 'ng-zorro-antd';
import { ProjectService } from '../../../service/project.service';
import { Store } from '@ngrx/store';
import { Appstate, AddProjectSuccess } from '../../../store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {

  @Input() title;

  form: FormGroup;

  memberList: any[] = [];

  member: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private projectService: ProjectService,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    this.store.pipe(map(data => data)).subscribe(res => {
      this.memberList = res.memberList;
      const userId = res.userInfo._id;
      this.memberList = this.memberList.filter(item => item._id !== userId);
    });
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      content: ['', [Validators.required]],
      member: [[], [Validators.required]]
    });
  }

  submitForm() {
    const data = Object.assign({}, this.form.value);
    this.projectService.addProject(data).subscribe(res => {
      if (res.code === 200) {
        this.modal.destroy({ result: true });
        this.store.dispatch(new AddProjectSuccess(res));
        this.notification.create('success', 'sucess', res.msg);
      } else {
        this.modal.destroy({ result: false });
        this.notification.create('error', 'error', res.msg);
      }
    });
  }

  cancel() {
    this.modal.destroy();
  }

}
