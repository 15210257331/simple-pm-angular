import { ProjectService } from './../../../service/project.service';
import { Component, OnInit, Input } from '@angular/core';
import { Appstate, AddProjectMemberSuccess, } from '../../../store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrls: ['./project-member.component.scss']
})
export class ProjectMemberComponent implements OnInit {

  @Input() data: any[] = [];

  @Input() projectId;

  projectMembers: any[] = [];

  allMembers: any[] = [];

  membersShow: any[] = [];

  name1: string;

  name2: string;

  visible = false;

  constructor(
    private store: Store<Appstate>,
    private projectService: ProjectService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit() {
    this.projectMembers = this.data || [];
    this.store
      .pipe(
        map(data => data.memberList)
      ).subscribe(res => {
        this.allMembers = res || [];
        this.membersShow = this.allMembers;
      });
  }

  filterProjectMember() {
    this.projectMembers = this.data.filter(item => item.nickname.includes(this.name1));
  }

  filterMembersShow() {
    this.membersShow = this.allMembers.filter(item => item.nickname.includes(this.name2));
  }

  addMember(item) {
    const data = {
      projectId: this.projectId,
      memberId: item._id
    };
    this.projectService.addProjectMmeber(data).subscribe(res => {
      if (res.code === 10000) {
        this.visible = false;
        this.store.dispatch(new AddProjectMemberSuccess(res));
        this.notification.create('success', 'sucess', res.msg);
      }
    });
  }
}
