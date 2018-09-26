import { Action } from '@ngrx/store';

export enum TodoListActionTypes {
    ADD_TODO = '[TODO-LIST] Add TODO',
    TOGGLE_TODO = '[TODO-LIST] Toggle TODO',
}

export class AddTodo implements Action {
    readonly type = TodoListActionTypes.ADD_TODO;
    constructor(public payload: { name: String }) { }
}

export class ToggleTodo implements Action {
    readonly type = TodoListActionTypes.TOGGLE_TODO;
    constructor(public payload: { index: Number, done?: Boolean }) { }
}

export type TodoListActions
    = AddTodo
    | ToggleTodo;
