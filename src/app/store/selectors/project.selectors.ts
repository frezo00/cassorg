import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProjectState } from '../reducers';

export const getProjectState = createFeatureSelector<ProjectState>('project');

export const getActiveProject = createSelector(
  getProjectState,
  (state: ProjectState) => state.activeProject
);

export const getProjectName = createSelector(
  getProjectState,
  (state: ProjectState) => state.activeProject.name
);

export const getProjectAdministrators = createSelector(
  getProjectState,
  (state: ProjectState) => state.administrators
);

export const getProjectCategories = createSelector(
  getProjectState,
  (state: ProjectState) => state.categories
);

export const getProjectNotifications = createSelector(
  getProjectState,
  (state: ProjectState) => state.notifications
);
