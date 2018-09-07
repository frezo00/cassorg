import { MembersActions, MembersActionTypes } from './members.actions';
import { IMember } from '../../../models';

export interface MembersState {
  members: IMember[];
  error: null;
}

const initialState: MembersState = {
  members: null,
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

    default: {
      return state;
    }
  }
}
