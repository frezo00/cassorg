import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupsState } from './groups.reducers';
import { IGroup } from '../../../models';

export const getGroupsState = createFeatureSelector<GroupsState>('groups');

export const getGroups = createSelector(
  getGroupsState,
  (state: GroupsState) => state.groups
);

export const getSingleGroup = (id: string) =>
  createSelector(
    getGroupsState,
    (state: GroupsState): IGroup =>
      !!state.groups ? state.groups.find(g => g.id === id) : null
  );

export const getMemberGroups = (memberId: string) =>
  createSelector(
    getGroupsState,
    (state: GroupsState): IGroup[] =>
      !!state.groups
        ? state.groups.filter(g => g.members[memberId] === true)
        : null
  );
