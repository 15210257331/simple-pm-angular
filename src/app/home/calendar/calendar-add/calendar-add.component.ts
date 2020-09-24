import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../service/task.service';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { Appstate, AddTaskSuccess, LoadScheduleSuccess, AddScheduleSuccess } from '../../../store';
import { ScheduleService } from '../../../service/schedule.service';
import { map } from 'rxjs/operators';
import { SocketService } from '../../../service/socket.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-add',
  templateUrl: './calendar-add.component.html',
  styleUrls: ['./calendar-add.component.scss']
})
export class CalendarAddComponent implements OnInit {

  @Input() date;

  form: FormGroup;

  memberList: any[] = [];

  userId;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private socketService: SocketService,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private store: Store<Appstate>,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.store.pipe(map(data => data.userInfo)).subscribe(res => {
      this.userId = res._id;
    });
    this.store.pipe(map(data => data.memberList)).subscribe(res => {
      this.memberList = res || [];
    });
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      content: ['', [Validators.required]],
      startTime: [this.date, [Validators.required]],
      endTime: ['', [Validators.required]],
      participant: [[]]
    });
  }

  submitForm() {
    const data = Object.assign({}, this.form.value, {
      startTime: moment(this.form.value.startTime).format('x'),
      endTime: moment(this.form.value.endTime).format('x')
    });
    this.scheduleService.addSchedule(data).subscribe(res => {
      if (res.code === 10000) {
        this.modal.destroy({ result: true });
        this.store.dispatch(new AddScheduleSuccess(res));
        this.socketService.sendMessage('setRemind', this.userId);
        this.notification.create('success', 'success', res.msg);
      }
    });
  }

  cancel() {
    this.modal.destroy();
  }
}
