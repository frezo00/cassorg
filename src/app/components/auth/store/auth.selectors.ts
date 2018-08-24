import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducers';

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');

export const getUserLoginData = createSelector(
  getAuthState,
  (state: fromAuth.AuthState) => state.userLoginData
);

export const getAuthErrors = createSelector(
  getAuthState,
  (state: fromAuth.AuthState) => state.authError
);

export const checkIfEmailVerified = createSelector(
  getAuthState,
  (state: fromAuth.AuthState) => state.emailVerified
);
