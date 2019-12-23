import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';


export type avatarType = 'simple' | 'defualt';
@Component({
  selector: 'app-avatar-show',
  templateUrl: './avatar-show.component.html',
  styleUrls: ['./avatar-show.component.scss']
})
export class AvatarShowComponent implements OnInit {

  @Input() avatar: string;

  @Input() name: string;

  @Input() role = '负责人';

  @Input() type: avatarType = 'defualt';

  constructor() { }

  ngOnInit() {
  }
}
