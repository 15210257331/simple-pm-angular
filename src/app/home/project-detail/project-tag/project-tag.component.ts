import { ProjectService } from './../../../service/project.service';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate, AddProjectTagSuccess } from '../../../store';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-project-tag',
  templateUrl: './project-tag.component.html',
  styleUrls: ['./project-tag.component.scss']
})
export class ProjectTagComponent implements OnInit {

  @Input() data: any[] = [];

  @Input() projectId;

  tagModel: any = {
    name: '',
    color: '',
  };

  constructor(
    private store: Store<Appstate>,
    private message: NzMessageService,
    private projectService: ProjectService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit() {
  }

  addTag() {
    console.log(123);
    if (!this.tagModel.name || !this.tagModel.color) {
      this.message.create('warning', '请填写标签名称');
      return;
    }
    const data = Object.assign({}, this.tagModel, {
      projectId: this.projectId
    });
    this.projectService.addProjectTag(data).subscribe(res => {
      if (res.code === 200) {
        this.store.dispatch(new AddProjectTagSuccess(res));
        this.notification.create('success', 'sucess', res.msg);
      }
    });
    this.tagModel = {
      name: '',
      color: '',
    };
  }

  deleteTag(event) {

  }
}
