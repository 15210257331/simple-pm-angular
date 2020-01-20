import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../share.module';
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectUpdateComponent } from './project-update/project-update.component';

@NgModule({
    declarations: [
        ProjectComponent,
        ProjectUpdateComponent,
    ],
    imports: [
        CommonModule,
        ShareModule,
        ProjectRoutingModule
    ],
    entryComponents: [

    ]
})
export class ProjectModule { }
