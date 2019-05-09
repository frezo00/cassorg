import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MembersState, membersAdapter, GroupsState } from '../reducers';
import { getGroupsState, getGroups } from '../selectors/groups.selectors';

import { IMember, IGroup } from '../../models';

export const getMembersState = createFeatureSelector<MembersState>('members');

/** Helper Entity Selectors for Members **/
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = membersAdapter.getSelectors();

export const selectAllMembers = createSelector(
  getMembersState,
  selectAll
);
export const selectTotalMembers = createSelector(
  getMembersState,
  selectTotal
);
export const selectIdsMembers = createSelector(
  getMembersState,
  selectIds
);

/** Helper Entity Selectors for Members **/
export const getMembers = createSelector(
  selectAllMembers,
  (members: IMember[]) => members
);

export const getCurrentMemberProfile = createSelector(
  getMembersState,
  (state: MembersState) => state.currentMemberProfile
);

export const getCurrentMemberProfileUsername = createSelector(
  getMembersState,
  (state: MembersState) => {
    if (!!state.currentMemberProfile) {
      const firstName = state.currentMemberProfile.firstName
        .toLowerCase()
        .replace(/ /g, '')
        .trim();
      const lastName = state.currentMemberProfile.lastName
        .toLowerCase()
        .replace(/ /g, '')
        .trim();
      return firstName + lastName;
    }
    return null;
  }
);

export const getImagePath = createSelector(
  getMembersState,
  (state: MembersState) => state.imagePath
);

export const getMembersError = createSelector(
  getMembersState,
  (state: MembersState) => state.error
);

export const getAllMembersExceptOne = (id: string) =>
  createSelector(
    getMembers,
    (members: IMember[]): IMember[] =>
      !!members ? members.filter((m: IMember) => m.id !== id) : null
  );

export const getGroupMembers = (membersObj: object) =>
  createSelector(
    getMembers,
    (members: IMember[]): IMember[] =>
      !!members
        ? Object.keys(membersObj).map((id: string) =>
            members.find((m: IMember) => m.id === id)
          )
        : null
  );

export const getMembersGroups = createSelector(
  getMembers,
  getGroups,
  (members: IMember[], groups: IGroup[]): IMember[] =>
    !!members && !!groups
      ? members.map((m: IMember) => findMemberGroups(m, groups))
      : null
);

function findMemberGroups(m: IMember, groups: IGroup[]): IMember {
  return {
    ...m,
    groups: groups
      .filter((group: IGroup) =>
        !!group.members ? group.members[m.id] === true : null
      )
      .filter((g: IGroup) => !!g)
      .map((g: IGroup) => {
        return {
          id: g.id,
          name: g.name,
          color: g.color,
          membersCount: Object.keys(g.members).length
        };
      })
  };
}
