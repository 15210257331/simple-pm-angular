import { Component, OnInit, Input } from '@angular/core';
import { Appstate, UpdateProject } from '../../../store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { NzModalRef } from 'ng-zorro-antd';
import { environment } from '../../../../environments/environment';

const API: string = environment.API;

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.scss']
})
export class ProjectUpdateComponent implements OnInit {

  @Input() data: any;

  uploadUrl = `${API}/user/uploadImg`;

  model: any;

  constructor(
    private store: Store<Appstate>,
    private modal: NzModalRef,
  ) { }

  ngOnInit() {
    this.model = this.data;
    console.log(this.model);
  }

  updateProject() {
    const data = {
      name: this.model.name,
      content: this.model.content,
      projectId: this.model.content._id,
      cover: this.model.cover
    };
    this.store.dispatch(new UpdateProject(data));
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
