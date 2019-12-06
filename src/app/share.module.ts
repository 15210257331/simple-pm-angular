import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { UserOperateComponent } from './component/user-operate/user-operate.component';
import { UpdateInfoComponent } from './component/update-info/update-info.component';
import { TaskOptionComponent } from './component/task-option/task-option.component';
import { TaskKanbanItemComponent } from './component/task-kanban-item/task-kanban-item.component';
import { HeaderComponent } from './component/header/header.component';
import { FormatDatePipe } from './pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxEchartsModule } from 'ngx-echarts';
import { DebounceDirective } from './directive';

@NgModule({
  declarations: [
    UserOperateComponent,
    UpdateInfoComponent,
    TaskOptionComponent,
    TaskKanbanItemComponent,
    HeaderComponent,
    // 管道
    FormatDatePipe,
    // 组件
    DebounceDirective
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
    UserOperateComponent,
    UpdateInfoComponent,
    TaskOptionComponent,
    TaskKanbanItemComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    DragDropModule,
    NgxEchartsModule,
    // 组件
    UserOperateComponent,
    UpdateInfoComponent,
    TaskOptionComponent,
    TaskKanbanItemComponent,
    HeaderComponent,
    // 管道
    FormatDatePipe,
    // 指令
    DebounceDirective
  ]
})
export class ShareModule { }
