import { Action } from '@ngrx/store';

import { State } from './counter.state';

export enum CounterActionTypes {
    INCREMENT =     '[COUNTER] Increment',
    DECREMENT =     '[COUNTER] Decrement',
    LOAD =          '[COUNTER] Load',
    LOAD_SUCCEEDED ='[COUNTER] Load Succeeded',
    LOAD_FAILED =   '[COUNTER] Load Failed',
}

export class Increment implements Action {
    readonly type = CounterActionTypes.INCREMENT;
}

export class Decrement implements Action {
    readonly type = CounterActionTypes.DECREMENT;
}

export class Load implements Action {
    readonly type = CounterActionTypes.LOAD;
}

export class LoadSucceeded implements Action {
    readonly type = CounterActionTypes.LOAD_SUCCEEDED;
    constructor(public payload: {data: State}) { }
}

export type CounterActions
  = Increment
  | Decrement
  | Load
  | LoadSucceeded;