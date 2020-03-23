import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { ShareModule } from 'src/app/share.module';
import { MessageRoutingModule } from './message-routing.module';
import { MessageItemComponent } from './message-item/message-item.component';
import { SendBoxComponent } from './send-box/send-box.component';



@NgModule({
  declarations: [MessageComponent, MessageItemComponent, SendBoxComponent,],
  imports: [
    CommonModule,
    ShareModule,
    MessageRoutingModule
  ]
})
export class MessageModule { }
