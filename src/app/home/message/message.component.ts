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

  chatList: any[] = [];

  selectChat: any;

  userInfo: any;

  message: any[] = [];

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
    this.getChatList();
    forkJoin(
      this.userService.getUserInfo(),
      this.userService.getMemberList(''),
    ).subscribe(res => {
      this.userInfo = res[0].data;
      this.memberList = res[1].data.filter(item => item._id !== this.userInfo._id);
      this.getPrivateMessage(this.userInfo._id);
    });
  }

  getChatList() {
    this.messageService.getChatList().subscribe(res => {
      if (res.code === 200) {
        this.chatList = res.data || [];
        this.chatList = this.chatList.map(item => {
          return Object.assign({}, item, {
            selected: false,
          });
        });
      }
    });
  }

  addChat(owner: string, other: string) {
    const data = { owner, other };
    this.messageService.addChat(data).subscribe(res => {
      if (res.code === 200) {
        this.getChatList();
      }
    });
  }

  selectOneChat(data) {
    this.selectChat = data;
    this.chatList.map(item => {
      item.selected = false;
    });
    data.selected = true;
    const id = data.other._id;
    this.messageService.getMessages(id).subscribe(res => {
      if (res.code === 200) {
        this.message = res.data || [];
      }
    });
  }

  updateChat(data: any) {

  }

  // 给好友发送消息
  sendMessage(event) {
    const data = {
      from: this.userInfo._id,
      to: this.selectChat.other._id,
      msgType: 1,
      content: event
    };
    this.socketService.sendMessage('private message', data);
    const showData = Object.assign({}, data, {
      fromAvatar: this.userInfo.avatar,
      toAvatar: this.selectChat.other.avatar
    });
    this.message.push(showData);
  }

  // 接收好友发来的消息
  getPrivateMessage(id) {
    this.socketService.getMessage(`to${id}`).subscribe(res => {
      console.log(res);
      const ids = this.chatList.map(item => item.other._id);
      if (ids.indexOf(res.from) > -1) {
        this.chatList[ids.indexOf(res.from)].unreadCount += 1;
        this.chatList[ids.indexOf(res.from)].lastMessage.content = res.content;
      } else {
        this.memberList.map(item => {
          if (item._id === res.from) {
            this.addChat(this.userInfo._id, res.from);
          }
        });
      }
    });
  }

  ngAfterViewChecked() {
    this.contentContainer.nativeElement.scrollTop = this.contentContainer.nativeElement.scrollHeight;
  }
}
