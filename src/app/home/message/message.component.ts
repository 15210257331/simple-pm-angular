import { MessageService } from './../../service/message.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, AfterViewChecked } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../store';
import { map, last, first } from 'rxjs/operators';
import { SocketService } from '../../service/socket.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewChecked {

  name = '';

  memberList: any[] = [];

  friendList: any[] = [];

  userInfo: any;

  msg = '';

  messages: any[] = [];

  selectedMember: any;

  lastMessageList: any[] = [];

  @ViewChild('contentContainer', { static: false }) contentContainer: ElementRef;

  constructor(
    private store: Store<Appstate>,
    private socketService: SocketService,
    private notification: NzNotificationService,
    private messageService: MessageService,
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    // this.lastMessageList = JSON.parse(localStorage.getItem('lastMessage')) || [];
    this.store
      .pipe(
        map(data => data.userState),
      )
      .subscribe(res => {
        this.userInfo = res.userInfo;
        this.memberList = res.memberList;
        if (this.memberList.length > 0) {
          this.memberList = this.memberList.map(item => {
            return Object.assign({}, item, {
              selected: false,
              count: 0,
              date: new Date().getTime(),
              latestMessage: '',
            });
          }).filter(item => item._id !== this.userInfo._id);
          this.selectMember(this.memberList[0]);
          this.getPrivateMessage();
        }
        this.friendList = this.memberList;
      });
  }

  search() {
    this.friendList = this.memberList.filter(item => item.nickname.includes(this.name));
  }

  ngAfterViewChecked() {
    this.contentContainer.nativeElement.scrollTop = this.contentContainer.nativeElement.scrollHeight;
  }


  selectMember(data) {
    this.memberList.map(item => {
      item.selected = false;
    });
    data.selected = true;
    data.count = 0;
    this.selectedMember = data;
    this.loadSelectedMemberMessages(data._id);
  }

  // 加载选中好友的消息
  loadSelectedMemberMessages(id) {
    this.messageService.getMessages(id).subscribe(res => {
      if (res.code === 200) {
        this.messages = res.data || [];
        if (this.messages.length > 0) {
          this.memberList.map(item => {
            if (item._id === this.selectedMember._id) {
              item.latestMessage = this.messages[this.messages.length - 1].msg;
            }
          });
        }
        // this.lastMessageList.map((item, index) => {
        //   if (item.from === this.messages[this.messages.length - 1].from) {
        //     lastMessageList[index] = this.
        //   }
        // });
        // this.lastMessageList.push(this.messages[this.messages.length - 1]);
        // localStorage.setItem('lastMessage', JSON.stringify(this.lastMessageList));
      }
    });
  }

  // 接收好友发来的消息
  getPrivateMessage() {
    this.socketService.getMessage(`to${this.userInfo._id}`).subscribe(resp => {
      this.memberList.map(item => {
        if (item._id === resp.from) {
          item.count++;
          item.date = resp.msgDate;
          item.latestMessage = resp.msg;
          this.messages.push(resp);
        }
      });
    });
  }

  // 发送消息
  sendMessage(event) {
    // event.preventDefault();
    const data = {
      from: this.userInfo._id,
      fromAvatar: this.userInfo.avatar,
      to: this.selectedMember._id,
      toAvatar: this.selectedMember.avatar,
      msgType: 1,
      msg: this.msg
    };
    this.msg = '';
    this.socketService.sendMessage('private message', data);
    this.messages.push(data);
    this.memberList.map(item => {
      if (item._id === data.to) {
        item.latestMessage = data.msg;
      }
    });
  }
}
