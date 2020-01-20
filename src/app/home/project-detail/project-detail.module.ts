import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../share.module';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectDetailRoutingModule } from './project-detail-routing.module';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { ProjectSettingComponent } from './project-setting/project-setting.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskKanbanComponent } from './task-kanban/task-kanban.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ProjectMemberComponent } from './project-member/project-member.component';
import { ProjectTagComponent } from './project-tag/project-tag.component';

@NgModule({
    declarations: [
        ProjectDetailComponent,
        ProjectOverviewComponent,
        TaskAddComponent,
        ProjectSettingComponent,
        TaskDetailComponent,
        TaskKanbanComponent,
        TaskListComponent,
        ProjectMemberComponent,
        ProjectTagComponent
    ],
    imports: [
        CommonModule,
        ShareModule,
        ProjectDetailRoutingModule
    ],
    entryComponents: [
        ProjectOverviewComponent,
        TaskAddComponent,
        ProjectSettingComponent,
        TaskDetailComponent,
        TaskKanbanComponent,
        TaskListComponent,
        ProjectMemberComponent,
        ProjectTagComponent
    ]
})
export class ProjectDetailModule { }
