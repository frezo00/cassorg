import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAdmin from './admin.reducers';

export const getAdminState = createFeatureSelector<fromAdmin.AdminState>(
  'Admin'
);

export const getActiveAdmin = createSelector(
  getAdminState,
  (state: fromAdmin.AdminState) => state.admin
);
