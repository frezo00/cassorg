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

  // Update
  UPDATE_MEMBER_BEGIN = '[Members] Update Member Begin',
  UPDATE_MEMBER_SUCCESS = '[Members] Update Member Success',

  // Upload Profile Image
  UPLOAD_PROFILE_IMAGE_BEGIN = '[Members] Upload Profile Image Begin',
  UPLOAD_PROFILE_IMAGE_SUCCESS = '[Members] Upload Profile Image Success',

  // Update Member Profile Image
  UPDATE_MEMBER_PROFILE_IMAGE_BEGIN = '[Members] Update Member Profile Image Begin',
  UPDATE_MEMBER_PROFILE_IMAGE_SUCCESS = '[Members] Update Member Profile Image Success',

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
  constructor(public payload: { member: IMember; hasImage?: boolean }) {}
}
export class CreateMemberSuccess implements Action {
  readonly type = MembersActionTypes.CREATE_MEMBER_SUCCESS;
}

// Update
export class UpdateMemberBegin implements Action {
  readonly type = MembersActionTypes.UPDATE_MEMBER_BEGIN;
  constructor(
    public payload: { id: string; memberData: IMember; hasImage?: boolean }
  ) {}
}
export class UpdateMemberSuccess implements Action {
  readonly type = MembersActionTypes.UPDATE_MEMBER_SUCCESS;
}

// Upload Profile Image
export class UploadProfileImageBegin implements Action {
  readonly type = MembersActionTypes.UPLOAD_PROFILE_IMAGE_BEGIN;
  constructor(public payload: any) {}
}
export class UploadProfileImageSuccess implements Action {
  readonly type = MembersActionTypes.UPLOAD_PROFILE_IMAGE_SUCCESS;
  constructor(public payload: string) {}
}

// Update Member Profile Image
export class UpdateMemberProfileImageBegin implements Action {
  readonly type = MembersActionTypes.UPDATE_MEMBER_PROFILE_IMAGE_BEGIN;
  constructor(public payload: { id: string; photoURL: string }) {}
}
export class UpdateMemberProfileImageSuccess implements Action {
  readonly type = MembersActionTypes.UPDATE_MEMBER_PROFILE_IMAGE_SUCCESS;
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
  | UpdateMemberBegin
  | UpdateMemberSuccess
  | UploadProfileImageBegin
  | UploadProfileImageSuccess
  | UpdateMemberProfileImageBegin
  | UpdateMemberProfileImageSuccess
  | SetMembersError;
