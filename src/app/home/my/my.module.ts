import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyComponent } from './my.component';
import { MyRoutingModule } from './my-routing.module';
import { ShareModule } from 'src/app/share.module';



@NgModule({
  declarations: [MyComponent],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    ShareModule,
    MyRoutingModule
  ]
})
export class MyModule { }
