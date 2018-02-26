import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromProject from './project.reducers';

export const getProjectState = createFeatureSelector<fromProject.ProjectState>(
  'project'
);

export const getActiveProject = createSelector(
  getProjectState,
  (state: fromProject.ProjectState) => state.activeProject
);

export const getProjectName = createSelector(
  getProjectState,
  (state: fromProject.ProjectState) => state.activeProject.name
);

export const getProjectAdministrators = createSelector(
  getProjectState,
  (state: fromProject.ProjectState) => state.administrators
);

export const getProjectCategories = createSelector(
  getProjectState,
  (state: fromProject.ProjectState) => state.categories
);

export const getProjectNotifications = createSelector(
  getProjectState,
  (state: fromProject.ProjectState) => state.notifications
);
