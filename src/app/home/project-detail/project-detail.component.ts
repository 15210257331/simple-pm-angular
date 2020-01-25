import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { TaskKanbanComponent } from './task-kanban/task-kanban.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Appstate, LoadProjectDetail, LoadMemberList } from '../../store';
import { map } from 'rxjs/operators';
import { NzDrawerService, NzModalService } from 'ng-zorro-antd';
import { ProjectMemberComponent } from './project-member/project-member.component';
import { ProjectTagComponent } from './project-tag/project-tag.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { ProjectFileComponent } from './project-file/project-file.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  selectTab = 1;

  projectDetail: any;

  memberList: any[] = [];

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
    {
      title: '文件',
      value: 5,
      component: ProjectFileComponent
    },
  ];

  constructor(
    private resolver: ComponentFactoryResolver,
    private activatedRoute: ActivatedRoute,
    private store: Store<Appstate>,
    private router: Router,
    private drawerService: NzDrawerService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if (data.id) {
        const projectId = data.id;
        this.store.dispatch(new LoadProjectDetail(projectId));
      }
    });
    this.store
      .pipe(
        map(data => data.projectState.projectDetail)
      ).subscribe(res => {
        this.projectDetail = res;
      });
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

  openMember(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: '项目成员',
      nzContent: ProjectMemberComponent,
      nzMaskClosable: false,
      nzWidth: 300,
      nzContentParams: {
        data: this.projectDetail.member,
        projectId: this.projectDetail._id
      }
    });
    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });
    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === 'string') {

      }
    });
  }

  openTag(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: '项目标签',
      nzContent: ProjectTagComponent,
      nzMaskClosable: false,
      nzWidth: 300,
      nzContentParams: {
        data: this.projectDetail.tag,
        projectId: this.projectDetail._id
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === 'string') {

      }
    });
  }

  addTask(status: number) {
    const modal = this.modalService.create({
      nzTitle: '添加任务',
      nzContent: TaskAddComponent,
      nzComponentParams: {
        status,
        projectId: this.projectDetail._id
      },
      nzFooter: null,
      nzWidth: 540,
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(res => {
      if (res && res.result) {
        // this.getTodoList();
      }
    });
  }
}
