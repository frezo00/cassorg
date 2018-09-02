import { GroupsActions, GroupsActionTypes } from './groups.actions';
import { IGroup } from '../../../models';

export interface GroupsState {
  groups: IGroup[];
  errors: any;
}

const initialState: GroupsState = {
  groups: null,
  errors: null
};

export function groupsReducer(
  state = initialState,
  action: GroupsActions
): GroupsState {
  switch (action.type) {
    case GroupsActionTypes.GET_GROUPS_SUCCESS: {
      return { ...state, groups: action.payload };
    }
    case GroupsActionTypes.GROUP__ERRORS: {
      return { ...state, errors: action.payload };
    }

    default: {
      return state;
    }
  }
}
