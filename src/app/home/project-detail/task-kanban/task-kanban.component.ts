import { Component, OnInit, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { Appstate, ChangeTaskStatusCuccess} from '../../../store';
import { map, finalize } from 'rxjs/operators';
import { TaskAddComponent } from '../task-add/task-add.component';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { TaskService } from '../../../service/task.service';

@Component({
  selector: 'app-task-kanban',
  templateUrl: './task-kanban.component.html',
  styleUrls: ['./task-kanban.component.scss']
})
export class TaskKanbanComponent implements OnInit {

  projectId = '';

  taskList: any[] = [];

  userInfo: any;

  taskSort = [
    {
      name: '未开始',
      status: 1,
      color: '#2db7f5',
      taskList: [],
    },
    {
      name: '进行中',
      status: 2,
      color: '#22d7bb',
      taskList: [],
    },
    {
      name: '已完成',
      status: 3,
      color: '#87d068',
      taskList: [],
    },
    {
      name: '已作废',
      status: 4,
      color: '#f50',
      taskList: [],
    },
  ];

  taskView = [
    {
      name: '全部任务',
      code: 1,
    },
    {
      name: '我负责的任务',
      code: 2,
    },
  ];

  selectViewName = '';

  constructor(
    private modalService: NzModalService,
    private store: Store<Appstate>,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.selectViewName = this.taskView[0].name;
    this.store
      .pipe(
        map(data => data.currentProject),
      )
      .subscribe(res => {
        this.projectId = res._id;
        this.taskList = res.task || [];
        this.taskSort.map(item => {
          item.taskList = this.taskList.filter(task => task.status === item.status);
        });
      });

    this.store.pipe(map(data => data.userInfo)).subscribe(res => {
      this.userInfo = res;
    });
  }

  selectView(data) {
    this.selectViewName = data.name;
    if (data.code === 2) {
      this.taskSort.map(item => {
        item.taskList = this.taskList.filter(task => task.status === item.status && task.principal._id === this.userInfo._id);
      });
    } else {
      this.taskSort.map(item => {
        item.taskList = this.taskList.filter(task => task.status === item.status);
      });
    }
  }

  addTask(status: number) {
    const modal = this.modalService.create({
      nzTitle: '添加任务',
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
        // this.getTodoList();
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
      nzBodyStyle: {
        padding: 0,
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
  drop(event: CdkDragDrop<string[]>, status: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const data = {
        _id: event.container.data[event.currentIndex]['_id'],
        status
      };
      this.taskService.changeTaskStatus(data).subscribe(res => {
        if (res.code === 10000) {
          this.store.dispatch(new ChangeTaskStatusCuccess(data));
        }
      });
    }
  }
}
