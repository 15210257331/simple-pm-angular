import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../../store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  memberList: any[] = [];

  constructor(
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    const memberList$ = this.store
      .pipe(
        map(data => data.userState.memberList)
      )
      .subscribe(res => {
        this.memberList = res;
      });
  }


}
