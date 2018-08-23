import { Action } from '@ngrx/store';
import { FirebaseAuthError, IUserLogin } from '../../../models';

export enum AuthActionTypes {
  // Register, Login and Logout
  TRY_REGISTER = '[Auth] Try Register',
  TRY_LOGIN = '[Auth] Try Login',
  LOGOUT = '[Auth] Logout',

  // Saving and Checking Data for Logged In User
  SAVE_USER_LOGIN_DATA = '[Auth] Save User Login Data',
  SAVE_USER_LOGIN_DATA_SUCCESS = '[Auth] Save User Login Data Success',
  CHECK_IF_USER_LOGGED_IN = '[Auth] Check If User Logged In',

  // Handling Auth Errors
  SET_ERRORS = '[Auth] Set Errors',
  REMOVE_ERRORS = '[Auth] Remove Errors',

  // Updating User Display Name and Photo
  UPDATE_USER_PROFILE = '[Auth] Update User Profile',
  UPDATE_USER_PROFILE_COMPLETE = '[Auth] Update User Profile Complete',

  // Email Verification
  SEND_VERIFICATION_EMAIL = '[Auth] Send Verification Email',
  CHECK_IF_EMAIL_VERIFIED = '[Auth] Check If Email Verified',
  CHECK_IF_EMAIL_VERIFIED_SUCCESS = '[Auth] Check If Email Verified Success'
}

// Register, Login and Logout
export class TryRegister implements Action {
  readonly type = AuthActionTypes.TRY_REGISTER;

  constructor(
    public payload: { fullName: string; email: string; password: string }
  ) {}
}
export class TryLogin implements Action {
  readonly type = AuthActionTypes.TRY_LOGIN;

  constructor(public payload: { email: string; password: string }) {}
}
export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

// Saving and Checking Data for Logged In User
export class SaveUserLoginData implements Action {
  readonly type = AuthActionTypes.SAVE_USER_LOGIN_DATA;
}
export class SaveUserLoginDataSuccess implements Action {
  readonly type = AuthActionTypes.SAVE_USER_LOGIN_DATA_SUCCESS;

  constructor(public payload: IUserLogin) {}
}
export class CheckIfUserLoggedIn implements Action {
  readonly type = AuthActionTypes.CHECK_IF_USER_LOGGED_IN;
}

// Handling Auth Errors
export class SetErrors implements Action {
  readonly type = AuthActionTypes.SET_ERRORS;

  constructor(public payload: FirebaseAuthError) {}
}
export class RemoveErrors implements Action {
  readonly type = AuthActionTypes.REMOVE_ERRORS;
}

// Updating User Display Name and Photo
export class UpdateUserProfile implements Action {
  readonly type = AuthActionTypes.UPDATE_USER_PROFILE;

  constructor(public payload: { displayName: string; photoURL: string }) {}
}
export class UpdateUserProfileComplete implements Action {
  readonly type = AuthActionTypes.UPDATE_USER_PROFILE_COMPLETE;

  constructor(public payload: { displayName: string; photoURL: string }) {}
}

// Email Verification
export class SendVerificationEmail implements Action {
  readonly type = AuthActionTypes.SEND_VERIFICATION_EMAIL;
}
export class CheckIfEmailVerified implements Action {
  readonly type = AuthActionTypes.CHECK_IF_EMAIL_VERIFIED;
}
export class CheckIfEmailVerifiedSuccess implements Action {
  readonly type = AuthActionTypes.CHECK_IF_EMAIL_VERIFIED_SUCCESS;

  constructor(public payload: boolean) {}
}

export type AuthActions =
  | TryRegister
  | TryLogin
  | Logout
  | SetErrors
  | RemoveErrors
  | CheckIfUserLoggedIn
  | SaveUserLoginData
  | SaveUserLoginDataSuccess
  | UpdateUserProfile
  | UpdateUserProfileComplete
  | SendVerificationEmail
  | CheckIfEmailVerified
  | CheckIfEmailVerifiedSuccess;
