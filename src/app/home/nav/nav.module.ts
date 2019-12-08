import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectAddComponent } from './project-add/project-add.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { ShareModule } from '../../share.module';
import { NavComponent } from './nav.component';
import { ProjectUpdateComponent } from './project-update/project-update.component';


@NgModule({
    declarations: [
        NavComponent,
        ProjectAddComponent,
        UpdateInfoComponent,
        ProjectUpdateComponent,
    ],
    imports: [
        CommonModule,
        ShareModule
    ],
    entryComponents: [
        ProjectAddComponent,
        UpdateInfoComponent,
    ],
    exports: [
        ProjectAddComponent,
        UpdateInfoComponent,
        NavComponent,
        ProjectUpdateComponent
    ]
})
export class NavModule { }
