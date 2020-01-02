import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../../store';
import { map } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { UpdateInfoComponent } from '../update-info/update-info.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {

  userInfo: any;

  visible = false;

  constructor(
    private store: Store<Appstate>,
    private modalService: NzModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        map(data => data.userState.userInfo)
      )
      .subscribe(res => {
        this.userInfo = res;
      });
  }

  projectAdd() {
    this.visible = !this.visible;
    const modal = this.modalService.create({
      nzTitle: '新建项目',
      nzContent: ProjectAddComponent,
      nzComponentParams: {
        title: '新建项目'
      },
      nzFooter: null,
      nzWidth: 840,
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(res => {
      if (res && res.result) { }
    });
  }

  updateInfo() {
    this.visible = !this.visible;
    const modal = this.modalService.create({
      nzTitle: '修改信息',
      nzContent: UpdateInfoComponent,
      nzComponentParams: {
        title: '修改信息'
      },
      nzFooter: null,
      nzWidth: 540,
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(res => {
      if (res && res.result) {
        // this.getProjects();
      }
    });
  }

  logout() {
    this.visible = !this.visible;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
