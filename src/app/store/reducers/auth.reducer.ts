import { AuthActions, AuthActionTypes } from '../actions';
import { AuthError, IUserLogin } from '../../models';
import { firebaseAuthErrorHandler } from '../../shared/errors.handler';

export interface AuthState {
  userLoginData: IUserLogin;
  authError: AuthError;
  emailVerified: boolean;
}

const initialState: AuthState = {
  userLoginData: null,
  authError: null,
  emailVerified: false
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.SAVE_USER_LOGIN_DATA_SUCCESS: {
      return { ...state, userLoginData: action.payload, authError: null };
    }
    case AuthActionTypes.CHECK_IF_EMAIL_VERIFIED_SUCCESS: {
      return { ...state, emailVerified: action.payload, authError: null };
    }
    case AuthActionTypes.REMOVE_ERRORS: {
      return { ...state, authError: null };
    }
    case AuthActionTypes.SET_ERRORS: {
      return {
        ...state,
        authError: firebaseAuthErrorHandler(action.payload.code)
      };
    }
    default: {
      return state;
    }
  }
}
