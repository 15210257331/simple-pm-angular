import { Component, OnInit, Input } from '@angular/core';
import { AddProjectSuccess, Appstate, UpdateProjectSuccess } from '../../../store';
import { map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { ProjectService } from '../../../service/project.service';

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.scss']
})
export class ProjectSettingComponent implements OnInit {


  data: any[] = [
    {
      title: '基本设置',
      value: 1,
    },
    {
      title: '成员设置',
      value: 2,
    },
    {
      title: '标签管理',
      value: 3,
    },
  ];

  selectTab = 1;

  tags: any[] = [];

  projectDetail: any = {};

  projectName = '';

  projectContent = '';

  projectMember: any[] = [];

  memberList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
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

  changeTab(value) {
    this.selectTab = value;
  }

  submitForm() {

  }

  cancel() {

  }

}
