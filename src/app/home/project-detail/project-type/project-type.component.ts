import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { ProjectService } from '../../../service/project.service';
import { Appstate, AddProjectTypeSuccess } from '../../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-project-type',
  templateUrl: './project-type.component.html',
  styleUrls: ['./project-type.component.scss']
})
export class ProjectTypeComponent implements OnInit {

  @Input() data: any[] = [];

  @Input() projectId: any;

  name: string;

  constructor(
    private store: Store<Appstate>,
    private message: NzMessageService,
    private projectService: ProjectService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit() {
  }

  addType() {
    if (!this.name) {
      this.message.create('warning', '请输入类型名称');
    }
    const data = {
      name: this.name,
      projectId: this.projectId
    };
    this.projectService.addProjectType(data).subscribe(res => {
      if (res.code === 10000) {
        this.store.dispatch(new AddProjectTypeSuccess(res));
        this.notification.create('success', 'sucess', res.msg);
      }
    });
  }

}
