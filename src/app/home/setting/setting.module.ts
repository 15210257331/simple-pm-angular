import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { SettingRoutingModule } from './setting-routing.module';
import { ShareModule } from 'src/app/share.module';
import { MemberSettingComponent } from './member-setting/member-setting.component';
import { RoleSettingComponent } from './role-setting/role-setting.component';
import { RoleAddComponent } from './role-setting/role-add/role-add.component';
import { SetAuthorityComponent } from './role-setting/set-authority/set-authority.component';
import { SetRoleComponent } from './member-setting/set-role/set-role.component';
import { AddMemberComponent } from './member-setting/add-member/add-member.component';



@NgModule({
  declarations: [
    SettingComponent,
    MemberSettingComponent,
    RoleSettingComponent,
    RoleAddComponent,
    SetAuthorityComponent,
    SetRoleComponent,
    AddMemberComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ShareModule
  ],
  entryComponents: [
    MemberSettingComponent,
    RoleSettingComponent,
    RoleAddComponent,
    SetAuthorityComponent,
    SetRoleComponent,
    AddMemberComponent
  ]
})
export class SettingModule { }
