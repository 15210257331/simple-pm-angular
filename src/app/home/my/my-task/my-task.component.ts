import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskService } from '../../../service/task.service';
import { NzModalService } from 'ng-zorro-antd';
import { Appstate } from '../../../store';
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

  taskDetail(data: any) {
    // 会出错 因为无法确定当前项目是哪个
    const modal = this.modalService.create({
      nzTitle: '任务详情',
      nzContent: TaskDetailComponent,
      nzComponentParams: {
        taskDetail: data
      },
      nzBodyStyle: {
        padding: 0,
      },
      nzFooter: null,
      nzWidth: '60%',
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

  }
}
