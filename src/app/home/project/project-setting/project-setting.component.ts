import { TagService } from './../../../service/tag.service';
import { Component, OnInit, Input } from '@angular/core';
import { AddProjectSuccess, Appstate, UpdateProjectSuccess, AddProjectTag, UpdateProject } from '../../../store';
import { map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';
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
      title: '成员管理',
      value: 2,
    },
    {
      title: '标签管理',
      value: 3,
    },
  ];

  selectTab = 1;

  projectDetail: any = {};

  projectModel: any = {
    name: '',
    content: ''
  };

  tagModel: any = {
    name: '',
    color: '',
  };

  allMember: any[] = [];

  visible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private projectService: ProjectService,
    private message: NzMessageService,
    private tagService: TagService,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    const memberList$ = this.store
      .pipe(
        map(data => data.userState)
      )
      .subscribe(res => {
        this.allMember = res.memberList;
      });

    const projectDetail$ = this.store
      .pipe(
        map(data => data.projectState)
      )
      .subscribe(res => {
        this.projectDetail = res.projectDetail;
        this.projectModel = {
          name: this.projectDetail.name,
          content: this.projectDetail.content
        };
      });
  }

  updateProject() {
    const data = Object.assign({}, this.projectModel, {
      projectId: this.projectDetail._id,
    });
    this.store.dispatch(new UpdateProject(data));
  }

  addMember(item) {
    if (this.projectDetail.member.indexOf(item._id) > -1) {
      this.message.error('该成员已在项目中！');
      return;
    }
    const member = this.projectDetail.member.map(ite => ite._id);
    member.push(item._id);
    const data = Object.assign({}, {
      projectId: this.projectDetail._id,
      member: Array.from(new Set(member))
    });
    this.store.dispatch(new UpdateProject(data));
  }

  addTag() {
    const data = Object.assign({}, this.tagModel, {
      projectId: this.projectDetail._id
    });
    this.store.dispatch(new AddProjectTag(data));
    this.tagModel = {
      name: '',
      color: '',
    };
  }
}
