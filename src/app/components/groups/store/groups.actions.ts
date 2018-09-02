import { Action } from '@ngrx/store';

import { IGroup } from '../../../models';

export enum GroupsActionTypes {
  // Create
  CREATE_GROUP_BEGIN = '[Groups] Create Group Begin',
  CREATE_GROUP_SUCCESS = '[Groups] Create Group Success',

  // Get
  GET_GROUPS_BEGIN = '[Groups] Get Groups Begin',
  GET_GROUPS_SUCCESS = '[Groups] Get Groups Success',

  // Errors
  GROUP__ERRORS = '[Groups] Group Errors'
}

// Create
export class CreateGroupBegin implements Action {
  readonly type = GroupsActionTypes.CREATE_GROUP_BEGIN;
  constructor(public payload: IGroup) {}
}
export class CreateGroupSuccess implements Action {
  readonly type = GroupsActionTypes.CREATE_GROUP_SUCCESS;
}

// Get
export class GetGroupsBegin implements Action {
  readonly type = GroupsActionTypes.GET_GROUPS_BEGIN;
}
export class GetGroupsSuccess implements Action {
  readonly type = GroupsActionTypes.GET_GROUPS_SUCCESS;
  constructor(public payload: IGroup[]) {}
}

// Errors
export class GroupErrors implements Action {
  readonly type = GroupsActionTypes.GROUP__ERRORS;
  constructor(public payload: any) {}
}

export type GroupsActions =
  | CreateGroupBegin
  | CreateGroupSuccess
  | GetGroupsBegin
  | GetGroupsSuccess
  | GroupErrors;
