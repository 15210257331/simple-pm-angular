import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate, LoadProjectDetail } from '../../store';
import { TaskKanbanComponent } from './task-kanban/task-kanban.component';
import { TaskListComponent } from './task-list/task-list.component';
import { map } from 'rxjs/operators';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { ProjectSettingComponent } from './project-setting/project-setting.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

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
    private activatedRoute: ActivatedRoute,
    private store: Store<Appstate>,
  ) { }

  ngOnInit() {
    console.log(this.selectTab);
    this.activatedRoute.params.subscribe(data => {
      if (data.id) {
        const projectId = data.id;
        this.store.dispatch(new LoadProjectDetail(projectId));
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
    const selectComponent = this.viewList.filter(item => item.value === this.selectTab)[0];
    this.createComponent(selectComponent.component);
  }

  createComponent(component: any) {
    this.commentContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.commentContainer.createComponent(factory);
  }

  projectSetting(id, name) {
    this.selectTab = 99;
    this.createComponent(ProjectSettingComponent);
  }
}
