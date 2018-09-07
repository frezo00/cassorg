import { Action } from '@ngrx/store';
import { IMember } from '../../../models';

export enum MembersActionTypes {
  // Get
  GET_MEMBERS_BEGIN = '[Members] Get Members Begin',
  GET_MEMBERS_SUCCESS = '[Members] Get Members Success',

  // Create
  CREATE_MEMBER_BEGIN = '[Members] Create Member Begin',
  CREATE_MEMBER_SUCCESS = '[Members] Create Member Success',

  // Error
  SET_MEMBERS_ERROR = '[Members] Set Members Error'
}

// Get
export class GetMembersBegin implements Action {
  readonly type = MembersActionTypes.GET_MEMBERS_BEGIN;
}
export class GetMembersSuccess implements Action {
  readonly type = MembersActionTypes.GET_MEMBERS_SUCCESS;
  constructor(public payload: IMember[]) {}
}

// Create
export class CreateMemberBegin implements Action {
  readonly type = MembersActionTypes.CREATE_MEMBER_BEGIN;
  constructor(public payload: IMember) {}
}
export class CreateMemberSuccess implements Action {
  readonly type = MembersActionTypes.CREATE_MEMBER_SUCCESS;
}

// Error
export class SetMembersError implements Action {
  readonly type = MembersActionTypes.SET_MEMBERS_ERROR;
  constructor(public payload: any) {}
}

export type MembersActions =
  | GetMembersBegin
  | GetMembersSuccess
  | CreateMemberBegin
  | CreateMemberSuccess
  | SetMembersError;
