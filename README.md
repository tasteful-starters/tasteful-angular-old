# Tasteful Angular

This is a minimalistic Angular starter with all you should need to create an easy to read and scale state of the art Angular application.

Table of contents
=================

  * [Development server](#development-server)
  * [Generating components / UI elements](#generating-components-ui-elements)
  * [Shared folder / modules](#shared-folder-modules)
  * [Generating routes / new pages](#generating-routes-new-pages)
  * [Generating new stores](#generating-new-stores)
  * [Building](#building)
  * [Handling *bad* code](#handling-bad-code)

---

## Development server

```
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

To run `ng` commands open another terminal and leave this one open since it's running the dev server.

---

## Generating components / UI elements

- Bootstrap
```
ng g module [path-from-/app]/component-name
ng g component [path-from-/app]/component-name
```

- Export in module

  In `[path-from-/app]/component-name.module.ts`

  Add:

  ```ts
  @NgModule({
    (...)
    exports: [ComponentName] //<-- add this
  })
  ```

- Inject in the parent

  In the `.module.ts` file of the direct parent add:

  ```ts
  import { ComponentNameModule } from './component-name/component-name.module'; //<-- add this (1/2)

  @NgModule({
    imports: [
      (...)
      ComponentNameModule //<-- add this (2/2)
    ]
  })
  ```


  #### Why encapsulate every component in a module  ?
  This way your component has a module file where you can import anything in an Angular way.

---

## Shared folder / modules

If you want to re-use a component create it at the level where the top-most module that will import it resides, in a `/shared` folder.

Take a look at `app/shared` for reference

---

## Generating routes / new pages [TODO: Fix]

- Create a **component / UI element* as explained above, at the level at wich you want your new route

  example component levels -> routes:

    - `/app/about` -> `/about`
    - `/app/about/about-detail` -> `/about/about-detail`

- **routes file**

    - create `component-name.routes.ts`:

      ```ts
        import { ModuleWithProviders } from '@angular/core';
        import { Routes, RouterModule } from '@angular/router';

        import { ComponentNameComponent } from './component-name.component';

        const routes: Routes = [
          { path: '', component: ComponentNameComponent }
        ];

        export const routing: ModuleWithProviders = RouterModule.forChild(routes);
      ```

    - import it in the `component-name.module.ts`

      ```ts
      import { routing } from './component-name.routes'; //<-- add this (1/2)

      @NgModule({
        imports: [
          (...)

          routing, //<-- add this (2/2)
          (...)
        ]
      })

      ```

- reference in parent **routes file**

  ```ts
  const routes: Routes = [
    (...)
    { path: 'component-name', loadChildren: './component-name/component-name.module#ComponentNameModule' }, //<-- add this
  ];
  ```

---
## Generating new stores

- create a new folder in `/state` with the files:

  - `store-name.actions.ts`

    ```ts
    import { Action } from '@ngrx/store';

    export const ACTION_NAME          = '[STORE-NAME] ACTION_NAME';
    export const ACTION_NAME_SUCCESS  = '[STORE-NAME] ACTION_NAME_SUCCESS';
    export const ACTION_NAME_FAIL     = '[STORE-NAME] ACTION_NAME_FAIL';


    export class ActionName implements Action {
      readonly type = ACTION_NAME;
      constructor(public payload: {name?: string}) { }
    }

    export type All
      = ActionName

    ```

  - `store-name.reducer.ts`

    ```ts
    import { State, intitialState } from './store-name.state';
    import * as StoreNameActions from './store-name.actions';

    export type Action = StoreNameActions.All;

    export default function storeNameReducer(state = intitialState, action: Action): State {
        switch (action.type) {
            case StoreNameActions.ACTION_NAME: {
                const newstate = Object.assign({}, state);
                // change state here
                // be sure to enforce immutability in deep objects
                return newstate;
            }

            default: {
                return state;
            }
        }
    }

    ```

  - `store-name.state.ts`

    ```ts
    export interface State {
      someParameter: string
    }

    export const intitialState: State = {
      someParameter: 'whatever'
    };
    ```

  - `store-name.effects.ts` (optional)

    ```ts
    import 'rxjs/add/operator/map';
    import 'rxjs/add/operator/mergeMap';
    import 'rxjs/add/operator/catch';
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs/Observable';
    import { Action } from '@ngrx/store';
    import { Actions, Effect } from '@ngrx/effects';
    import { of } from 'rxjs/observable/of';

    import * as StoreNameActions from './store-name.actions';

    export type Action = StoreNameActions.All;

    @Injectable()
    export class StoreNameEffects {

      constructor(
        private http: HttpClient,
        private actions$: Actions
      ) {}

      @Effect() login$: Observable<Action> = this.actions$.ofType(StoreNameActions.ADD_TODO)
        .mergeMap(action =>
          // [ Hack ] should typeckeck `payload`
          this.http.post('/some-url', action['payload'])

            .map(data => ({ type: StoreNameActions.ACTION_NAME_SUCCESS, payload: data }))

            .catch(() => of({ type: StoreNameActions.ACTION_NAME_FAIL }))
        );
    }

    ```


- inject in `app.module.ts`

  ```ts
  (...)
  import storeNameReducer from './../state/store-name/store-name.reducer'; //<-- add this (1/2)
  import { StoreNametEffects } from './../state/store-name/store-name.effects'; //<-- add this (optional 1/2)
  (...)
  @NgModule({
    (...)
    imports: [
      (...)
      StoreModule.forRoot({
        (...)
        storeName: storeNameReducer //<-- add this (2/2)
      }),
      EffectsModule.forRoot([
        (...)
        StoreNametEffects //<-- add this (optional 2/2)
      ])
  ```

- inject in a component for updating the UI

  ```ts

  import { Store } from '@ngrx/store'; //<-- add this (1/6)
  import { Observable } from 'rxjs/Rx'; //<-- add this (2/6)

  import { State } from '../../state/store-name/store-name.state'; //<-- add this (3/6)

  (...)
  export class SomeComponent implements OnInit {

    storeName$: Observable<State>; //<-- add this (4/6)

    // [ HACK ] <any> should be <State>
    // Due to recent ngrx changes it
    constructor(private store: Store<any>) { //<-- edit this (5/6)
      this.storeName$ = store.select('storeNameStore'); //<-- add this (6/6)
    }
  ```

- inject in a component for dispatching action

  ```ts
  import { Store } from '@ngrx/store'; //<-- add this (1/3)

  import * as StoreNameActions from '../../../state/store-name/store-name.actions'; //<-- add this (2/3)

  (...)

    ngOnInit() {
    }

    buttonClick(name: String) {             //<-- add this (3/3)
      this.store.dispatch({                 //
        type: StoreNAmeActions.ACTION_NAME, //
        payload: { name }                   //
      });                                   //
    }                                       //
  ```

---

## Building

```bash
npm run build
``` 


---

## Handling *bad* code

It's normal to be pressured with deadlines and to have to leave a feature working but in a way we are not satisfied with yet as developers, in this case it's better to identify these situations than to just remember about them latter or to be found by someone else.

So in these case we leave a comment in the code above the *bad code* marked as `[ HACK ]`.

Like so:
```ts
  // [ HACK ] <any> should be <State>
  // Due to recent ngrx changes it
  constructor(private store: Store<any>) {
    this.list$ = store.select('todoListStore');
  }
``` 
