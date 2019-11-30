import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../service/task.service';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { Appstate, AddTaskSuccess } from '../../../store';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {

  @Input() status;

  @Input() projectId;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      content: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
    });
  }

  submitForm() {
    const data = Object.assign({}, this.form.value, {
      status: this.status,
      projectId: this.projectId,
      comment: [],
      tag: []
    });
    this.taskService.addTask(data).subscribe(res => {
      if (res.code === 200) {
        this.modal.destroy({result: true});
        this.store.dispatch(new AddTaskSuccess(res));
        this.notification.create('success', 'sucess', res.msg);
      }
    });
  }

  cancel() {
    this.modal.destroy();
  }


}
