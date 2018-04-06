import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { CounterActionTypes } from './counter.actions';

@Injectable()
export class CounterEffects {

  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) {}

  @Effect() login$: Observable<Action> = this.actions$.ofType(CounterActionTypes.LOAD)
    .mergeMap(action =>
      // [ Hack ] should typeckeck `payload`
      this.http.get('//localhost:3000/counter')

        .map(data => ({ type: CounterActionTypes.LOAD_SUCCEEDED, payload: { data } }))

        .catch(() => of({ type: CounterActionTypes.LOAD_FAILED }))
    );
}