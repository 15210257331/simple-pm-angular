import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate, LoadProjectDetail, LoadProjectList, DeleteProject } from '../../store';
import { TaskKanbanComponent } from '../project-detail/task-kanban/task-kanban.component';
import { TaskListComponent } from '../project-detail/task-list/task-list.component';
import { map, filter } from 'rxjs/operators';
import { ProjectOverviewComponent } from '../project-detail/project-overview/project-overview.component';
import { ProjectSettingComponent } from '../project-detail/project-setting/project-setting.component';
import { NzModalService } from 'ng-zorro-antd';
import { ProjectAddComponent } from '../nav/project-add/project-add.component';

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
    private router: Router,
    private modalService: NzModalService,
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

  projectAdd() {
    const modal = this.modalService.create({
      nzTitle: '新建项目',
      nzContent: ProjectAddComponent,
      nzComponentParams: {
        title: '新建项目'
      },
      nzFooter: null,
      nzWidth: 840,
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(res => {
      if (res && res.result) { }
    });
  }

  deleteProject(id, name) {
    this.modalService.confirm({
      nzTitle: '警告',
      nzContent: `该项目下所有任务都会删除，确定删除${name}吗？`,
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => this.store.dispatch(new DeleteProject(id)),
      nzCancelText: '取消',
    });
  }
}
