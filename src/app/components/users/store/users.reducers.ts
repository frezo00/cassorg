import * as UsersActions from './users.actions';
import { IUser } from '../../../models/user.model';

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
  action: UsersActions.UsersActions
): UsersState {
  switch (action.type) {
    case UsersActions.UsersActionTypes.GET_LOGGED_IN_USER_DATA_SUCCESS: {
      return { ...state, currentUser: action.payload };
    }
    case UsersActions.UsersActionTypes.GET_RECENT_USERS_COMPLETE: {
      return { ...state, recentUsers: action.payload };
    }

    case UsersActions.UsersActionTypes.ERRORS: {
      return { ...state, error: action.payload };
    }

    default: {
      return state;
    }
  }
}
