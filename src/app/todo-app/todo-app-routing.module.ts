import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoAppComponent } from './todo-app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

const routes: Routes = [{
  path: '',
  component: TodoAppComponent,
  children: [
    { path: ':index', component: TodoItemComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoAppRoutingModule { }
