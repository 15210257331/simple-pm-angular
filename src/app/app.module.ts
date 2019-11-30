import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { NgxEchartsModule } from 'ngx-echarts';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { httpInterceptorProviders } from './service/interceptor';
import { FormatDatePipe } from './pipe';
import { PortalComponent } from './home/portal/portal.component';
import { ProjectAddComponent } from './home/nav/project-add/project-add.component';
import { ProjectService } from './service/project.service';
import { UserService } from './service/user.service';
import { TaskService } from './service/task.service';
import { NavComponent } from './home/nav/nav.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { reducers, effects } from './store';
import { TaskCalendarComponent } from './home/project-view/task-calendar/task-calendar.component';
import { TaskKanbanComponent } from './home/project-view/task-kanban/task-kanban.component';
import { TaskListComponent } from './home/project-view/task-list/task-list.component';
import { MemberComponent } from './home/member/member.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TaskOptionComponent } from './component/task-option/task-option.component';
import { CalendarComponent } from './home/calendar/calendar.component';
import { TaskKanbanItemComponent } from './component/task-kanban-item/task-kanban-item.component';
import { HeaderComponent } from './component/header/header.component';
import { UpdateInfoComponent } from './component/update-info/update-info.component';
import { ScheduleService } from './service/schedule.service';
import { CalendarAddComponent } from './home/calendar/calendar-add/calendar-add.component';
import { SocketService } from './service/socket.service';
import { UserOperateComponent } from './component/user-operate/user-operate.component';
import { ProjectViewComponent } from './home/project-view/project-view.component';
import { TaskAddComponent } from './home/project-view/task-add/task-add.component';
import { TaskDetailComponent } from './home/project-view/task-detail/task-detail.component';
import { ProjectOverviewComponent } from './home/project-view/project-overview/project-overview.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FormatDatePipe,
    PortalComponent,
    TaskKanbanItemComponent,
    ProjectAddComponent,
    NavComponent,
    TaskAddComponent,
    TaskCalendarComponent,
    TaskKanbanComponent,
    TaskListComponent,
    HeaderComponent,
    UpdateInfoComponent,
    MemberComponent,
    TaskDetailComponent,
    TaskOptionComponent,
    CalendarComponent,
    CalendarAddComponent,
    UserOperateComponent,
    ProjectViewComponent,
    ProjectOverviewComponent,
  ],
  entryComponents: [
    TaskAddComponent,
    TaskCalendarComponent,
    TaskKanbanComponent,
    TaskListComponent,
    ProjectAddComponent,
    UpdateInfoComponent,
    TaskDetailComponent,
    CalendarAddComponent,
    UserOperateComponent,
    ProjectOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    NgxEchartsModule,
    BrowserAnimationsModule,
    DragDropModule,
    // 注册全局的reducer和effects
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    ProjectService,
    UserService,
    TaskService,
    ScheduleService,
    SocketService,
    { provide: NZ_I18N, useValue: zh_CN },
    ...httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
