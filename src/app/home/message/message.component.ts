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
      if (res.code === 10000) {
        this.chatList = res.data || [];
        this.chatList = this.chatList.map(item => {
          return Object.assign({}, item, {
            selected: false,
          });
        });
      }
    });
  }

  addChat(from: string, to: string) {
    const data = { from, to };
    this.messageService.addChat(data).subscribe(res => {
      if (res.code === 10000) {
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
    const id = data.to._id;
    this.messageService.getMessages(id).subscribe(res => {
      if (res.code === 10000) {
        this.message = res.data || [];
      }
    });
  }

  // 给好友发送消息
  sendMessage(event) {
    const data = {
      from: this.userInfo._id,
      to: this.selectChat.to._id,
      msgType: 1,
      content: event
    };
    this.socketService.sendMessage('private message', data);
    const showData = {
      from: {
        _id: this.userInfo._id,
        avatar: this.userInfo.avatar
      },
      to: {
        _id: this.selectChat.to._id,
        avatar: this.selectChat.to.avatar
      },
      content: data.content
    };
    this.message.push(showData);
  }

  // 接收好友发来的消息
  getPrivateMessage(id) {
    this.socketService.getMessage(`to${id}`).subscribe(res => {
      let index = null;
      this.chatList.map((item, i) => {
        if (item.to === res.from) {
          index = i;
        }
      });
      if (index !== null) {
        this.chatList[index].unreadCount += 1;
        this.chatList[index].lastMessage.content = res.content;
        const data = {
          id: this.chatList[index]._id,
          messageId: res.messageId
        };
        this.messageService.updateChat(data).subscribe(res => {
          if (res.code === 10000) { }
        });
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
