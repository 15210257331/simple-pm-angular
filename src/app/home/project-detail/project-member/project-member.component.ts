import { Component, OnInit, Input } from '@angular/core';
import { Appstate, } from '../../../store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrls: ['./project-member.component.scss']
})
export class ProjectMemberComponent implements OnInit {

  @Input() data: any[] = [];

  @Input() projectId;

  name;

  constructor(
    private store: Store<Appstate>
  ) { }

  ngOnInit() {

  }

  addMember(item) {
    // if (this.projectDetail.member.indexOf(item._id) > -1) {
    //   this.message.error('该成员已在项目中！');
    //   return;
    // }
    const member = this.data.map(ite => ite._id);
    member.push(item._id);
    const data = Object.assign({}, {
      projectId: this.projectId,
      member: Array.from(new Set(member))
    });
    // this.store.dispatch(new UpdateProject(data));
  }
}
