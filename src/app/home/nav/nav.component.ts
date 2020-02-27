import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Appstate, LoadUserInfo, LoadMemberList, ResetUser, ResetSchedule, ResetProject } from '../../store';
import { map } from 'rxjs/operators';
import { UpdateInfoComponent } from 'src/app/home/nav/update-info/update-info.component';
import { SocketService } from '../../service/socket.service';
import { AuthorityComponent } from './authority/authority.component';
import { PreferenceComponent } from './preference/preference.component';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activatedRoute: string;

  projectList: any[] = [];

  name = '';

  userInfo: any;

  visible = false;

  navList: any[] = [
    {
      name: '消息',
      icon: 'iconfont iconmessage1',
      url: 'message',
      selected: false
    },
    {
      name: '项目',
      icon: 'iconfont iconGrid',
      url: 'project',
      selected: false
    },
    {
      name: '日历',
      icon: 'iconfont iconcalendar',
      url: 'calendar',
      selected: false
    },
    {
      name: '我的',
      icon: 'iconfont iconusers-alt',
      url: 'my',
      selected: false
    },
  ];

  constructor(
    private modalService: NzModalService,
    private router: Router,
    private store: Store<Appstate>,
    private socketService: SocketService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit() {
    this.activatedRoute = this.router.url.split('/')[2];
    this.navList.map(item => {
      if (item.url === this.activatedRoute) {
        item.selected = true;
      }
    });
    this.messageRemind();
    this.store.dispatch(new LoadUserInfo());
    this.store.dispatch(new LoadMemberList());
    this.store.pipe(map(data => data.userState.userInfo)).subscribe(res => {
      this.userInfo = res;
      this.newUser();
    });
  }

  navigate(data: any) {
    this.navList.map(item => {
      item.selected = false;
    });
    data.selected = true;
    this.router.navigate([`/home/${data.url}`]);
  }

  messageRemind() {
    this.socketService.getMessage('remind').subscribe(res => {
      this.notification.create('info', '日程提醒', res.data, { nzDuration: 0 });
    });
  }

  newUser() {
    this.socketService.sendMessage('new user', this.userInfo._id);
  }

  authoritySet() {
    this.visible = !this.visible;
    const modal = this.modalService.create({
      nzTitle: '权限管理',
      nzContent: AuthorityComponent,
      nzComponentParams: {
        title: '权限管理'
      },
      nzFooter: null,
      nzWidth: 750,
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(res => {
      if (res && res.result) {
        // this.getProjects();
      }
    });
  }

  updateInfo() {
    this.visible = !this.visible;
    const modal = this.modalService.create({
      nzTitle: '修改账号信息',
      nzContent: UpdateInfoComponent,
      nzComponentParams: {
        title: '修改账号信息'
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

  preferenceSet() {
    this.visible = !this.visible;
    const modal = this.modalService.create({
      nzTitle: '偏好设置',
      nzContent: PreferenceComponent,
      nzComponentParams: {
        title: '偏好设置'
      },
      nzFooter: null,
      nzWidth: 650,
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(res => {
      if (res && res.result) {
        // this.getProjects();
      }
    });
  }

  logout() {
    this.visible = !this.visible;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.store.dispatch(new ResetUser(null));
    this.store.dispatch(new ResetSchedule(null));
    this.store.dispatch(new ResetProject(null));
  }
}
