import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyComponent } from './my.component';
import { MyRoutingModule } from './my-routing.module';
import { ShareModule } from 'src/app/share.module';
import { MyTaskComponent } from './my-task/my-task.component';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { ProjectDetailModule } from '../project-detail/project-detail.module';



@NgModule({
  declarations: [MyComponent, MyTaskComponent, MyScheduleComponent],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    ShareModule,
    MyRoutingModule,
    ProjectDetailModule
  ]
})
export class MyModule { }
