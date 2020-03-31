import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate, LoadProjectList, DeleteProject } from '../../store';
import { map, filter } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectUpdateComponent } from './project-update/project-update.component';

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
    this.store.pipe(map(data => data.projectList)).subscribe(res => {
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
      nzWidth: 540,
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(res => {
      if (res && res.result) { }
    });
  }

  updateProject(data, event) {
    event.stopPropagation();
    const modal = this.modalService.create({
      nzTitle: '项目设置',
      nzContent: ProjectUpdateComponent,
      nzComponentParams: {
        data
      },
      nzFooter: null,
      nzWidth: 600,
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(res => {
      if (res && res.result) { }
    });
  }

  deleteProject(id, name, event) {
    event.stopPropagation();
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
