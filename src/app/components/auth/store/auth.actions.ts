import { Action } from '@ngrx/store';
import { IUser } from '../../../models/user.model';

export enum AuthActionTypes {
  CHECK_LOGGED_IN_USER = '[Auth] Check Logged In User',
  SAVE_LOGGED_IN_USER = '[Auth] Save Logged In User',
  SAVE_LOGGED_IN_USER_COMPLETE = '[Auth] Save Logged In User Complete',
  TRY_LOGIN = '[Auth] Try Login',
  TRY_REGISTER = '[Auth] Try Register',
  SET_AUTHENTICATED = '[Auth] Set Authenticated',
  SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated',
  ERRORS = '[Auth] Errors',
  UPDATE_USER_PROFILE = '[Auth] Update User Profile',
  UPDATE_USER_PROFILE_COMPLETE = '[Auth] Update User Profile Complete',
  SEND_VERIFICATION_EMAIL = '[Auth] Send Verification Email'
}

export class CheckLoggedInUser implements Action {
  readonly type = AuthActionTypes.CHECK_LOGGED_IN_USER;
}

export class SaveLoggedInUser implements Action {
  readonly type = AuthActionTypes.SAVE_LOGGED_IN_USER;
}

export class SaveLoggedInUserComplete implements Action {
  readonly type = AuthActionTypes.SAVE_LOGGED_IN_USER_COMPLETE;

  constructor(public payload: IUser) {}
}

export class TryLogin implements Action {
  readonly type = AuthActionTypes.TRY_LOGIN;

  constructor(public payload: { email: string; password: string }) {}
}

export class TryRegister implements Action {
  readonly type = AuthActionTypes.TRY_REGISTER;

  constructor(
    public payload: { fullName: string; email: string; password: string }
  ) {}
}

export class SetAuthenicated implements Action {
  readonly type = AuthActionTypes.SET_AUTHENTICATED;
}

export class SetUnauthenicated implements Action {
  readonly type = AuthActionTypes.SET_UNAUTHENTICATED;
}

export class SetErrors implements Action {
  readonly type = AuthActionTypes.ERRORS;

  constructor(public payload: { message: string }) {}
}

export class UpdateUserProfile implements Action {
  readonly type = AuthActionTypes.UPDATE_USER_PROFILE;

  constructor(public payload: { displayName: string; photoURL: string }) {}
}
export class UpdateUserProfileComplete implements Action {
  readonly type = AuthActionTypes.UPDATE_USER_PROFILE_COMPLETE;

  constructor(public payload: { displayName: string; photoURL: string }) {}
}

export class SendVerificationEmail implements Action {
  readonly type = AuthActionTypes.SEND_VERIFICATION_EMAIL;
}

export type AuthActions =
  | CheckLoggedInUser
  | SaveLoggedInUser
  | SaveLoggedInUserComplete
  | TryLogin
  | TryRegister
  | SetAuthenicated
  | SetUnauthenicated
  | SetErrors
  | UpdateUserProfile
  | UpdateUserProfileComplete
  | SendVerificationEmail;
