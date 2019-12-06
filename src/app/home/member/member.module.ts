import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../share.module';
import { MemberComponent } from './member.component';
import { MemberRoutingModule } from './member-routing.module';




@NgModule({
  declarations: [
    MemberComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    MemberRoutingModule
  ],
  entryComponents: [
    MemberComponent
  ]
})
export class MemberModule { }
