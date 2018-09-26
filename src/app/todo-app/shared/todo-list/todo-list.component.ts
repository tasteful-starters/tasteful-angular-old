import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ToggleTodo } from '@state/todo-list/todo-list.actions';
import { State } from '@state/todo-list/todo-list.state';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList$: Observable<any>;

  constructor(private store: Store<State>) {
    this.todoList$ = store.pipe(select('todoList'));
  }

  ngOnInit() {
  }

  toggleTodo(index: Number) {
    this.store.dispatch(
      new ToggleTodo({ index })
    );
  }

}
