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
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    HeaderComponent,
    AvatarShowComponent,
    ClockComponent,
    FlipComponent,
    ColorListComponent,
    TaskCardComponent,
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
    NgSelectModule
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
    NgSelectModule,
    // 组件
    HeaderComponent,
    AvatarShowComponent,
    ClockComponent,
    FlipComponent,
    ColorListComponent,
    TaskCardComponent,
    // 管道
    FormatDatePipe,
    // 指令
    DebounceDirective
  ]
})
export class ShareModule { }
