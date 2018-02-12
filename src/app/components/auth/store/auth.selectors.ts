import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducers';

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');

export const getIsAuthenticated = createSelector(
  getAuthState,
  (state: fromAuth.AuthState) => state.isAuthenticated
);
