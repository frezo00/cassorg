import { Action } from '@ngrx/store';
import { IUser } from '../../models';

export enum AdminActionTypes {
  CREATE_ADMIN = '[Admin] Create Admin',
  UPDATE_ADMIN_PROJECTS = '[Admin] Update Admin Projects'
}

export class CreateAdmin implements Action {
  readonly type = AdminActionTypes.CREATE_ADMIN;

  constructor(public payload: IUser) {}
}

export class UpdateAdminProjects implements Action {
  readonly type = AdminActionTypes.UPDATE_ADMIN_PROJECTS;

  constructor(public payload: any) {}
}

export type AdminActions = CreateAdmin | UpdateAdminProjects;
