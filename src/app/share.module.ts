import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TaskKanbanItemComponent } from './component/task-kanban-item/task-kanban-item.component';
import { HeaderComponent } from './component/header/header.component';
import { FormatDatePipe } from './pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxEchartsModule } from 'ngx-echarts';
import { DebounceDirective } from './directive';

@NgModule({
  declarations: [
    TaskKanbanItemComponent,
    HeaderComponent,
    // 管道
    FormatDatePipe,
    // 组件
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
    TaskKanbanItemComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    DragDropModule,
    NgxEchartsModule,
    // 组件
    TaskKanbanItemComponent,
    HeaderComponent,
    // 管道
    FormatDatePipe,
    // 指令
    DebounceDirective
  ]
})
export class ShareModule { }
