import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../share.module';
import { CalendarComponent } from './calendar.component';
import { CalendarAddComponent } from './calendar-add/calendar-add.component';
import { CalendarRoutingModule } from './calendar-routing.module';




@NgModule({
  declarations: [
    CalendarComponent,
    CalendarAddComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    CalendarRoutingModule
  ],
  entryComponents: [
    CalendarAddComponent
  ]
})
export class CalendarModule { }
