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

  constructor(
    private store: Store<Appstate>,
  ) { }

  ngOnInit() {
    this.store.pipe(map(data => data.userState.memberList)).subscribe(res => {
      this.memberList = res || [];
    });
  }

}
