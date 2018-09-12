import { Action } from '@ngrx/store';
import { IMember, ISort } from '../../../models';

export enum MembersActionTypes {
  // Get
  GET_MEMBERS_BEGIN = '[Members] Get Members Begin',
  GET_MEMBERS_SUCCESS = '[Members] Get Members Success',

  // Sort
  SORT_MEMBERS = '[Members] Sort Members',

  // Get Single Member
  GET_SINGLE_MEMBER_BEGIN = '[Members] Get Single Member Begin',
  GET_SINGLE_MEMBER_SUCCESS = '[Members] Get Single Member Success',

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

// Sort
export class SortMembers implements Action {
  readonly type = MembersActionTypes.SORT_MEMBERS;
  constructor(public payload: ISort) {}
}

// Get SINGLE Member
export class GetSingleMemberBegin implements Action {
  readonly type = MembersActionTypes.GET_SINGLE_MEMBER_BEGIN;
  constructor(public payload: string) {}
}
export class GetSingleMemberSuccess implements Action {
  readonly type = MembersActionTypes.GET_SINGLE_MEMBER_SUCCESS;
  constructor(public payload: IMember) {}
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
  | SortMembers
  | GetSingleMemberBegin
  | GetSingleMemberSuccess
  | CreateMemberBegin
  | CreateMemberSuccess
  | SetMembersError;
