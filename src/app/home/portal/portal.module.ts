import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../share.module';
import { PortalComponent } from './portal.component';
import { PortalRoutingModule } from './portal-routing.module';

@NgModule({
  declarations: [
    PortalComponent,
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
