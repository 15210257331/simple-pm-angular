import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskKanbanComponent } from './task-kanban.component';

describe('TaskKanbanComponent', () => {
  let component: TaskKanbanComponent;
  let fixture: ComponentFixture<TaskKanbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskKanbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
