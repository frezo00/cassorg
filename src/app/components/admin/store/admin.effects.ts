import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppState } from '../../../store';

import * as AdminActions from './admin.actions';

@Injectable()
export class AdminEffects {
  @Effect()
  createAdmin$: Observable<Action> = this.actions$.pipe(
    ofType(AdminActions.AdminActionTypes.CREATE_ADMIN)
  );

  constructor(private actions$: Actions, private store$: Store<AppState>) {}
}
