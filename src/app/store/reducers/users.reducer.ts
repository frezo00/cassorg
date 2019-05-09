import { UsersActions, UsersActionTypes } from '../actions';
import { IUser } from '../../models';

export interface UsersState {
  currentUser: IUser;
  allUsers: IUser[];
  recentUsers: IUser[];
  error: string;
}

const initialState: UsersState = {
  currentUser: null,
  allUsers: null,
  recentUsers: null,
  error: null
};

export function usersReducer(
  state = initialState,
  action: UsersActions
): UsersState {
  switch (action.type) {
    case UsersActionTypes.GET_LOGGED_IN_USER_DATA_SUCCESS: {
      return { ...state, currentUser: action.payload };
    }
    case UsersActionTypes.GET_RECENT_USERS_COMPLETE: {
      return { ...state, recentUsers: action.payload };
    }

    case UsersActionTypes.ERRORS: {
      return { ...state, error: action.payload };
    }

    default: {
      return state;
    }
  }
}
