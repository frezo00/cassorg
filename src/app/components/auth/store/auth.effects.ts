import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, from as fromPromise, of, from } from 'rxjs';
import {
  map,
  switchMap,
  mergeMap,
  catchError,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import * as RouterActions from '../../../router/store';
import * as CommonActions from '../../common/store';
import * as UsersActions from '../../users/store';
import { AppState } from '../../../store';
import { AuthService } from '../auth.service';
import { FirebaseAuthError, UserLogin } from '../../../models';

@Injectable()
export class AuthEffects {
  @Effect()
  saveUserData$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.SAVE_USER_LOGIN_DATA),
    switchMap(() =>
      this.authService.getAuthState().pipe(
        mergeMap(authData => {
          const loginData = new UserLogin(
            authData.uid,
            authData.email,
            authData.displayName
          );
          return [
            new AuthActions.SaveUserLoginDataSuccess(loginData),
            new CommonActions.ShowLoading(false)
          ];
        }),
        catchError(error => of(new AuthActions.SetErrors(error)))
      )
    )
  );

  @Effect({ dispatch: true })
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.TRY_LOGIN),
    map((action: AuthActions.TryLogin) => action.payload),
    switchMap((data: { email: string; password: string }) =>
      fromPromise(this.authService.login(data.email, data.password)).pipe(
        mergeMap(() => [
          new AuthActions.SaveUserLoginData(),
          new AuthActions.CheckIfEmailVerified(),
          new RouterActions.Go({ path: '/' })
        ]),
        catchError((error: FirebaseAuthError) =>
          from([
            new AuthActions.SetErrors(error),
            new CommonActions.ShowLoading(false)
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
        mergeMap(createdUser => [
          new AuthActions.UpdateUserProfile({
            displayName: data.fullName,
            photoURL: createdUser.photoURL
          }), // also calls SaveUserLoginData()
          new RouterActions.Go({ path: '/' })
        ]),
        catchError((error: FirebaseAuthError) =>
          from([
            new AuthActions.SetErrors(error),
            new CommonActions.ShowLoading(false)
          ])
        )
      )
    )
  );

  @Effect()
  updateUserProfile$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.UPDATE_USER_PROFILE),
    map((action: AuthActions.UpdateUserProfile) => action.payload),
    switchMap((userProfile: { displayName: string; photoURL: string }) =>
      fromPromise(
        this.authService.updateProfile(
          userProfile.displayName,
          userProfile.photoURL
        )
      ).pipe(
        map(() => new AuthActions.SaveUserLoginData()),
        catchError(error => of(new AuthActions.SetErrors(error)))
      )
    )
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGOUT),
    switchMap(() =>
      fromPromise(this.authService.signOut()).pipe(
        map(() => new RouterActions.Go({ path: '/auth/login' })),
        catchError(error => of(new AuthActions.SetErrors(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  sendVerificationEmail$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.SEND_VERIFICATION_EMAIL),
    switchMap(() =>
      fromPromise(this.authService.sendVerificationEmail()).pipe(
        map(() => new AuthActions.SaveUserLoginData()),
        catchError(error => of(new AuthActions.SetErrors(error)))
      )
    )
  );

  @Effect()
  checkIfEmailVerified$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.CHECK_IF_EMAIL_VERIFIED),
    switchMap(() =>
      this.authService.getAuthState().pipe(
        map(
          authData =>
            new AuthActions.CheckIfEmailVerifiedSuccess(authData.emailVerified)
        ),
        catchError(error => of(new AuthActions.SetErrors(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private authService: AuthService
  ) {}
}
