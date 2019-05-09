import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';
import {
  map,
  switchMap,
  mergeMap,
  catchError,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import * as AuthActions from '../actions/auth.actions';
import * as NavigationActions from '../actions/navigation.actions';
import * as CommonActions from '../actions/common.actions';
import * as UsersActions from '../actions/users.actions';
import { AppState } from '../reducers';
import { AuthService } from '../../services';
import {
  FirebaseAuthError,
  Login,
  Register,
  FirebaseUpdateProfile,
  IUserLogin
} from '../../models';

@Injectable()
export class AuthEffects {
  @Effect()
  saveUserDataBegin$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.SAVE_USER_LOGIN_DATA_BEGIN),
    switchMap(() =>
      this.authService.getAuthState().pipe(
        mergeMap(authData => {
          const loginData: IUserLogin = {
            authId: authData.uid,
            email: authData.email,
            displayName: authData.displayName
          };
          return [
            new AuthActions.SaveUserLoginDataSuccess(loginData),
            new UsersActions.GetLoggedInUserDataBegin(authData.uid),
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
      from(this.authService.login(loginData)).pipe(
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
      new NavigationActions.Go('/')
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
      from(
        this.authService.register(registerData.email, registerData.password)
      ).pipe(
        mergeMap(registeredUser => {
          const newUser: IUserLogin = {
            authId: registeredUser.user.uid,
            email: registerData.email,
            displayName: registerData.fullName
          };
          const profileData: FirebaseUpdateProfile = {
            displayName: registerData.fullName,
            photoURL: registeredUser.user.photoURL
          };
          return [
            new AuthActions.UpdateUserProfile(profileData),
            new UsersActions.CreateUserAfterRegisterBegin(newUser),
            new AuthActions.RegisterSuccess()
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
      new NavigationActions.Go('/')
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
      from(this.authService.updateProfile(userProfile)).pipe(
        map(() => new AuthActions.SaveUserLoginDataBegin()),
        catchError(error => of(new AuthActions.SetErrors(error)))
      )
    )
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGOUT_BEGIN),
    switchMap(() =>
      from(this.authService.signOut()).pipe(
        map(() => new NavigationActions.Go('/auth/login')),
        catchError(error => of(new AuthActions.SetErrors(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  sendVerificationEmail$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.SEND_VERIFICATION_EMAIL),
    switchMap(() =>
      from(this.authService.sendVerificationEmail()).pipe(
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