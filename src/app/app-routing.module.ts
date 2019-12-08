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
        redirectTo: 'portal',
        pathMatch: 'full'
      },
      {
        path: 'portal',
        loadChildren: () => import('./home/portal/portal.module').then(m => m.PortalModule),
        pathMatch: 'full',
        data: { title: '门户' }
      },
      {
        path: 'project/:id',
        loadChildren: () => import('./home/project/project.module').then(m => m.ProjectModule),
        pathMatch: 'full',
        data: { title: '项目' }
      },
      {
        path: 'calendar',
        loadChildren: () => import('./home/calendar/calendar.module').then(m => m.CalendarModule),
        pathMatch: 'full',
        data: { title: '日历' }
      },
      {
        path: 'member',
        loadChildren: () => import('./home/member/member.module').then(m => m.MemberModule),
        pathMatch: 'full',
        data: { title: '成员' }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
