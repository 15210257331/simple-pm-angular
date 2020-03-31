import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate, AddProjectTagSuccess } from '../../../store';
import { NzMessageService } from 'ng-zorro-antd';
import { TagService } from '../../../service/tag.service';

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
    private tagService: TagService
  ) { }

  ngOnInit() {
  }

  addTag() {
    if (!this.tagModel.name || this.tagModel.color) {
      this.message.create('warning', '请填写标签名称');
      return;
    }
    const data = Object.assign({}, this.tagModel, {
      projectId: this.projectId
    });
    this.tagService.addTag(data).subscribe(res => {
      if (res.code === 200) {
        this.store.dispatch(new AddProjectTagSuccess(res.data));
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
