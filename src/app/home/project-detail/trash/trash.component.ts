import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskService } from '../../../service/task.service';
import { Appstate } from '../../../store';
import { NzModalService } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  taskList: any[] = [];

  projectId: any;

  constructor(
    private store: Store<Appstate>,
    private taskService: TaskService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    const task$ = this.store
      .pipe(
        map(data => data.currentProject)
      )
      .subscribe(res => {
        this.taskList = res.task || [];
        this.taskList = this.taskList.filter(item => item.status === 5);
        this.projectId = res._id;
      });
  }

}
