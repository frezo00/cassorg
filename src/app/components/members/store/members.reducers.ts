import { MembersActions, MembersActionTypes } from './members.actions';
import { IMember } from '../../../models';

export interface MembersState {
  members: IMember[];
  currentMemberProfile: IMember;
  error: null;
}

const initialState: MembersState = {
  members: null,
  currentMemberProfile: null,
  error: null
};

export function membersReducer(
  state = initialState,
  action: MembersActions
): MembersState {
  switch (action.type) {
    case MembersActionTypes.GET_MEMBERS_SUCCESS: {
      return { ...state, members: action.payload };
    }
    case MembersActionTypes.SORT_MEMBERS: {
      let sortedMembers: IMember[];
      sortedMembers = { ...state }.members.slice().sort((a, b) => {
        if (action.payload.order === 'desc') {
          return a[action.payload.name] > b[action.payload.name] ? -1 : 1;
        }
        return a[action.payload.name] < b[action.payload.name] ? -1 : 1;
      });
      return { ...state, members: sortedMembers };
    }
    case MembersActionTypes.GET_SINGLE_MEMBER_SUCCESS: {
      return { ...state, currentMemberProfile: action.payload };
    }

    default: {
      return state;
    }
  }
}
