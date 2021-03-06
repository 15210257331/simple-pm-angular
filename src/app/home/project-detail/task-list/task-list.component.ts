import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate, ChangeTaskStatusCuccess } from '../../../store';
import { map } from 'rxjs/operators';
import { TaskAddComponent } from '../task-add/task-add.component';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { TaskService } from '../../../service/task.service';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  taskList: any[] = [];

  projectId: string;

  constructor(
    private store: Store<Appstate>,
    private taskService: TaskService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    const task$ = this.store
      .pipe(
        map(data => data.currentProject)
      )
      .subscribe(res => {
        this.taskList = res.task || [];
        this.projectId = res._id;
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

  taskDetail(data: any) {
    const modal = this.modalService.create({
      nzTitle: '任务详情',
      nzContent: TaskDetailComponent,
      nzComponentParams: {
        taskDetail: data
      },
      nzFooter: null,
      nzWidth: '75%',
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(res => {
      if (res && res.result) {
        // this.getTodoList();
      }
    });
  }

  // 更改任务状态
  changeStatus(id: any, status: number) {
    const data = {
      _id: id,
      status
    };
    this.taskService.changeTaskStatus(data).subscribe(res => {
      if (res.code === 10000) {
        this.store.dispatch(new ChangeTaskStatusCuccess(data));
      }
    });
  }

}
