import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { AppState } from '../reducers';
import { AdminActionTypes } from '../actions';

@Injectable()
export class AdminEffects {
  @Effect()
  createAdmin$: Observable<Action> = this.actions$.pipe(
    ofType(AdminActionTypes.CREATE_ADMIN)
  );

  constructor(private actions$: Actions, private store$: Store<AppState>) {}
}
