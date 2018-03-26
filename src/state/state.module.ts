import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { counterReducer } from '@state/counter/counter.reducer';

@NgModule({
    imports: [
        StoreModule.forRoot({
            count: counterReducer
        }),
        StoreDevtoolsModule.instrument()
    ]
})
export class StateModule { }