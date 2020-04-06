import { UtilsService } from './../../service/utils.service';
import { UserService } from './../../service/user.service';
import { MessageService } from './../../service/message.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../store';
import { map, last, first, skipWhile } from 'rxjs/operators';
import { SocketService } from '../../service/socket.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { SelectedMemberData, LocalMessageData } from './message.interface';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewChecked {

  selectedValue = null;

  memberList: any[] = [];

  userInfo: any;

  selectedMember: SelectedMemberData = {
    message: []
  };

  localMessages: Array<LocalMessageData> = [];

  @ViewChild('contentContainer', { static: false }) contentContainer: ElementRef;

  constructor(
    private store: Store<Appstate>,
    private socketService: SocketService,
    private notification: NzNotificationService,
    private messageService: MessageService,
    private userService: UserService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    forkJoin(
      this.userService.getUserInfo(),
      this.userService.getMemberList('')
    ).subscribe(res => {
      this.userInfo = res[0].data;
      this.memberList = res[1].data.filter(item => item._id !== this.userInfo._id);
      this.localMessages = this.utilsService.getLocalData('localMessages' + this.userInfo._id);
      this.getPrivateMessage(this.userInfo._id);
    });
  }

  // 选中一个好友
  selectMember(event) {
    if (!event) {
      return;
    }
    const ids = this.localMessages.map(item => {
      item.selected = false;
      if (item._id === event._id) {
        item.selected = true;
        item.count = 0;
      }
      return item._id;
    });
    this.messageService.getMessages(event._id).subscribe(res => {
      if (res.code === 200) {
        this.selectedMember = Object.assign({}, event, {
          message: res.data || [],
        });
        if (ids.indexOf(event._id) < 0) {
          const localMessage = Object.assign({}, event, {
            selected: true,
            count: 0,
            latestMessageDate: res.data.length > 0 ? moment(res.data[res.data.length - 1].msgDate).format('YYYY-MM-DD') : '',
            latestMessage: res.data.length > 0 ? res.data[res.data.length - 1].msg : '',
          });
          this.localMessages.push(localMessage);
          this.utilsService.setLocalData('localMessages' + this.userInfo._id, this.localMessages);
        }
      }
    });
  }

  // 接收好友发来的消息
  getPrivateMessage(id) {
    this.socketService.getMessage(`to${id}`).subscribe(res => {
      console.log(res);
      const ids = this.localMessages.map(item => item._id);
      if (ids.indexOf(res.from) > -1) {
        const data = this.localMessages.filter(item => item._id === res.from)[0];
        data.latestMessageDate = moment(res.msgDate).format('YYYY-MM-DD');
        data.latestMessage = res.msg;
        if (this.selectedMember._id === res.from) {
          this.selectedMember.message.push(res);
          data.count = 0;
        } else {
          data.count += 1;
        }
      } else {
        this.memberList.map(item => {
          if (item._id === res.from) {
            const localMessage = Object.assign({}, item, {
              selected: false,
              count: 1,
              date: new Date().getTime(),
              latestMessage: res.msg
            });
            this.localMessages.push(localMessage);
          }
        });
      }
      this.utilsService.setLocalData('localMessages' + this.userInfo._id, this.localMessages);
    });
  }

  // 给好友发送消息
  sendMessage(event) {
    const data = {
      from: this.userInfo._id,
      fromAvatar: this.userInfo.avatar,
      to: this.selectedMember._id,
      toAvatar: this.selectedMember.avatar,
      msgType: 1,
      msg: event
    };
    this.socketService.sendMessage('private message', data);
    this.selectedMember.message.push(data);
    this.localMessages.map(item => {
      if (item._id === data.to) {
        item.latestMessage = data.msg;
      }
    });
    this.utilsService.setLocalData('localMessages' + this.userInfo._id, this.localMessages);
  }

  ngAfterViewChecked() {
    this.contentContainer.nativeElement.scrollTop = this.contentContainer.nativeElement.scrollHeight;
  }
}
