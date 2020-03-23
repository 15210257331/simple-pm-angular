import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactory, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { MemberSettingComponent } from './member-setting/member-setting.component';
import { RoleSettingComponent } from './role-setting/role-setting.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  selectTab = 1;

  componentRef: ComponentRef<any>;

  viewList: any[] = [
    {
      title: '成员管理',
      value: 1,
      component: MemberSettingComponent
    },
    {
      title: '角色管理',
      value: 2,
      component: RoleSettingComponent
    },
  ];

  @ViewChild('viewDetail', { read: ViewContainerRef, static: true }) commentContainer: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    this.tabChange(this.selectTab);
  }

  tabChange(value: number) {
    this.selectTab = value;
    const selectComponent = this.viewList.filter(item => item.value === this.selectTab)[0];
    this.createComponent(selectComponent.component);
  }

  createComponent(component: any) {
    this.commentContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.commentContainer.createComponent(factory);
  }
}
