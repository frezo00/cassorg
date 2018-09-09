import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RouterActionTypes, Go } from './router.actions';
import { map, tap, switchMap } from 'rxjs/operators';
import { IRouter } from '../../models';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private router: Router) {}

  @Effect({ dispatch: false })
  navigateTo$ = this.actions$.pipe(
    ofType(RouterActionTypes.GO),
    map((action: Go) => action.payload),
    map((routerData: IRouter) => {
      const data = [routerData.path];
      if (!!routerData.data) {
        data.push(routerData.data);
      }
      return this.router.navigate(data);
    })
  );
}
