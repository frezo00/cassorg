import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';

import * as AuthActions from './auth.actions';
import { User } from '../../../models/user.model';

export interface LoginData {
  email: string;
  password: string;
}

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private af: AngularFireAuth,
    private router: Router
  ) {}

  @Effect()
  checkIfLoggedIn$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.CHECK_LOGGED_IN_USER),
    switchMap((action: AuthActions.CheckLoggedInUser) => this.af.authState),
    map(user => {
      const loggedUser = new User(
        user.displayName,
        user.email,
        user.uid,
        null,
        null,
        null,
        user.emailVerified,
        user.phoneNumber,
        null,
        user.photoURL,
        user.metadata.creationTime,
        user.metadata.lastSignInTime
      );
      return loggedUser;
    }),
    tap(user => console.log('user', user)),
    mergeMap(user => [
      { type: AuthActions.AuthActionTypes.SAVE_LOGGED_IN_USER },
      { type: AuthActions.AuthActionTypes.SET_AUTHENTICATED, payload: user }
    ])
  );

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
      this.router.navigate(['']);
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
