import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import {
  map,
  switchMap,
  mergeMap,
  catchError,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

import * as AuthActions from './auth.actions';
import * as RouterActions from '../../../router/store';
import { User, IUser } from '../../../models/user.model';
import { AppState } from '../../../store';
import { AuthService } from '../auth.service';

export interface LoginData {
  email: string;
  password: string;
}

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private af: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) {}

  @Effect()
  saveUserData$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.SAVE_LOGGED_IN_USER),
    map(action => this.af.authState),
    switchMap(user => {
      console.log('data in action is: ', user);
      return this.authService.getCurrentUser().map(myUser => {
        console.log('data is: ', myUser);
        return {
          type: AuthActions.AuthActionTypes.SAVE_LOGGED_IN_USER_COMPLETE,
          payload: this.getUser(myUser)
        };
      });
    })
  );

  @Effect()
  checkIfLoggedIn$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.CHECK_LOGGED_IN_USER),
    map(() => this.af.authState),
    mergeMap(user => {
      let obs;
      if (!user) {
        obs = [
          { type: AuthActions.AuthActionTypes.SET_UNAUTHENTICATED },
          {
            type: RouterActions.RouterActionTypes.GO,
            payload: { path: '/auth/login' }
          }
        ];
      } else {
        obs = [
          { type: AuthActions.AuthActionTypes.SET_AUTHENTICATED },
          { type: AuthActions.AuthActionTypes.SAVE_LOGGED_IN_USER },
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
        mergeMap(() => [
          { type: AuthActions.AuthActionTypes.SET_AUTHENTICATED },
          { type: AuthActions.AuthActionTypes.SAVE_LOGGED_IN_USER },
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
        mergeMap(createdUser => {
          console.log('user: ', createdUser);
          const actions: Array<any> = [
            { type: AuthActions.AuthActionTypes.SET_AUTHENTICATED },
            { type: AuthActions.AuthActionTypes.SAVE_LOGGED_IN_USER }
          ];
          if (!createdUser.displayName) {
            console.log('no display name');
            actions.push({
              type: AuthActions.AuthActionTypes.UPDATE_USER_PROFILE,
              payload: {
                displayName: action.payload.fullName,
                photoURL: createdUser.photoURL
              }
            });
          }
          if (!createdUser.emailVerified) {
            console.log('email not verified');
            actions.push.apply(actions, [
              { type: AuthActions.AuthActionTypes.SEND_VERIFICATION_EMAIL },
              {
                type: RouterActions.RouterActionTypes.GO,
                payload: { path: '/auth/email-confirmation' }
              }
            ]);
          } else {
            actions.push({
              type: RouterActions.RouterActionTypes.GO,
              payload: { path: '/' }
            });
          }
          actions.push({
            type: AuthActions.AuthActionTypes.ERRORS,
            payload: null
          });
          console.log('actions: ', actions);
          return actions;
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
  updateUserProfile$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.UPDATE_USER_PROFILE),
    map((action: AuthActions.UpdateUserProfile) => action.payload),
    switchMap((userProfile: { displayName: string; photoURL: string }) =>
      fromPromise(
        this.af.auth.currentUser.updateProfile({
          displayName: userProfile.displayName,
          photoURL: userProfile.photoURL
        })
      ).pipe(
        map(() => {
          return { type: AuthActions.AuthActionTypes.SAVE_LOGGED_IN_USER };
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

  @Effect({ dispatch: false })
  sendVerificationEmail$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.SEND_VERIFICATION_EMAIL),
    switchMap(() =>
      fromPromise(this.af.auth.currentUser.sendEmailVerification()).pipe(
        map(() => {
          return { type: AuthActions.AuthActionTypes.SAVE_LOGGED_IN_USER };
        }),
        catchError(error =>
          from([
            { type: AuthActions.AuthActionTypes.SET_UNAUTHENTICATED },
            { type: AuthActions.AuthActionTypes.ERRORS, payload: error }
          ])
        )
      )
    ),
    tap(data => console.log(data))
  );

  getUser(user) {
    console.log('my user is: ', user);
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
