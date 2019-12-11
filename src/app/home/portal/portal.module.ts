import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../share.module';
import { PortalComponent } from './portal.component';
import { PortalRoutingModule } from './portal-routing.module';
import { TodoComponent } from './todo/todo.component';
import { MemberComponent } from './member/member.component';

@NgModule({
  declarations: [
    PortalComponent,
    TodoComponent,
    MemberComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    PortalRoutingModule
  ],
  entryComponents: [
    PortalComponent
  ]
})
export class PortalModule { }
