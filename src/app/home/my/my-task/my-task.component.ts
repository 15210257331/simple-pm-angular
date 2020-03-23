import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskService } from '../../../service/task.service';
import { NzModalService } from 'ng-zorro-antd';
import { Appstate, ChangeTaskStatus, DeleteTask } from '../../../store';
import { map } from 'rxjs/operators';
import { TaskDetailComponent } from '../../project-detail/task-detail/task-detail.component';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.scss']
})
export class MyTaskComponent implements OnInit {

  @Input() data: any[] = [];

  constructor(
    private store: Store<Appstate>,
    private taskService: TaskService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {

  }

  taskDetail(id: any) {
    const modal = this.modalService.create({
      nzTitle: '任务详情',
      nzContent: TaskDetailComponent,
      nzComponentParams: {
        id
      },
      nzFooter: null,
      nzWidth: 800,
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
    this.store.dispatch(new ChangeTaskStatus(data));
  }

  // 删除
  delete(id: any) {
    this.store.dispatch(new DeleteTask(id));
  }
}
