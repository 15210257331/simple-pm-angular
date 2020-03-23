import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-set-authority',
  templateUrl: './set-authority.component.html',
  styleUrls: ['./set-authority.component.scss']
})
export class SetAuthorityComponent implements OnInit {

  @Input() title: string;

  authorityArray: any[] = [];

  constructor() { }

  ngOnInit() {
    this.authorityArray = [
      {
        label: '配置中心',
        value: '123',
        checked: false,
        features: [
          {
            label: '新建角色',
            value: '123',
            checked: true,
          },
          {
            label: '删除角色',
            value: '123',
            checked: true,
          },
        ]
      },
      {
        label: '项目',
        value: '123',
        checked: false,
        features: [
          {
            label: '新建角色',
            value: '123',
            checked: true,
          },
          {
            label: '删除角色',
            value: '123',
            checked: true,
          },
        ]
      },
      {
        label: '项目',
        value: '123',
        checked: false,
        features: [
          {
            label: '新建角色',
            value: '123',
            checked: true,
          },
          {
            label: '删除角色',
            value: '123',
            checked: true,
          },
        ]
      },
      {
        label: '项目',
        value: '123',
        checked: false,
        features: [
          {
            label: '新建角色',
            value: '123',
            checked: true,
          },
          {
            label: '删除角色',
            value: '123',
            checked: true,
          },
        ]
      }

    ];
  }

}
