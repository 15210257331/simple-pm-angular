import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { UpdateInfoComponent } from '../../home/nav/update-info/update-info.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private modalService: NzModalService,
  ) { }

  @Input() title: string;

  @Input() icon: string;

  ngOnInit() {
  }

}
