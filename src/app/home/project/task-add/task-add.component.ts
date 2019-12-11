import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../service/task.service';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { Appstate, AddTaskSuccess } from '../../../store';
import { TagService } from '../../../service/tag.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {

  @Input() status;

  @Input() projectId;

  form: FormGroup;

  visible = false;
  tagName = '';
  tagList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private store: Store<Appstate>,
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.getTagList();
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      content: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      tag: [[], Validators.required]
    });
  }
  getTagList() {
    this.tagService.getTagList().subscribe(res => {
      this.tagList = res.data;
    });
  }
  submitForm() {
    const data = Object.assign({}, this.form.value, {
      status: this.status,
      projectId: this.projectId,
      comment: [],
    });
    this.taskService.addTask(data).subscribe(res => {
      if (res.code === 200) {
        this.modal.destroy({ result: true });
        this.store.dispatch(new AddTaskSuccess(res));
        this.notification.create('success', 'sucess', res.msg);
      }
    });
  }

  // addTag() {
  //   this.visible = false;
  //   const data = {
  //     name: this.tagName,
  //     color: this.randomHexColor()
  //   };
  //   this.taskTag.push(data);
  //   this.tagName = '';
  // }
  // deleteTag(i) {
  //   this.taskTag.splice(i, 1);
  // }
  randomHexColor() {
    let hex = Math.floor(Math.random() * 16777216).toString(16);
    while (hex.length < 6) {
      hex = '0' + hex;
    }
    return '#' + hex;
  }

  cancel() {
    this.modal.destroy();
  }


}
