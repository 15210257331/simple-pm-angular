import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { TaskService } from '../../service/task.service';
import { Store } from '@ngrx/store';
import { Appstate, ChangeTaskStatus, DeleteTask } from '../../store';

@Component({
  selector: 'app-task-kanban-item',
  templateUrl: './task-kanban-item.component.html',
  styleUrls: ['./task-kanban-item.component.scss']
})
export class TaskKanbanItemComponent implements OnInit {

  @Input() item: any;

  currentTime: any;

  constructor(
    private taskService: TaskService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    this.currentTime = new Date().getTime();
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
