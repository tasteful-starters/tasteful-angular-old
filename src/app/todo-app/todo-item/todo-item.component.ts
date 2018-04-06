import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { ToggleTodo } from '@state/todo-list/todo-list.actions';
import { State, TodoItem } from '@state/todo-list/todo-list.state';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  todoList$: Observable<any>;
  index: Number;
  selectedItem: TodoItem;

  constructor(
    private store: Store<State>,
    private route:ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.index = +params['index']; // (+) converts string 'index' to a number
    });
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
