import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

import { NavigationActionTypes, Go, Back } from './navigation.actions';
import { AppState } from '../../store';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigateTo$ = this.actions$.pipe(
    ofType(NavigationActionTypes.GO),
    map((action: Go) => action.payload),
    tap((path: string) => this.router.navigateByUrl(path))
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType(NavigationActionTypes.BACK),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    ofType(NavigationActionTypes.FORWARD),
    tap(() => this.location.forward())
  );
}
