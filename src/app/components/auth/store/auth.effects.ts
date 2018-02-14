import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

import * as AuthActions from './auth.actions';
import * as RouterActions from '../../../router/store';
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
    mergeMap(user => {
      let obs;
      if (!user) {
        obs = [
          { type: AuthActions.AuthActionTypes.SET_UNAUTHENTICATED },
          {
            type: RouterActions.RouterActionTypes.GO,
            payload: { path: '/login' }
          }
        ];
      } else {
        const loggedUser = this.getUser(user);
        obs = [
          { type: AuthActions.AuthActionTypes.SET_AUTHENTICATED },
          {
            type: AuthActions.AuthActionTypes.SAVE_LOGGED_IN_USER,
            payload: loggedUser
          },
          { type: RouterActions.RouterActionTypes.GO, payload: { path: '/' } }
        ];
      }
      return obs;
    })
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
      ).pipe(
        mergeMap(user => {
          const loggedUser = this.getUser(user);
          return [
            { type: AuthActions.AuthActionTypes.SET_AUTHENTICATED },
            {
              type: AuthActions.AuthActionTypes.SAVE_LOGGED_IN_USER,
              payload: loggedUser
            },
            { type: AuthActions.AuthActionTypes.ERRORS, payload: null },
            { type: RouterActions.RouterActionTypes.GO, payload: { path: '/' } }
          ];
        }),
        catchError(error =>
          from([
            { type: AuthActions.AuthActionTypes.SET_UNAUTHENTICATED },
            { type: AuthActions.AuthActionTypes.ERRORS, payload: error }
          ])
        )
      )
    )
  );

  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.TRY_REGISTER),
    switchMap((action: AuthActions.TryRegister) =>
      fromPromise(
        this.af.auth.createUserWithEmailAndPassword(
          action.payload.email,
          action.payload.password
        )
      ).pipe(
        switchMap(user =>
          fromPromise(
            this.af.auth.currentUser.updateProfile({
              displayName: action.payload.fullName,
              photoURL: user.photoURL
            })
          ).pipe(
            map(updatedUser => this.getUser(updatedUser)),
            catchError(error =>
              from([
                { type: AuthActions.AuthActionTypes.SET_UNAUTHENTICATED },
                { type: AuthActions.AuthActionTypes.ERRORS, payload: error }
              ])
            )
          )
        ),
        mergeMap(user => [
          { type: AuthActions.AuthActionTypes.SET_AUTHENTICATED },
          {
            type: AuthActions.AuthActionTypes.SAVE_LOGGED_IN_USER,
            payload: user
          },
          { type: AuthActions.AuthActionTypes.ERRORS, payload: null },
          { type: RouterActions.RouterActionTypes.GO, payload: { path: '/' } }
        ]),
        catchError(error =>
          from([
            { type: AuthActions.AuthActionTypes.SET_UNAUTHENTICATED },
            { type: AuthActions.AuthActionTypes.ERRORS, payload: error }
          ])
        )
      )
    )
  );

  getUser(user) {
    return new User(
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
  }
}
