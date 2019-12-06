import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Store } from '@ngrx/store';
import { Appstate, LoadProjectDetail } from '../../store';
import { TaskKanbanComponent } from './task-kanban/task-kanban.component';
import { TaskListComponent } from './task-list/task-list.component';
import { map } from 'rxjs/operators';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projectId: string;

  taskList: any[] = [];

  selectTab = 1;

  projectName$: any;

  componentRef: ComponentRef<any>;

  @ViewChild('viewDetail', { read: ViewContainerRef, static: true }) commentContainer: ViewContainerRef;

  viewList: any[] = [
    {
      title: '看板',
      value: 1,
      component: TaskKanbanComponent
    },
    {
      title: '列表',
      value: 2,
      component: TaskListComponent
    },
    {
      title: '概览',
      value: 4,
      component: ProjectOverviewComponent
    },
  ];

  constructor(
    private resolver: ComponentFactoryResolver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if (data.id) {
        this.projectId = data.id;
        this.store.dispatch(new LoadProjectDetail(this.projectId));
      }
    });
    this.projectName$ = this.store
      .pipe(
        map(data => data.projectState.projectDetail.name)
      );
    this.tabChange(this.selectTab);
  }

  tabChange(value: any) {
    this.selectTab = value;
    const selectComponent = this.viewList.filter(item => {
      return item.value === this.selectTab;
    });
    this.createComponent(selectComponent[0].component);
  }

  createComponent(component: any) {
    this.commentContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.commentContainer.createComponent(factory);
  }


}
