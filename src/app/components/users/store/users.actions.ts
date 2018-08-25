import { Action } from '@ngrx/store';
import { IUser, IProjectUser, IUserLogin } from '../../../models/user.model';

export enum UsersActionTypes {
  GET_ALL_USERS = '[Users] Get All Users',
  GET_RECENT_USERS = '[Users] Get Recent Users',
  GET_RECENT_USERS_COMPLETE = '[Users] Get Recent Users Complete',
  CREATE_USER = '[Users] Create User',
  CREATE_USER_COMPLETE = '[Users] Create User Complete',
  CREATE_PROJECT_USER = '[Users] Create Project User Complete',
  CHECK_IF_USER_EXISTS = '[Users] Check If User Exists',
  ERRORS = '[Users] Errors',
  PLAIN = '[Users] Plain Action',
  CREATE_USER_AFTER_REGISTER_BEGIN = '[Users] Create User After Register Begin',
  CREATE_USER_AFTER_REGISTER_SUCCESS = '[Users] Create User After Register Success'
}

export class PlainAction implements Action {
  readonly type = UsersActionTypes.PLAIN;
}

export class GetAllUsers implements Action {
  readonly type = UsersActionTypes.GET_ALL_USERS;
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

export class CreateProjectUser implements Action {
  readonly type = UsersActionTypes.CREATE_PROJECT_USER;

  constructor(public payload: IProjectUser) {}
}

export class CheckIfUserExists implements Action {
  readonly type = UsersActionTypes.CHECK_IF_USER_EXISTS;

  constructor(public payload: string) {}
}

export class Errors implements Action {
  readonly type = UsersActionTypes.ERRORS;

  constructor(public payload: any) {}
}

export class CreateUserAfterRegisterBegin implements Action {
  readonly type = UsersActionTypes.CREATE_USER_AFTER_REGISTER_BEGIN;

  constructor(public payload: IUserLogin) {}
}
export class CreateUserAfterRegisterSuccess implements Action {
  readonly type = UsersActionTypes.CREATE_USER_AFTER_REGISTER_SUCCESS;
}

export type UsersActions =
  | PlainAction
  | GetAllUsers
  | GetRecentUsers
  | GetRecentUsersComplete
  | CreateUser
  | CreateUserComplete
  | CreateProjectUser
  | CheckIfUserExists
  | Errors
  | CreateUserAfterRegisterBegin
  | CreateUserAfterRegisterSuccess;
