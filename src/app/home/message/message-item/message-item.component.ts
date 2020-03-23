import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../../store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {

  @Input() data: any;

  userInfo: any;

  constructor(
    private store: Store<Appstate>,
  ) { }

  ngOnInit() {
    this.store.pipe(map(data => data.userState)).subscribe(res => {
      this.userInfo = res.userInfo;
    });
  }

}
