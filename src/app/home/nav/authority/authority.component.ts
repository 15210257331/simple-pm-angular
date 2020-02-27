import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.scss']
})
export class AuthorityComponent implements OnInit {

  @Input() title;

  constructor() { }

  ngOnInit() {
  }

}
