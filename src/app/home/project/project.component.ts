import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate, LoadProjectDetail, LoadProjectList } from '../../store';
import { TaskKanbanComponent } from '../project-detail/task-kanban/task-kanban.component';
import { TaskListComponent } from '../project-detail/task-list/task-list.component';
import { map, filter } from 'rxjs/operators';
import { ProjectOverviewComponent } from '../project-detail/project-overview/project-overview.component';
import { ProjectSettingComponent } from '../project-detail/project-setting/project-setting.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  name = '';

  projectList: any[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private activatedRoute: ActivatedRoute,
    private store: Store<Appstate>,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadProjectList(String(this.name)));
    this.store.pipe(map(data => data.projectState.projectList)).subscribe(res => {
      this.projectList = res || [];
    });
  }

  searchProject() {
    this.store.dispatch(new LoadProjectList(String(this.name)));
  }

  projectDetail(id) {
    this.router.navigate([`/home/project/${id}`]);
  }
}
