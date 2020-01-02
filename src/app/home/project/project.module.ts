import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../share.module';
import { TaskKanbanComponent } from './task-kanban/task-kanban.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectSettingComponent } from './project-setting/project-setting.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@NgModule({
    declarations: [
        ProjectComponent,
        TaskListComponent,
        TaskKanbanComponent,
        TaskAddComponent,
        ProjectOverviewComponent,
        ProjectSettingComponent,
        TaskDetailComponent,
    ],
    imports: [
        CommonModule,
        ShareModule,
        ProjectRoutingModule
    ],
    entryComponents: [
        ProjectComponent,
        TaskListComponent,
        TaskKanbanComponent,
        TaskAddComponent,
        ProjectOverviewComponent,
        ProjectSettingComponent,
        TaskDetailComponent,
    ]
})
export class ProjectModule { }
