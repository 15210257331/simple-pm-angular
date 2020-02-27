import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnInit {

  @Input() title;

  constructor() { }

  ngOnInit() {
  }

}
