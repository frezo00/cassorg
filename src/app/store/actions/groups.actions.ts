import { Action } from '@ngrx/store';

import { IGroup } from '../../models';

export enum GroupsActionTypes {
  // Create
  CREATE_GROUP_BEGIN = '[Groups] Create Group Begin',
  CREATE_GROUP_SUCCESS = '[Groups] Create Group Success',

  // Get
  GET_GROUPS_BEGIN = '[Groups] Get Groups Begin',
  GET_GROUPS_SUCCESS = '[Groups] Get Groups Success',

  // Get SINGLE Group
  GET_SINGLE_GROUP_BEGIN = '[Groups] Get Single Group Begin',
  GET_SINGLE_GROUP_SUCCESS = '[Groups] Get Single Group Success',

  // Update Group
  UPDATE_GROUP_BEGIN = '[Groups] Update Group Begin',
  UPDATE_GROUP_SUCCESS = '[Groups] Update Group Success',

  // Update Group Members
  UPDATE_GROUP_MEMBERS_BEGIN = '[Groups] Update Members Group Begin',
  UPDATE_GROUP_MEMBERS_SUCCESS = '[Groups] Update Group Members Success',

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
  constructor(public payload: string) {}
}
export class GetGroupsSuccess implements Action {
  readonly type = GroupsActionTypes.GET_GROUPS_SUCCESS;
  constructor(public payload: IGroup[]) {}
}

// Get SINGLE Group
export class GetSingleGroupBegin implements Action {
  readonly type = GroupsActionTypes.GET_SINGLE_GROUP_BEGIN;
  constructor(public payload: string) {}
}
export class GetSingleGroupSuccess implements Action {
  readonly type = GroupsActionTypes.GET_SINGLE_GROUP_SUCCESS;
  constructor(public payload: IGroup) {}
}

// Update Group
export class UpdateGroupBegin implements Action {
  readonly type = GroupsActionTypes.UPDATE_GROUP_BEGIN;
  constructor(public payload: { id: string; groupData: IGroup }) {}
}
export class UpdateGroupSuccess implements Action {
  readonly type = GroupsActionTypes.UPDATE_GROUP_SUCCESS;
  constructor(public payload: IGroup) {}
}

// Update Group Members
export class UpdateGroupMembersBegin implements Action {
  readonly type = GroupsActionTypes.UPDATE_GROUP_MEMBERS_BEGIN;
  constructor(
    public payload: {
      groupId: string;
      memberObj: { mId: string; set: boolean };
    }
  ) {}
}
export class UpdateGroupMembersSuccess implements Action {
  readonly type = GroupsActionTypes.UPDATE_GROUP_MEMBERS_SUCCESS;
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
  | GetSingleGroupBegin
  | GetSingleGroupSuccess
  | UpdateGroupBegin
  | UpdateGroupSuccess
  | UpdateGroupMembersBegin
  | UpdateGroupMembersSuccess
  | GroupErrors;
