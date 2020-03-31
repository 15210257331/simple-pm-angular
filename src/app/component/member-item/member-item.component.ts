import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss']
})
export class MemberItemComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
