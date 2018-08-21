import * as AdminActions from './admin.actions';
import { IUser } from '../../../models';

export interface AdminState {
  admin: IUser;
}

const initialState: AdminState = {
  admin: null
};

export function reducer(
  state = initialState,
  action: AdminActions.AdminActions
): AdminState {
  switch (action.type) {
    case AdminActions.AdminActionTypes.CREATE_ADMIN: {
      return {
        ...state
      };
    }

    default: {
      return state;
    }
  }
}
