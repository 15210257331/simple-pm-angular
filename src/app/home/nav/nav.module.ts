import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectAddComponent } from '../project/project-add/project-add.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { ShareModule } from '../../share.module';
import { NavComponent } from './nav.component';


@NgModule({
    declarations: [
        NavComponent,
        ProjectAddComponent,
        UpdateInfoComponent,
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
    ]
})
export class NavModule { }
