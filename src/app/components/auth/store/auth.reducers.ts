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
  state = initialState,
  action: AuthActions.AuthActions
): AuthState {
  switch (action.type) {
    case AuthActions.AuthActionTypes.SAVE_USER_LOGIN_DATA_SUCCESS: {
      return { ...state, userLoginData: action.payload };
    }
    case AuthActions.AuthActionTypes.CHECK_IF_EMAIL_VERIFIED_SUCCESS: {
      return { ...state, emailVerified: action.payload };
    }
    /* case AuthActions.AuthActionTypes.UPDATE_USER_PROFILE_COMPLETE: {
      const user = { ...state.loggedInUser };
      user.displayName = action.payload.displayName;
      user.photoURL = action.payload.photoURL;
      return { ...state, loggedInUser: user };
    } */
    case AuthActions.AuthActionTypes.SET_ERRORS: {
      return {
        ...state,
        authError: firebaseAuthErrorHandler(action.payload.code)
      };
    }
    case AuthActions.AuthActionTypes.REMOVE_ERRORS: {
      return { ...state, authError: null };
    }
    default: {
      return state;
    }
  }
}
