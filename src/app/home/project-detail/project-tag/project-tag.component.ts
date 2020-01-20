import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-tag',
  templateUrl: './project-tag.component.html',
  styleUrls: ['./project-tag.component.scss']
})
export class ProjectTagComponent implements OnInit {

  @Input() data: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
