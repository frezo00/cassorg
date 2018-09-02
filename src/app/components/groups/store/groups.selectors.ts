import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupsState } from './groups.reducers';

export const getGroupsState = createFeatureSelector<GroupsState>('groups');

export const getGroups = createSelector(
  getGroupsState,
  (state: GroupsState) => state.groups
);
