import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AddTodo } from '@state/todo-list/todo-list.actions';
import { State } from '@state/todo-list/todo-list.state';

@Component({
  selector: 'app-todo-adder',
  templateUrl: './todo-adder.component.html',
  styleUrls: ['./todo-adder.component.css']
})
export class TodoAdderComponent implements OnInit {

  newTodo: String = '';

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  addTodo() {
    this.store.dispatch(
      new AddTodo({ name: this.newTodo })
    );
  }

}
