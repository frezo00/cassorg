import { Action } from '@ngrx/store';

import { IActivity } from '../../models';

export enum ActivitiesActionTypes {
  // Create
  CREATE_ACTIVITY_BEGIN = '[Activities] Create Activity Begin',
  CREATE_ACTIVITY_SUCCESS = '[Activities] Create Activity Success',

  // Get
  GET_ACTIVITIES_BEGIN = '[Activities] Get Activities Begin',
  GET_ACTIVITIES_SUCCESS = '[Activities] Get Activities Success',

  // Get SINGLE Activity
  GET_SINGLE_ACTIVITY_BEGIN = '[Activities] Get Single Activity Begin',
  GET_SINGLE_ACTIVITY_SUCCESS = '[Activities] Get Single Activity Success',

  // Update Activity
  UPDATE_ACTIVITY_BEGIN = '[Activities] Update Activity Begin',
  UPDATE_ACTIVITY_SUCCESS = '[Activities] Update Activity Success',

  // Update Activity Members
  UPDATE_ACTIVITY_MEMBERS_BEGIN = '[Activities] Update Members Activity Begin',
  UPDATE_ACTIVITY_MEMBERS_SUCCESS = '[Activities] Update Activity Members Success',

  // Errors
  ACTIVITY__ERRORS = '[Activities] Activity Errors'
}

// Create
export class CreateActivityBegin implements Action {
  readonly type = ActivitiesActionTypes.CREATE_ACTIVITY_BEGIN;
  constructor(public payload: IActivity) {}
}
export class CreateActivitySuccess implements Action {
  readonly type = ActivitiesActionTypes.CREATE_ACTIVITY_SUCCESS;
}

// Get
export class GetActivitiesBegin implements Action {
  readonly type = ActivitiesActionTypes.GET_ACTIVITIES_BEGIN;
  constructor(public payload: string) {}
}
export class GetActivitiesSuccess implements Action {
  readonly type = ActivitiesActionTypes.GET_ACTIVITIES_SUCCESS;
  constructor(public payload: IActivity[]) {}
}

// Get SINGLE Activity
export class GetSingleActivityBegin implements Action {
  readonly type = ActivitiesActionTypes.GET_SINGLE_ACTIVITY_BEGIN;
  constructor(public payload: string) {}
}
export class GetSingleActivitySuccess implements Action {
  readonly type = ActivitiesActionTypes.GET_SINGLE_ACTIVITY_SUCCESS;
  constructor(public payload: IActivity) {}
}

// Update Activity
export class UpdateActivityBegin implements Action {
  readonly type = ActivitiesActionTypes.UPDATE_ACTIVITY_BEGIN;
  constructor(public payload: { id: string; groupData: IActivity }) {}
}
export class UpdateActivitySuccess implements Action {
  readonly type = ActivitiesActionTypes.UPDATE_ACTIVITY_SUCCESS;
  constructor(public payload: IActivity) {}
}

// Update Activity Members
export class UpdateActivityMembersBegin implements Action {
  readonly type = ActivitiesActionTypes.UPDATE_ACTIVITY_MEMBERS_BEGIN;
  constructor(
    public payload: {
      groupId: string;
      memberObj: { mId: string; set: boolean };
    }
  ) {}
}
export class UpdateActivityMembersSuccess implements Action {
  readonly type = ActivitiesActionTypes.UPDATE_ACTIVITY_MEMBERS_SUCCESS;
}

// Errors
export class ActivityErrors implements Action {
  readonly type = ActivitiesActionTypes.ACTIVITY__ERRORS;
  constructor(public payload: any) {}
}

export type ActivitiesActions =
  | CreateActivityBegin
  | CreateActivitySuccess
  | GetActivitiesBegin
  | GetActivitiesSuccess
  | GetSingleActivityBegin
  | GetSingleActivitySuccess
  | UpdateActivityBegin
  | UpdateActivitySuccess
  | UpdateActivityMembersBegin
  | UpdateActivityMembersSuccess
  | ActivityErrors;
