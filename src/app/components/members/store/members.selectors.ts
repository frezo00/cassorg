import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MembersState } from './members.reducers';

export const getMembersState = createFeatureSelector<MembersState>('members');

export const getMembers = createSelector(
  getMembersState,
  (state: MembersState) => state.members
);

export const getCurrentMemberProfile = createSelector(
  getMembersState,
  (state: MembersState) => state.currentMemberProfile
);

export const getMembersError = createSelector(
  getMembersState,
  (state: MembersState) => state.error
);
