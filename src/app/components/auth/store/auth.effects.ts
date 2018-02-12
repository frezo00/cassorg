import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';

import * as AuthActions from './auth.actions';

export interface LoginData {
  email: string;
  password: string;
}

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private af: AngularFireAuth) {}

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.TRY_LOGIN),
    switchMap((action: AuthActions.TryLogin) =>
      fromPromise(
        this.af.auth.signInWithEmailAndPassword(
          action.payload.email,
          action.payload.password
        )
      )
    ),
    map(userData => {
      return {
        id: userData.uid,
        displayName: userData.displayName,
        email: userData.email,
        emailVerified: userData.emailVerified,
        phoneNumber: userData.phoneNumber,
        photoURL: userData.photoURL,
        lastLogin: userData.metadata.lastSignInTime
      };
    }),
    mergeMap(data => {
      console.log('data in merge map: ', data);
      return [{ type: AuthActions.AuthActionTypes.SET_AUTHENTICATED }];
    }),
    catchError(error => {
      console.error('error: ', error);
      return Observable.of({
        type: AuthActions.AuthActionTypes.SET_UNAUTHENTICATED
      });
    })
  );
}
