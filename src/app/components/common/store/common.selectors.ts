import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CommonState } from './common.reducers';

export const getCommonState = createFeatureSelector<CommonState>('common');

export const getShowLoading = createSelector(
  getCommonState,
  (state: CommonState) => state.showLoading
);

export const getModal = createSelector(
  getCommonState,
  (state: CommonState) => state.modal
);
