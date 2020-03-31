import { Component, OnInit, Input } from '@angular/core';
import { Appstate, UpdateProjectSuccess } from '../../../store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { environment } from '../../../../environments/environment';
import { ProjectService } from '../../../service/project.service';

const API: string = environment.API;

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.scss']
})
export class ProjectUpdateComponent implements OnInit {

  @Input() data: any;

  uploadUrl = `${API}/project/uploadImg`;

  model: any;

  constructor(
    private store: Store<Appstate>,
    private modal: NzModalRef,
    private notification: NzNotificationService,
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
    this.model = this.data;
    console.log(this.model);
  }

  updateProject() {
    const data = {
      name: this.model.name,
      content: this.model.content,
      projectId: this.model._id,
      cover: this.model.cover
    };
    this.projectService.updateProject(data).subscribe(res => {
      if (res.code === 200) {
        this.store.dispatch(new UpdateProjectSuccess(data));
        this.modal.destroy({ result: true });
        this.notification.create('success', 'sucess', res.msg);
      }
    });
  }

  handleChange(event) {
    console.log(event);
    if (event.type === 'success') {
      this.model.cover = event.file.response.data;
    }
  }

  cancel() {
    this.modal.destroy();
  }
}
