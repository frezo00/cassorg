import { AdminActions, AdminActionTypes } from '../actions';
import { IUser } from '../../models';

export interface AdminState {
  admin: IUser;
}

const initialState: AdminState = {
  admin: null
};

export function reducer(
  state = initialState,
  action: AdminActions
): AdminState {
  switch (action.type) {
    case AdminActionTypes.CREATE_ADMIN: {
      return {
        ...state
      };
    }

    default: {
      return state;
    }
  }
}
