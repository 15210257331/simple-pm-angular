import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../store';
import { map } from 'rxjs/operators';
import { SocketService } from '../../service/socket.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  name: string;

  memberList: any[] = [];

  userInfo: any;

  msg = '';

  selectedUser: any = {
    introduction: '',
    memberName: '陈晓飞',
    memberAvatar: '',
    messages: [],
    _id: ''
  };

  constructor(
    private store: Store<Appstate>,
    private socketService: SocketService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit() {
    this.store.pipe(map(data => data.userState.memberList)).subscribe(res => {
      const arr = res || [];
      this.memberList = arr.map(item => {
        return Object.assign({}, item, {
          selected: false
        });
      });
    });

    this.store.pipe(map(data => data.userState.userInfo)).subscribe(res => {
      this.userInfo = res;
      this.socketService.getMessage(`to${this.userInfo._id}`).subscribe(resp => {
        console.log(resp);
        this.selectedUser.messages.push(resp);
      });
    });
  }

  selectMember(data) {
    this.memberList.map(item => {
      item.selected = false;
    });
    data.selected = true;
    this.selectedUser = {
      introduction: data.introduction,
      memberName: data.nickname,
      memberAvatar: data.avatar,
      messages: [],
      _id: data._id
    };
  }

  sendMessage() {
    const data = {
      from: this.userInfo._id,
      to: this.selectedUser._id,
      msgType: '文本消息',
      msg: this.msg
    };
    this.socketService.sendMessage('private message', data);
    this.selectedUser.messages.push(data);
  }

}
