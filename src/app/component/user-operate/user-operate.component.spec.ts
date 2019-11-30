import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOperateComponent } from './user-operate.component';

describe('UserOperateComponent', () => {
  let component: UserOperateComponent;
  let fixture: ComponentFixture<UserOperateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOperateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
