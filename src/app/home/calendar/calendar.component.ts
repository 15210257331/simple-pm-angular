import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate, DeleteScheduleList } from '../../store';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';
import { ScheduleService } from '../../service/schedule.service';
import { CalendarAddComponent } from './calendar-add/calendar-add.component';
import { SocketService } from '../../service/socket.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  schedulekList: any[] = [];

  selectedDate: any = new Date();

  constructor(
    private store: Store<Appstate>,
    private modalService: NzModalService,
    private scheduleService: ScheduleService,
    private socketService: SocketService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit() {
    const schedule$ = this.store
      .pipe(
        map(data => data.scheduleState)
      )
      .subscribe(res => {
        this.schedulekList = res.map(item => {
          return Object.assign({}, item, {
            startTime: new Date(item.startTime).toLocaleString(),
            endTime: new Date(item.endTime).toLocaleString(),
            showStartTime: new Date(item.startTime).toLocaleDateString(),
          });
        });
      });
  }

  addSchedule(date: any) {
    const modal = this.modalService.create({
      nzTitle: '新建日程',
      nzContent: CalendarAddComponent,
      nzComponentParams: {
        date,
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

  deleteSchedule(id: string) {
    this.store.dispatch(new DeleteScheduleList(id));
  }

  panelChange(event) {
    console.log(event);
  }

  selectChange(event) {
    console.log(event);
  }

}
