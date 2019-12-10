import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-show',
  templateUrl: './avatar-show.component.html',
  styleUrls: ['./avatar-show.component.scss']
})
export class AvatarShowComponent implements OnInit {

  @Input() avatar: string;
  
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
