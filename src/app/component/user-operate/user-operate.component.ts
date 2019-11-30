import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { UpdateInfoComponent } from '../update-info/update-info.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Appstate } from '../../store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-operate',
  templateUrl: './user-operate.component.html',
  styleUrls: ['./user-operate.component.scss']
})
export class UserOperateComponent implements OnInit {

  userInfo: any;

  constructor(
    private modalService: NzModalService,
    private router: Router,
    private store: Store<Appstate>,
  ) { }

  ngOnInit() {
    const userInfo$ = this.store
      .pipe(
        map(data => data.userState.userInfo)
      )
      .subscribe(res => {
        this.userInfo = res;
      });
  }

  updateInfo() {
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

  updatePreference() {

  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
