import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HeaderComponent } from './component/header/header.component';
import { FormatDatePipe } from './pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxEchartsModule } from 'ngx-echarts';
import { DebounceDirective } from './directive';
import { AvatarShowComponent } from './component/avatar-show/avatar-show.component';
import { ClockComponent } from './component/clock/clock.component';
import { FlipComponent } from './component/clock/flip/flip.component';
import { ColorListComponent } from './component/color-list/color-list.component';
import { TaskCardComponent } from './component/task-card/task-card.component';
import { ScheduleCardComponent } from './component/schedule-card/schedule-card.component';
import { ProjectCardComponent } from './component/project-card/project-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AvatarShowComponent,
    ClockComponent,
    FlipComponent,
    ColorListComponent,
    TaskCardComponent,
    ScheduleCardComponent,
    ProjectCardComponent,
    // 管道
    FormatDatePipe,
    // 指令
    DebounceDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    DragDropModule,
    NgxEchartsModule,
  ],
  providers: [],
  entryComponents: [
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    DragDropModule,
    NgxEchartsModule,
    // 组件
    HeaderComponent,
    AvatarShowComponent,
    ClockComponent,
    FlipComponent,
    ColorListComponent,
    TaskCardComponent,
    ScheduleCardComponent,
    ProjectCardComponent,
    // 管道
    FormatDatePipe,
    // 指令
    DebounceDirective
  ]
})
export class ShareModule { }
