import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MembersActions, MembersActionTypes } from '../actions';
import { IMember } from '../../models';

export interface MembersState extends EntityState<IMember> {
  // members: IMember[];
  currentMemberProfile: IMember;
  imagePath: string;
  tempProfileImage: any;
  error: any;
}

export const membersAdapter: EntityAdapter<IMember> = createEntityAdapter<
  IMember
>();

const initialState: MembersState = membersAdapter.getInitialState({
  // additional entity state properties
  currentMemberProfile: null,
  imagePath: '',
  tempProfileImage: null,
  error: null
});

export function membersReducer(
  state = initialState,
  action: MembersActions
): MembersState {
  switch (action.type) {
    case MembersActionTypes.GET_MEMBERS_SUCCESS: {
      return membersAdapter.addAll(action.payload, state);
    }
    /* case MembersActionTypes.SORT_MEMBERS: {
      let sortedMembers: IMember[];
      sortedMembers = { ...state }.members.slice().sort((a, b) => {
        if (action.payload.order === 'desc') {
          return a[action.payload.name] > b[action.payload.name] ? -1 : 1;
        }
        return a[action.payload.name] < b[action.payload.name] ? -1 : 1;
      });
      return { ...state, members: sortedMembers };
    } */
    case MembersActionTypes.GET_SINGLE_MEMBER_SUCCESS: {
      return { ...state, currentMemberProfile: action.payload };
    }
    case MembersActionTypes.UPLOAD_PROFILE_IMAGE_SUCCESS: {
      return { ...state, imagePath: action.payload };
    }

    default: {
      return state;
    }
  }
}
