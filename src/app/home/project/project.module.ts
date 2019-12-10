import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../share.module';
import { TaskKanbanComponent } from './task-kanban/task-kanban.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
    declarations: [
        ProjectComponent,
        TaskListComponent,
        TaskKanbanComponent,
        TaskDetailComponent,
        TaskAddComponent,
        ProjectOverviewComponent,
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
        TaskDetailComponent,
        TaskAddComponent,
        ProjectOverviewComponent
    ]
})
export class ProjectModule { }
