import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ProjectService } from '../../service/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectAddComponent } from './project-add/project-add.component';
import { Store } from '@ngrx/store';
import { Appstate, LoadUserInfo, LoadProjectList, DeleteProject, LoadMemberList, LoadScheduleList } from '../../store';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  params: any[] = [];

  projectList: any[] = [];

  name: string =  '';

  navList: any[] = [
    {
      name: '个人中心',
      icon: 'bank',
      url: 'portal',
      selected: false
    },
    {
      name: '日程',
      icon: 'calendar',
      url: 'calendar',
      selected: false
    },
    {
      name: '成员',
      icon: 'meh',
      url: 'member',
      selected: false
    },
  ];

  constructor(
    private modalService: NzModalService,
    private projectService: ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    this.params = this.router.url.split('/');
    this.store.dispatch(new LoadUserInfo());
    this.store.dispatch(new LoadProjectList(String(this.name)));
    this.store.dispatch(new LoadMemberList());
    this.store.dispatch(new LoadScheduleList());
    const projectList$ = this.store
      .pipe(
        map(data => data.projectState.projectList)
      )
      .subscribe(res => {
        this.projectList = res || [];
        if (this.params.length === 4) {
          this.projectList.map(item => {
            if (item._id === this.params[3]) {
              item.isSelected = true;
            } else {
              item.isSelected = false;
            }
          });
        } else {
          this.navList.map(item => {
            if (item.url === this.params[2]) {
              item.selected = true;
            } else {
              item.selected = false;
            }
          });
        }
      });
  }

  selectProject(data: string) {
    this.router.navigate([`/home/project/${data}`]);
  }

  selectOther(data: string) {
    this.router.navigate([`/home/${data}`]);
  }

  searchProject() {
    this.store.dispatch(new LoadProjectList(String(this.name)));
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

  delete(id, name) {
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
