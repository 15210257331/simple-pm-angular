import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectAddComponent } from './project-add/project-add.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { ShareModule } from '../../share.module';
import { NavComponent } from './nav.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';


@NgModule({
    declarations: [
        NavComponent,
        ProjectAddComponent,
        UpdateInfoComponent,
        NavHeaderComponent,
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
        NavHeaderComponent
    ]
})
export class NavModule { }
