import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AddTodo, ToggleTodo } from '@state/todo-list/todo-list.actions';
import { State } from '@state/todo-list/todo-list.state';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css']
})
export class TodoAppComponent implements OnInit {

  newTodo: String = '';
  todoList$: Observable<any>;

  constructor(private store: Store<State>) {
    this.todoList$ = store.pipe(select('todoList'));
  }

  ngOnInit() {
  }

  addTodo() {
    this.store.dispatch(
      new AddTodo({ name: this.newTodo })
    );
  }

  toggleTodo(index: Number) {
    this.store.dispatch(
      new ToggleTodo({ index })
    );
  }

}
