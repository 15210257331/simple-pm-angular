import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'project',
        pathMatch: 'full'
      },
      {
        path: 'message',
        loadChildren: () => import('./home/message/message.module').then(m => m.MessageModule),
        data: { title: '消息' }
      },
      {
        path: 'project',
        loadChildren: () => import('./home/project/project.module').then(m => m.ProjectModule),
        data: { title: '项目' }
      },
      {
        path: 'project/:id',
        loadChildren: () => import('./home/project-detail/project-detail.module').then(m => m.ProjectDetailModule),
        data: { title: '项目详情' }
      },
      {
        path: 'calendar',
        loadChildren: () => import('./home/calendar/calendar.module').then(m => m.CalendarModule),
        data: { title: '日历' }
      },
      {
        path: 'my',
        loadChildren: () => import('./home/my/my.module').then(m => m.MyModule),
        data: { title: '我的' }
      },
      {
        path: 'setting',
        loadChildren: () => import('./home/setting/setting.module').then(m => m.SettingModule),
        data: { title: '配置' }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
