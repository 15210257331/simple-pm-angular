import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { httpInterceptorProviders } from './service/interceptor';
import { ProjectService } from './service/project.service';
import { UserService } from './service/user.service';
import { TaskService } from './service/task.service';
import { NavComponent } from './home/nav/nav.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, effects } from './store';
import { ScheduleService } from './service/schedule.service';
import { SocketService } from './service/socket.service';
import { ShareModule } from './share.module';
import { NavModule } from './home/nav/nav.module';
import { TagService } from './service/tag.service';


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    ShareModule,
    NavModule,
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
    TagService,
    { provide: NZ_I18N, useValue: zh_CN },
    ...httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
