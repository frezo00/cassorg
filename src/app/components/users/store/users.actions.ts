import { Action } from '@ngrx/store';
import { IUser } from '../../../models/user.model';

export enum UsersActionTypes {
  GET_RECENT_USERS = '[Users] Get Recent Users',
  GET_RECENT_USERS_COMPLETE = '[Users] Get Recent Users Complete',
  CREATE_USER = '[Users] Create User',
  CREATE_USER_COMPLETE = '[Users] Create User Complete',
  ERRORS = '[Users] Errors'
}

export class GetRecentUsers implements Action {
  readonly type = UsersActionTypes.GET_RECENT_USERS;
}

export class GetRecentUsersComplete implements Action {
  readonly type = UsersActionTypes.GET_RECENT_USERS_COMPLETE;

  constructor(public payload: IUser[]) {}
}

export class CreateUser implements Action {
  readonly type = UsersActionTypes.CREATE_USER;

  constructor(public payload: IUser) {}
}
export class CreateUserComplete implements Action {
  readonly type = UsersActionTypes.CREATE_USER_COMPLETE;

  constructor(public payload: IUser) {}
}

export class Errors implements Action {
  readonly type = UsersActionTypes.ERRORS;

  constructor(public payload: any) {}
}

export type UsersActions =
  | GetRecentUsers
  | GetRecentUsersComplete
  | CreateUser
  | CreateUserComplete
  | Errors;
