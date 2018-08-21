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
import * as UsersActions from '../../users/store';
import { User, IUser } from '../../../models/user.model';
import { AppState } from '../../../store';
import { AuthService } from '../auth.service';

export interface LoginData {
  email: string;
  password: string;
}

@Injectable()
export class AuthEffects {
  @Effect()
  saveUserData$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.SAVE_LOGGED_IN_USER),
    switchMap(action => this.af.authState),
    map(
      authData =>
        new AuthActions.SaveLoggedInUserComplete(this.getUser(authData))
    )
  );

  @Effect()
  checkIfLoggedIn$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.CHECK_LOGGED_IN_USER),
    switchMap(() => this.af.authState),
    mergeMap(user => {
      let actions;
      if (!user) {
        actions = [
          new AuthActions.SetUnauthenicated(),
          new RouterActions.Go({ path: '/auth/login' })
        ];
      } else {
        actions = [
          new AuthActions.SetAuthenicated(),
          new AuthActions.SaveLoggedInUser()
        ];
        if (!user.emailVerified) {
          actions.push(
            new RouterActions.Go({ path: '/auth/email-confirmation' })
          );
        } else {
          actions.push(new RouterActions.Go({ path: '/' }));
        }
      }
      return actions;
    })
  );

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.TRY_LOGIN),
    map((action: AuthActions.TryLogin) => action.payload),
    switchMap((data: { email: string; password: string }) =>
      fromPromise(this.authService.login(data.email, data.password)).pipe(
        mergeMap(loggedUser => {
          const actions: Array<any> = [
            new AuthActions.SetAuthenicated(),
            new AuthActions.SaveLoggedInUser(),
            new AuthActions.SetErrors(null)
          ];
          if (!loggedUser.emailVerified) {
            actions.push(
              new RouterActions.Go({ path: '/auth/email-confirmation' })
            );
          } else {
            actions.push(new RouterActions.Go({ path: '/' }));
          }
          return actions;
        }),
        catchError(error =>
          from([
            new AuthActions.SetAuthenicated(),
            new AuthActions.SetErrors(error)
          ])
        )
      )
    )
  );

  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.TRY_REGISTER),
    map((action: AuthActions.TryLogin) => action.payload),
    switchMap((data: { email: string; password: string; fullName: string }) =>
      fromPromise(this.authService.register(data.email, data.password)).pipe(
        mergeMap(createdUser => {
          const actions: Array<any> = [
            new AuthActions.SetAuthenicated(),
            new AuthActions.SaveLoggedInUser(),
            new AuthActions.SetErrors(null)
          ];
          if (!createdUser.displayName) {
            actions.push(
              new AuthActions.UpdateUserProfile({
                displayName: data.fullName,
                photoURL: createdUser.photoURL
              })
            );
          }
          if (!createdUser.emailVerified) {
            actions.push.apply(actions, [
              new AuthActions.SendVerificationEmail(),
              new RouterActions.Go({ path: '/auth/email-confirmation' })
            ]);
          } else {
            actions.push(new RouterActions.Go({ path: '/' }));
          }
          return actions;
        }),
        catchError(error =>
          from([
            new AuthActions.SetAuthenicated(),
            new AuthActions.SetErrors(error)
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
        this.authService.updateProfile(
          userProfile.displayName,
          userProfile.photoURL
        )
      ).pipe(
        map(() => new AuthActions.SaveLoggedInUser()),
        catchError(error =>
          from([
            new AuthActions.SetAuthenicated(),
            new AuthActions.SetErrors(error)
          ])
        )
      )
    )
  );

  @Effect({ dispatch: false })
  sendVerificationEmail$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.SEND_VERIFICATION_EMAIL),
    switchMap(() =>
      fromPromise(this.authService.sendVerificationEmail()).pipe(
        map(() => new AuthActions.SaveLoggedInUser()),
        catchError(error =>
          from([
            new AuthActions.SetAuthenicated(),
            new AuthActions.SetErrors(error)
          ])
        )
      )
    )
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGOUT),
    switchMap(() =>
      fromPromise(this.authService.signOut()).pipe(
        mergeMap(() => [
          new AuthActions.SetAuthenicated(),
          new RouterActions.Go({ path: '/auth/login' })
        ]),
        catchError(error =>
          from([
            new AuthActions.SetAuthenicated(),
            new AuthActions.SetErrors(error)
          ])
        )
      )
    )
  );

  getUser(user) {
    return new User(
      user.displayName,
      user.email,
      null,
      null,
      null,
      user.phoneNumber,
      null,
      null,
      user.photoURL,
      null,
      user.uid,
      user.emailVerified,
      null,
      null,
      null
    );
  }

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private af: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) {}
}
