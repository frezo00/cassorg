import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ApplicantsState } from '../reducers';

export const getApplicantsState = createFeatureSelector<ApplicantsState>(
  'applicants'
);

export const getApplicants = createSelector(
  getApplicantsState,
  (state: ApplicantsState) => state.applicants
);

export const getCurrentApplicantProfile = createSelector(
  getApplicantsState,
  (state: ApplicantsState) => state.currentApplicantProfile
);
