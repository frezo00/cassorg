import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  TRY_LOGIN = '[Auth] Try Login',
  SET_AUTHENTICATED = '[Auth] Set Authenticated',
  SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated'
}

export class TryLogin implements Action {
  readonly type = AuthActionTypes.TRY_LOGIN;

  constructor(public payload: { email: string; password: string }) {}
}

export class SetAuthenicated implements Action {
  readonly type = AuthActionTypes.SET_AUTHENTICATED;
}

export class SetUnauthenicated implements Action {
  readonly type = AuthActionTypes.SET_UNAUTHENTICATED;
}

export type AuthActions = TryLogin | SetAuthenicated | SetUnauthenicated;
