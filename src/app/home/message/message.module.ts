import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { ShareModule } from 'src/app/share.module';
import { MessageRoutingModule } from './message-routing.module';



@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    ShareModule,
    MessageRoutingModule
  ]
})
export class MessageModule { }
