import { TaskService } from '../../../service/task.service';
import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../../store';
import { map, filter, debounceTime } from 'rxjs/operators';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, AfterViewInit {

  @Input() taskDetail: any;

  time: any = new Date();

  comments: any[] = [];

  comment = '';

  name = '';

  visible = false;

  visible1 = false;

  projectDetail: any;

  taskDetailModel: any = {};

  @ViewChild('myForm', { static: false }) form;

  constructor(
    private store: Store<Appstate>,
    private modal: NzModalRef,
    private taskService: TaskService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        map(data => data.currentProject)
      )
      .subscribe(res => {
        this.projectDetail = res;
      });
    this.taskDetailModel = this.taskDetail;
    this.getComments(this.taskDetail._id);
  }

  ngAfterViewInit() {
    this.form.control.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(res => {
        console.log(res);
        // this.submit(res);
      });
  }

  getComments(id: string) {
    this.taskService.getTaskComment(id).subscribe(res => {
      if (res.code === 10000) {
        this.comments = res.data || [];
      }
    });
  }

  changePrincipal(item: any) {
    this.taskDetailModel.principal = item;
    this.visible = !this.visible;
    const data = {
      principal: this.taskDetailModel.principal._id,
    };
    // this.submit(data);
  }

  deleteTag(index) {
    this.taskDetailModel.tag.splice(index, 1);
    const data = {
      tag: this.taskDetailModel.tag.map(item => item._id)
    };
    // this.submit(data);
  }

  addTag(item) {
    this.taskDetailModel.tag.push(item);
    this.visible1 = !this.visible1;
    const data = {
      tag: this.taskDetailModel.tag.map(it => it._id)
    };
    // this.submit(data);
  }

  submit(data) {
    this.taskService.updateTask(data).subscribe(res => {
      if (res.code === 10000) {
        this.modal.destroy();
      } else {
        this.notification.create('error', 'sucess', res.msg);
        this.modal.destroy();
      }
    });
  }

  addComment() {
    const data = {
      taskId: this.taskDetail._id,
      content: this.comment
    };
    this.taskService.addTaskComment(data).subscribe(res => {
      if (res.code === 10000) {
        this.getComments(this.taskDetail._id);
        this.comment = '';
      }
    });
  }

  cancel() {

  }
}
