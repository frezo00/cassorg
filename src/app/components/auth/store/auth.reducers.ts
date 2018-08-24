import * as AuthActions from './auth.actions';
import { IUserLogin } from '../../../models/user.model';
import { AuthError } from '../../../models';
import { firebaseAuthErrorHandler } from '../../common/errors.handler';

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
  action: AuthActions.AuthActions
): AuthState {
  switch (action.type) {
    case AuthActions.AuthActionTypes.SAVE_USER_LOGIN_DATA_SUCCESS: {
      return { ...state, userLoginData: action.payload, authError: null };
    }
    case AuthActions.AuthActionTypes.CHECK_IF_EMAIL_VERIFIED_SUCCESS: {
      return { ...state, emailVerified: action.payload, authError: null };
    }
    case AuthActions.AuthActionTypes.REMOVE_ERRORS: {
      return { ...state, authError: null };
    }
    case AuthActions.AuthActionTypes.SET_ERRORS: {
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
