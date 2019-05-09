import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AdminState } from '../reducers';

export const getAdminState = createFeatureSelector<AdminState>('admin');

export const getActiveAdmin = createSelector(
  getAdminState,
  (state: AdminState) => state.admin
);
