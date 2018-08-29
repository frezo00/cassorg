import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUsers from './users.reducers';

export const getUsersState = createFeatureSelector<fromUsers.UsersState>(
  'users'
);

export const getApplicants = createSelector(
  getUsersState,
  (state: fromUsers.UsersState) => state.applicants
);

export const getAllUsers = createSelector(
  getUsersState,
  (state: fromUsers.UsersState) => state.recentUsers
);

export const getRecentUsers = createSelector(
  getUsersState,
  (state: fromUsers.UsersState) => state.recentUsers
);

export const getError = createSelector(
  getUsersState,
  (state: fromUsers.UsersState) => state.error
);
