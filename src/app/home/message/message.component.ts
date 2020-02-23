import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  name: string;

  memberList: any[] = [];

  userInfo: any;

  messageContent = '';

  selectedMember: any = {
    messages: [],
    memberName: '陈晓飞',
    memberAvatar: ''
  };

  constructor(
    private store: Store<Appstate>,
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
    });
  }

  selectMember(data) {
    this.memberList.map(item => {
      item.selected = false;
    });
    data.selected = true;
    this.selectedMember = {
      messages: [
        {
          avatar: data.avatar,
          content: '你好我是陈晓飞',
          from: data._id,
          to: this.userInfo._id
        },
        {
          avatar: this.userInfo.avatar,
          content: '你好我是张三',
          from: this.userInfo._id,
          to: data._id
        },
        {
          avatar: data.avatar,
          content: '很高兴认识你',
          from: data._id,
          to: this.userInfo._id
        },
        {
          avatar: this.userInfo.avatar,
          content: '有多高兴',
          from: this.userInfo._id,
          to: data._id
        },
      ],
      memberName: data.nickname,
      memberAvatar: data.avatar
    };
  }

}
