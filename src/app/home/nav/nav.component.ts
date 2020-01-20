import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { ProjectService } from '../../service/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectAddComponent } from './project-add/project-add.component';
import { Store } from '@ngrx/store';
import { Appstate, LoadUserInfo, LoadProjectList, DeleteProject, LoadMemberList, LoadScheduleList } from '../../store';
import { map } from 'rxjs/operators';
import { UpdateInfoComponent } from 'src/app/home/nav/update-info/update-info.component';
import { SocketService } from '../../service/socket.service';



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
      name: '项目',
      icon: 'iconfont iconGrid',
      url: 'project',
      selected: false
    },
    {
      name: '日程',
      icon: 'iconfont iconcalendar',
      url: 'calendar',
      selected: false
    },
    {
      name: '消息',
      icon: 'iconfont iconmessage2',
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
    this.store.pipe(map(data => data.userState.userInfo)).subscribe(res => {
      this.userInfo = res;
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

  logout() {
    this.visible = !this.visible;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
