import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '../reducers';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getUserLoginData = createSelector(
  getAuthState,
  (state: AuthState) => state.userLoginData
);

export const getAuthErrors = createSelector(
  getAuthState,
  (state: AuthState) => state.authError
);

export const checkIfEmailVerified = createSelector(
  getAuthState,
  (state: AuthState) => state.emailVerified
);
