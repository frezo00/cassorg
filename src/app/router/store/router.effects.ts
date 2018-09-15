import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RouterActionTypes, Go, Back } from './router.actions';
import { map, tap, switchMap } from 'rxjs/operators';
import { IRouter } from '../../models';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

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

  @Effect({ dispatch: false })
  goBack$ = this.actions$.pipe(
    ofType(RouterActionTypes.BACK),
    map(() => this.location.back())
  );
}
