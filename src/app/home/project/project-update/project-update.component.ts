import { Component, OnInit, Input } from '@angular/core';
import { Appstate, UpdateProject } from '../../../store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.scss']
})
export class ProjectUpdateComponent implements OnInit {

  @Input() data: any;

  model: any;

  constructor(
    private store: Store<Appstate>
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
    };
    this.store.dispatch(new UpdateProject(data));
  }
}
