import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../store';
import { map } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  userInfo: any;

  messageList: any = [];

  constructor(
    private store: Store<Appstate>,
    private userService: UserService,
    private modalService: NzModalService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        map(data => data.userState)
      )
      .subscribe(res => {
        this.userInfo = res.userInfo;
      });
  }
}
