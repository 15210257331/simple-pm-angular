import { SocketService } from './../service/socket.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { Appstate, LoadUserInfo, LoadProjectList, LoadMemberList, LoadScheduleList } from '../store';
import { map } from 'rxjs/operators';
import { ProjectAddComponent } from './nav/project-add/project-add.component';
import { UpdateInfoComponent } from './nav/update-info/update-info.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  visible = false;

  userInfo: any;

  projectName$;

  name = '';

  constructor(
    private store: Store<Appstate>,
    private modalService: NzModalService,
    private router: Router
  ) { }


  ngOnInit() {
    this.store.dispatch(new LoadUserInfo());
    this.store.dispatch(new LoadProjectList(String(this.name)));
    this.store.dispatch(new LoadMemberList());
    this.store.dispatch(new LoadScheduleList());
    this.store
      .pipe(
        map(data => data.userState.userInfo)
      )
      .subscribe(res => {
        this.userInfo = res;
        console.log(this.userInfo);
      });
    this.projectName$ = this.store
      .pipe(
        map(data => data.projectState.projectDetail.name)
      );
  }

  projectAdd() {
    this.visible = !this.visible;
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

  updateInfo() {
    this.visible = !this.visible;
    const modal = this.modalService.create({
      nzTitle: '修改信息',
      nzContent: UpdateInfoComponent,
      nzComponentParams: {
        title: '修改信息'
      },
      nzFooter: null,
      nzWidth: 540,
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(res => {
      if (res && res.result) {
        // this.getProjects();
      }
    });
  }

  goProject() {
    this.router.navigate([`/home/project`]);
  }

  logout() {
    this.visible = !this.visible;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
