import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate, AddProjectTag } from '../../../store';

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
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
  }

  addTag() {
    const data = Object.assign({}, this.tagModel, {
      projectId: this.projectId
    });
    this.store.dispatch(new AddProjectTag(data));
    this.tagModel = {
      name: '',
      color: '',
    };
  }
}
