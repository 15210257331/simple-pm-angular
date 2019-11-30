import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/store';
import { NzModalService } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';
import { TaskAddComponent } from '../task-add/task-add.component';
import * as moment from 'moment';

@Component({
  selector: 'app-task-calendar',
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.scss']
})
export class TaskCalendarComponent implements OnInit {

  taskList: any[] = [];

  projectId: string;

  selectedDate: any = new Date();

  constructor(
    private store: Store<Appstate>,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    const task$ = this.store
      .pipe(
        map(data => data.projectState.projectDetail)
      )
      .subscribe(res => {
        const arr = res.task || [];
        this.projectId = res._id;
        this.taskList = arr.map(item => {
          return Object.assign({}, item, {
            endTime: new Date(item.endTime).toLocaleString().split(' ')[0]
          });
        });
      });
  }

  addTask(status: number) {
    const modal = this.modalService.create({
      nzTitle: '添加一个任务',
      nzContent: TaskAddComponent,
      nzComponentParams: {
        status,
        projectId: this.projectId
      },
      nzFooter: null,
      nzWidth: 540,
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(res => {
      if (res && res.result) {

      }
    });
  }

  panelChange(event) {
    console.log(event);
  }

  selectChange(event) {
    console.log(event);
  }
}
