import { Component, OnInit, Input } from '@angular/core';
import { AddProjectSuccess, Appstate, UpdateProjectSuccess } from '../../../store';
import { map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService, NzModalRef } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { ProjectService } from '../../../service/project.service';

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.scss']
})
export class ProjectSettingComponent implements OnInit {

  @Input() title;
  projectDetail: any = {};
  projectName = '';
  projectContent = '';
  projectMember: any[] = [];
  memberList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private projectService: ProjectService,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    const memberList$ = this.store
      .pipe(
        map(data => data.userState)
      )
      .subscribe(res => {
        this.memberList = res.memberList;
        const userId = res.userInfo._id;
        this.memberList = this.memberList;
      });

    const projectDetail$ = this.store
      .pipe(
        map(data => data.projectState)
      )
      .subscribe(res => {
        this.projectDetail = res.projectDetail;
        this.projectName = this.projectDetail.name;
        this.projectContent = this.projectDetail.content;
        this.projectMember = this.projectDetail.member.map(item => item._id);
      });
  }
  submitForm() {
    const data = {
      projectId: this.projectDetail._id,
      name: this.projectName,
      content: this.projectContent,
      member: this.projectMember
    };
    this.projectService.updateProject(data).subscribe(res => {
      if (res.code === 200) {
        this.modal.destroy({ result: true });
        this.store.dispatch(new UpdateProjectSuccess(res.data));
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
