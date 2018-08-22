import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCommon from './common.reducers';

export const getCommonState = createFeatureSelector<fromCommon.CommonState>(
  'common'
);

export const getShowLoading = createSelector(
  getCommonState,
  (state: fromCommon.CommonState) => state.showLoading
);
