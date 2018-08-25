import { Action } from '@ngrx/store';
import { FirebaseAuthError, IUserLogin, Register, Login, FirebaseUpdateProfile } from '../../../models';

export enum AuthActionTypes {
  // Register
  REGISTER_BEGIN = '[Auth] Register Begin',
  REGISTER_SUCCESS = '[Auth] Register Success',

  // Login
  LOGIN_BEGIN = '[Auth] Login Begin',
  LOGIN_SUCCESS = '[Auth] Login Success',

  // Logout
  LOGOUT_BEGIN = '[Auth] Logout Begin',
  LOGOUT_SUCCESS = '[Auth] Logout Success',

  // Saving and Checking Data for Logged In User
  SAVE_USER_LOGIN_DATA_BEGIN = '[Auth] Save User Login Data Begin',
  SAVE_USER_LOGIN_DATA_SUCCESS = '[Auth] Save User Login Data Success',

  // Handling Auth Errors
  SET_ERRORS = '[Auth] Set Errors',
  REMOVE_ERRORS = '[Auth] Remove Errors',

  // Updating User Display Name and Photo
  UPDATE_USER_PROFILE = '[Auth] Update User Profile',

  // Email Verification
  SEND_VERIFICATION_EMAIL = '[Auth] Send Verification Email',
  CHECK_IF_EMAIL_VERIFIED = '[Auth] Check If Email Verified',
  CHECK_IF_EMAIL_VERIFIED_SUCCESS = '[Auth] Check If Email Verified Success'
}

// Register, Login and Logout
export class RegisterBegin implements Action {
  readonly type = AuthActionTypes.REGISTER_BEGIN;
  constructor(public payload: Register) {}
}
export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.REGISTER_SUCCESS;
}

// Login
export class LoginBegin implements Action {
  readonly type = AuthActionTypes.LOGIN_BEGIN;
  constructor(public payload: Login) {}
}
export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
}

// Logout
export class LogoutBegin implements Action {
  readonly type = AuthActionTypes.LOGOUT_BEGIN;
}
export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LOGOUT_SUCCESS;
}

// Saving Data for Logged In User
export class SaveUserLoginDataBegin implements Action {
  readonly type = AuthActionTypes.SAVE_USER_LOGIN_DATA_BEGIN;
}
export class SaveUserLoginDataSuccess implements Action {
  readonly type = AuthActionTypes.SAVE_USER_LOGIN_DATA_SUCCESS;
  constructor(public payload: IUserLogin) {}
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
  constructor(public payload: FirebaseUpdateProfile) {}
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
  | RegisterBegin
  | RegisterSuccess
  | LoginBegin
  | LoginSuccess
  | LogoutBegin
  | LogoutSuccess
  | SetErrors
  | RemoveErrors
  | SaveUserLoginDataBegin
  | SaveUserLoginDataSuccess
  | UpdateUserProfile
  | SendVerificationEmail
  | CheckIfEmailVerified
  | CheckIfEmailVerifiedSuccess;
