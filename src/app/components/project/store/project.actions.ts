import { Action } from '@ngrx/store';
import { IProject } from './../../../models/project.model';

export enum ProjectActionTypes {
  OPEN_CREATE_PROJECT_MODAL = '[Project] Open Create Project Modal',
  CLOSE_CREATE_PROJECT_MODAL = '[Project] Close Create Project Modal',
  CREATE_PROJECT = '[Project] Create Project',
  CREATE_PROJECT_COMPLETE = '[Project] Create Project Complete',
  EDIT_PROJECT = '[Project] Edit Project',
  PROJECT_ERRORS = '[Project] Project Errors'
}

export class OpenCreateProjectModal implements Action {
  readonly type = ProjectActionTypes.OPEN_CREATE_PROJECT_MODAL;
}

export class CloseCreateProjectModal implements Action {
  readonly type = ProjectActionTypes.CLOSE_CREATE_PROJECT_MODAL;
}

export class CreateProject implements Action {
  readonly type = ProjectActionTypes.CREATE_PROJECT;

  constructor(public payload: { name: string }) {}
}

export class CreateProjectComplete implements Action {
  readonly type = ProjectActionTypes.CREATE_PROJECT_COMPLETE;

  constructor(public payload: IProject) {}
}

export class EditProject implements Action {
  readonly type = ProjectActionTypes.EDIT_PROJECT;

  constructor(public payload: IProject) {}
}

export class ProjectErrors implements Action {
  readonly type = ProjectActionTypes.PROJECT_ERRORS;

  constructor(public payload: any) {}
}

export type ProjectActions =
  | OpenCreateProjectModal
  | CloseCreateProjectModal
  | CreateProject
  | CreateProjectComplete
  | EditProject
  | ProjectErrors;
