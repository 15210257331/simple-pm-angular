import { Component, OnInit, Input } from '@angular/core';
import { Appstate } from '../../../store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrls: ['./project-member.component.scss']
})
export class ProjectMemberComponent implements OnInit {

  @Input() data: any[] = [];

  constructor(
    private store: Store<Appstate>
  ) { }

  ngOnInit() {

  }

}
