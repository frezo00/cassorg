import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducers';

export const getUsersState = createFeatureSelector<UsersState>('users');

export const getCurrentUser = createSelector(
  getUsersState,
  (state: UsersState) => state.currentUser
);

export const getApplicants = createSelector(
  getUsersState,
  (state: UsersState) => state.applicants
);

export const getAllUsers = createSelector(
  getUsersState,
  (state: UsersState) => state.recentUsers
);

export const getRecentUsers = createSelector(
  getUsersState,
  (state: UsersState) => state.recentUsers
);

export const getError = createSelector(
  getUsersState,
  (state: UsersState) => state.error
);
