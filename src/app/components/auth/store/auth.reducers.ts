import * as AuthActions from './auth.actions';
import { IUser } from '../../../models/user.model';

export interface AuthState {
  isAuthenticated: boolean;
  loggedInUser: IUser;
  errorMessage: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loggedInUser: null,
  errorMessage: null
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
): AuthState {
  switch (action.type) {
    case AuthActions.AuthActionTypes.SET_AUTHENTICATED: {
      return { ...state, isAuthenticated: true };
    }
    case AuthActions.AuthActionTypes.SET_UNAUTHENTICATED: {
      return { ...state, isAuthenticated: false };
    }
    case AuthActions.AuthActionTypes.SAVE_LOGGED_IN_USER: {
      return { ...state, loggedInUser: action.payload };
    }
    case AuthActions.AuthActionTypes.ERRORS: {
      return {
        ...state,
        errorMessage: action.payload ? action.payload.message : null
      };
    }
    default: {
      return state;
    }
  }
}
