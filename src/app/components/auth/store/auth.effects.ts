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
import {
  FirebaseAuthError,
  UserLogin,
  Login,
  Register,
  FirebaseUpdateProfile,
  IUserLogin
} from '../../../models';

@Injectable()
export class AuthEffects {
  @Effect()
  saveUserDataBegin$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.SAVE_USER_LOGIN_DATA_BEGIN),
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
        catchError(error =>
          from([
            new AuthActions.SetErrors(error),
            new CommonActions.ShowLoading(false)
          ])
        )
      )
    )
  );

  @Effect()
  loginBegin$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGIN_BEGIN),
    map((action: AuthActions.LoginBegin) => action.payload),
    switchMap((loginData: Login) =>
      fromPromise(this.authService.login(loginData)).pipe(
        map(() => new AuthActions.LoginSuccess()),
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
  loginSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGIN_SUCCESS),
    mergeMap(() => [
      new AuthActions.SaveUserLoginDataBegin(),
      new CommonActions.ShowLoading(false),
      new RouterActions.Go({ path: '/' })
    ]),
    catchError((error: FirebaseAuthError) =>
      from([
        new AuthActions.SetErrors(error),
        new CommonActions.ShowLoading(false)
      ])
    )
  );

  @Effect()
  registerBegin$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.REGISTER_BEGIN),
    map((action: AuthActions.RegisterBegin) => action.payload),
    switchMap((registerData: Register) =>
      fromPromise(
        this.authService.register(registerData.email, registerData.password)
      ).pipe(
        mergeMap(registeredUser => {
          console.log('registered user', registeredUser);
          const newUser = new UserLogin(
            registeredUser.user.uid,
            registerData.email,
            registerData.fullName
          );
          console.log('new user:', newUser);
          return [
            new AuthActions.UpdateUserProfile({
              displayName: registerData.fullName,
              photoURL: registeredUser.user.photoURL
            }), // also calls SaveUserLoginData()
            // new UsersActions.CheckIfUserExists(registeredUser.user.uid),
            new UsersActions.CreateUserAfterRegisterBegin(
              newUser as IUserLogin
            ),
            new RouterActions.Go({ path: '/' })
          ];
        }),
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
  registerSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.REGISTER_SUCCESS),
    mergeMap(() => [
      new AuthActions.SaveUserLoginDataBegin(),
      new CommonActions.ShowLoading(false),
      new RouterActions.Go({ path: '/' })
    ]),
    catchError((error: FirebaseAuthError) =>
      from([
        new AuthActions.SetErrors(error),
        new CommonActions.ShowLoading(false)
      ])
    )
  );

  @Effect()
  updateUserProfile$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.UPDATE_USER_PROFILE),
    map((action: AuthActions.UpdateUserProfile) => action.payload),
    switchMap((userProfile: FirebaseUpdateProfile) =>
      fromPromise(this.authService.updateProfile(userProfile)).pipe(
        map(() => new AuthActions.SaveUserLoginDataBegin()),
        catchError(error => of(new AuthActions.SetErrors(error)))
      )
    )
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGOUT_BEGIN),
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
        map(() => new AuthActions.SaveUserLoginDataBegin()),
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
