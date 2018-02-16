import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducers';

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');

export const getIsAuthenticated = createSelector(
  getAuthState,
  (state: fromAuth.AuthState) => state.isAuthenticated
);

export const getLoggedInUser = createSelector(
  getAuthState,
  (state: fromAuth.AuthState) => state.loggedInUser
);

export const checkIfEmailVerified = createSelector(
  getAuthState,
  (state: fromAuth.AuthState) => state.loggedInUser.emailVerified
);

export const getErrorMessage = createSelector(
  getAuthState,
  (state: fromAuth.AuthState) => state.errorMessage
);
