import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupsState, groupsAdapter } from '../reducers';
import { IGroup } from '../../models';

export const getGroupsState = createFeatureSelector<GroupsState>('groups');

/** Helper Entity Selectors for Groups **/
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = groupsAdapter.getSelectors();

export const selectAllGroups = createSelector(
  getGroupsState,
  selectAll
);
export const selectTotalGroups = createSelector(
  getGroupsState,
  selectTotal
);
export const selectIdsGroups = createSelector(
  getGroupsState,
  selectIds
);

/** Custom Selectors for Groups **/
export const getGroups = createSelector(
  selectAllGroups,
  (groups: IGroup[]) => groups
);

export const getSingleGroup = (id: string) =>
  createSelector(
    selectAllGroups,
    (groups: IGroup[]): IGroup =>
      !!groups ? groups.find((g: IGroup) => g.id === id) : null
  );

export const getMemberGroups = (memberId: string) =>
  createSelector(
    selectAllGroups,
    (groups: IGroup[]): IGroup[] =>
      !!groups ? groups.filter(g => g.members[memberId] === true) : null
  );
