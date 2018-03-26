import { Action } from '@ngrx/store';

export enum CounterActionTypes {
    INCREMENT = '[COUNTER] Increment',
    DECREMENT = '[COUNTER] Decrement',
}

export class Increment implements Action {
    readonly type = CounterActionTypes.INCREMENT;
}

export class Decrement implements Action {
    readonly type = CounterActionTypes.DECREMENT;
}

export type CounterActions
  = Increment
  | Decrement;