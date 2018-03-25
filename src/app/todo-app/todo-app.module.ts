import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoAppRoutingModule } from './todo-app-routing.module';
import { TodoAppComponent } from './todo-app.component';

@NgModule({
  imports: [
    CommonModule,
    TodoAppRoutingModule
  ],
  declarations: [TodoAppComponent]
})
export class TodoAppModule { }
