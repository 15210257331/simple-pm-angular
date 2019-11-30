import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './home/portal/portal.component';
import { MemberComponent } from './home/member/member.component';
import { CalendarComponent } from './home/calendar/calendar.component';
import { ProjectViewComponent } from './home/project-view/project-view.component';


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
        path: 'project/:id',
        component: ProjectViewComponent,
        pathMatch: 'full',
        data: {
          title: '项目'
        }
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        pathMatch: 'full',
        data: {
          title: '日历'
        }
      },
      {
        path: 'member',
        component: MemberComponent,
        pathMatch: 'full',
        data: {
          title: '成员'
        }
      },
      {
        path: 'portal',
        component: PortalComponent,
        pathMatch: 'full',
        data: {
          title: '门户'
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
