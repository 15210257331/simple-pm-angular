import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../../store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoList: any[] = [];

  constructor(
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    const schedule$ = this.store
      .pipe(
        map(data => data.scheduleState)
      )
      .subscribe(res => {
        this.todoList = res;
        // this.todoList = res.filter(item => {
        //   new Date(item.startTime).getTime() < new Date().getTime();
        // });
      });
  }
}
