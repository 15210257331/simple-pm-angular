import { SocketService } from './../service/socket.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { Appstate } from '../store';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private socketService: SocketService,
    private notification: NzNotificationService,
    private store: Store<Appstate>,
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        map(data => data.userState.userInfo)
      )
      .subscribe(res => {
        if (res._id) {
          this.socketService.sendMessage('setRemind', res._id);
        }
      });
    this.socketService.getMessage('remind').subscribe(res => {
      this.notification.create('success', '日程提醒', res.data, { nzDuration: 0 });
    });
  }
}
