import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { TodoAppRoutingModule } from './todo-app-routing.module';
import { TodoAppComponent } from './todo-app.component';
import { TodoAdderComponent } from './shared/todo-adder/todo-adder.component';
import { TodoListComponent } from './shared/todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  imports: [
    CommonModule,
    TodoAppRoutingModule,
    FormsModule
  ],
  declarations: [TodoAppComponent, TodoAdderComponent, TodoListComponent, TodoItemComponent]
})
export class TodoAppModule { }
