import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAdderComponent } from './todo-adder.component';

describe('TodoAdderComponent', () => {
  let component: TodoAdderComponent;
  let fixture: ComponentFixture<TodoAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
