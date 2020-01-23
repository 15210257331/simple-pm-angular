import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrashComponent } from './trash.component';
import { ShareModule } from '../../share.module';
import { TrashRoutingModule } from './trash-routing.module';



@NgModule({
  declarations: [TrashComponent],
  imports: [
    CommonModule,
    ShareModule,
    TrashRoutingModule
  ]
})
export class TrashModule { }
