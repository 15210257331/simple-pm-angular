import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskKanbanItemComponent } from './task-kanban-item.component';

describe('TaskKanbanItemComponent', () => {
  let component: TaskKanbanItemComponent;
  let fixture: ComponentFixture<TaskKanbanItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskKanbanItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskKanbanItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
