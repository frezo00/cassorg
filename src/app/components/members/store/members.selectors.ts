import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MembersState } from './members.reducers';
import { IMember, IGroup } from '../../../models';
import { getGroupsState, GroupsState } from '../../groups/store';

export const getMembersState = createFeatureSelector<MembersState>('members');

export const getMembers = createSelector(
  getMembersState,
  (state: MembersState) => state.members
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
    getMembersState,
    (state: MembersState): IMember[] =>
      !!state.members ? state.members.filter((m: IMember) => m.id !== id) : null
  );

export const getGroupMembers = (membersObj: object) =>
  createSelector(
    getMembersState,
    (state: MembersState): IMember[] =>
      !!state.members
        ? Object.keys(membersObj).map((id: string) =>
            state.members.find((m: IMember) => m.id === id)
          )
        : null
  );

export const getMembersGroups = createSelector(
  getMembersState,
  getGroupsState,
  (membersState: MembersState, groupsState: GroupsState): IMember[] =>
    !!membersState.members && !!groupsState.groups
      ? membersState.members.map((m: IMember) =>
          findMemberGroups(m, groupsState.groups)
        )
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
