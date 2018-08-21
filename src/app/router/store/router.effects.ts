import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRouter from './router.actions';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private router: Router) {}

  @Effect({ dispatch: false })
  navigateTo$ = this.actions$.pipe(
    ofType(fromRouter.RouterActionTypes.GO),
    map((action: fromRouter.Go) => action.payload),
    tap(data => this.router.navigate([data.path]))
  );
}
