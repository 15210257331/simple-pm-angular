import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../share.module';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectDetailRoutingModule } from './project-detail-routing.module';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskKanbanComponent } from './task-kanban/task-kanban.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ProjectMemberComponent } from './project-member/project-member.component';
import { ProjectTagComponent } from './project-tag/project-tag.component';
import { ProjectFileComponent } from './project-file/project-file.component';

@NgModule({
    declarations: [
        ProjectDetailComponent,
        ProjectOverviewComponent,
        TaskAddComponent,
        TaskDetailComponent,
        TaskKanbanComponent,
        TaskListComponent,
        ProjectMemberComponent,
        ProjectTagComponent,
        ProjectFileComponent,
    ],
    imports: [
        CommonModule,
        ShareModule,
        ProjectDetailRoutingModule
    ],
    entryComponents: [
        ProjectOverviewComponent,
        TaskAddComponent,
        TaskDetailComponent,
        TaskKanbanComponent,
        TaskListComponent,
        ProjectMemberComponent,
        ProjectTagComponent,
        ProjectFileComponent
    ]
})
export class ProjectDetailModule { }
