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

  constructor(
    private store: Store<Appstate>,
    private modalService: NzModalService,
    private router: Router
  ) { }


  ngOnInit() {
    // this.store.dispatch(new LoadUserInfo());
    // this.store.dispatch(new LoadProjectList(String(this.name)));
    // this.store.dispatch(new LoadMemberList());
    // this.store.dispatch(new LoadScheduleList());
    // this.store
    //   .pipe(
    //     map(data => data.userState.userInfo)
    //   )
    //   .subscribe(res => {
    //     this.userInfo = res;
    //     console.log(this.userInfo);
    //   });
    // this.projectName$ = this.store
    //   .pipe(
    //     map(data => data.projectState.projectDetail.name)
    //   );
  }
}
