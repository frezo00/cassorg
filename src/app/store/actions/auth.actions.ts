import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  SET_AUTHENTICATED = '[Auth] Set Authenicated',
  SET_UNAUTHENICATED = '[Auth] Set Unauthenicated'
}

export class SetAuthenicated implements Action {
  readonly type = AuthActionTypes.SET_AUTHENTICATED;
}

export class SetUnauthenicated implements Action {
  readonly type = AuthActionTypes.SET_UNAUTHENICATED;
}

export type AuthActions = SetAuthenicated | SetUnauthenicated;
