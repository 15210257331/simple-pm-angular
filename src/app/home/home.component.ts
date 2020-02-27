import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { Appstate, LoadUserInfo, LoadProjectList, LoadMemberList, LoadScheduleList } from '../store';
import { map } from 'rxjs/operators';
import { ProjectAddComponent } from './project/project-add/project-add.component';
import { UpdateInfoComponent } from './nav/update-info/update-info.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }


  ngOnInit() {

  }
}
