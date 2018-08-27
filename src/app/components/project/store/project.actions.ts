import { Action } from '@ngrx/store';
import { IProject } from './../../../models/project.model';

export enum ProjectActionTypes {
  // Get Project
  GET_PROJECT_BEGIN = '[Project] Get Project Begin',
  GET_PROJECT_SUCCESS = '[Project] Get Project Success',

  EDIT_PROJECT = '[Project] Edit Project',
  CREATE_PROJECT = '[Project] Create Project',
  CREATE_PROJECT_COMPLETE = '[Project] Create Project Complete',
  OPEN_CREATE_PROJECT_MODAL = '[Project] Open Create Project Modal',
  CLOSE_CREATE_PROJECT_MODAL = '[Project] Close Create Project Modal',
  PROJECT_ERRORS = '[Project] Project Errors'
}

// Get Project
export class GetProjectBegin implements Action {
  readonly type = ProjectActionTypes.GET_PROJECT_BEGIN;
  constructor(public payload: string) {}
}
export class GetProjectSuccess implements Action {
  readonly type = ProjectActionTypes.GET_PROJECT_SUCCESS;
  constructor(public payload: IProject) {}
}

export class EditProject implements Action {
  readonly type = ProjectActionTypes.EDIT_PROJECT;

  constructor(public payload: IProject) {}
}

export class CreateProject implements Action {
  readonly type = ProjectActionTypes.CREATE_PROJECT;

  constructor(public payload: { name: string; tag: string }) {}
}

export class CreateProjectComplete implements Action {
  readonly type = ProjectActionTypes.CREATE_PROJECT_COMPLETE;

  constructor(public payload: IProject) {}
}

export class OpenCreateProjectModal implements Action {
  readonly type = ProjectActionTypes.OPEN_CREATE_PROJECT_MODAL;
}

export class CloseCreateProjectModal implements Action {
  readonly type = ProjectActionTypes.CLOSE_CREATE_PROJECT_MODAL;
}

export class ProjectErrors implements Action {
  readonly type = ProjectActionTypes.PROJECT_ERRORS;

  constructor(public payload: any) {}
}

export type ProjectActions =
  | GetProjectBegin
  | GetProjectSuccess
  | OpenCreateProjectModal
  | CloseCreateProjectModal
  | CreateProject
  | CreateProjectComplete
  | EditProject
  | ProjectErrors;
