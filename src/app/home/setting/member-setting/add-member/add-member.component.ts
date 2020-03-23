import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
