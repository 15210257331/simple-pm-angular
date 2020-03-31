import { TaskService } from '../../../service/task.service';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate, AddTaskComment, GetTaskComment } from '../../../store';
import { map, filter } from 'rxjs/operators';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  @Input() id: any;

  taskDetail: any = {};

  time: any = new Date();

  comment: '';

  constructor(
    private store: Store<Appstate>,
    private modal: NzModalRef,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetTaskComment(this.id));
    const taskDetail$ = this.store
      .pipe(
        map(data => data.currentProject),
      )
      .subscribe(res => {
        this.taskDetail = res.task.filter(item => item._id === this.id)[0];
        if (this.taskDetail && this.taskDetail.comment.length > 0) {
          this.taskDetail.comment.map(item => {
            item.commentTime = new Date(item.commentTime).toLocaleString();
          });
        }
      });
  }

  timeChange(event) {
    console.log(event);
  }

  submitForm() {

  }

  addComment() {
    const data = {
      taskId: this.taskDetail._id,
      content: this.comment
    };
    this.store.dispatch(new AddTaskComment(data));
    this.comment = '';
  }

  cancel() {
    this.modal.destroy();
  }

}
