import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectAddComponent } from '../project/project-add/project-add.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { ShareModule } from '../../share.module';
import { NavComponent } from './nav.component';
import { AuthorityComponent } from './authority/authority.component';
import { PreferenceComponent } from './preference/preference.component';


@NgModule({
    declarations: [
        NavComponent,
        ProjectAddComponent,
        UpdateInfoComponent,
        AuthorityComponent,
        PreferenceComponent,
    ],
    imports: [
        CommonModule,
        ShareModule
    ],
    entryComponents: [
        ProjectAddComponent,
        UpdateInfoComponent,
        AuthorityComponent,
        PreferenceComponent,
    ],
    exports: [
        ProjectAddComponent,
        UpdateInfoComponent,
        AuthorityComponent,
        PreferenceComponent,
        NavComponent,
    ]
})
export class NavModule { }
