import * as AuthActions from './auth.actions';
import { IUser } from '../../../models/user.model';

export interface AuthState {
  isAuthenticated: boolean;
  loggedInUser: IUser;
  errorMessage: string;
  registerErrorMessage: string;
  loginErrorMessage: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loggedInUser: null,
  errorMessage: '',
  registerErrorMessage: '',
  loginErrorMessage: ''
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
    case AuthActions.AuthActionTypes.SAVE_LOGGED_IN_USER_COMPLETE: {
      return { ...state, loggedInUser: action.payload };
    }
    case AuthActions.AuthActionTypes.UPDATE_USER_PROFILE_COMPLETE: {
      const user = { ...state.loggedInUser };
      user.displayName = action.payload.displayName;
      user.photoURL = action.payload.photoURL;
      return { ...state, loggedInUser: user };
    }
    case AuthActions.AuthActionTypes.ERRORS: {
      return {
        ...state,
        errorMessage: action.payload ? action.payload.message : null
      };
    }
    case AuthActions.AuthActionTypes.REMOVE_ERRORS: {
      return { ...state, loginErrorMessage: '', registerErrorMessage: '' };
    }
    case AuthActions.AuthActionTypes.SET_LOGIN_ERROR: {
      let message = '';
      switch (action.payload.code) {
        case 'auth/invalid-email':
          message = 'Neispravan email.';
          break;
        case 'auth/user-disabled':
          message = 'Korisnik blokiran.';
          break;
        case 'auth/user-not-found':
          message = 'Korisnik nije pronađen.';
          break;
        case 'auth/wrong-password':
          message = 'Pogrešna lozinka.';
          break;
        default:
          break;
      }
      return { ...state, loginErrorMessage: message };
    }
    case AuthActions.AuthActionTypes.SET_REGISTER_ERROR: {
      let message = '';
      switch (action.payload.code) {
        case 'auth/email-already-in-use':
          message = 'Ovaj email se već koristi.';
          break;
        case 'auth/invalid-email':
          message = 'Neispravan email.';
          break;
        case 'auth/operation-not-allowed':
          message = 'Operacija nije dopuštena.';
          break;
        case 'auth/weak-password':
          message = 'Preslaba lozinka.';
          break;
        default:
          break;
      }
      return { ...state, registerErrorMessage: message };
    }
    default: {
      return state;
    }
  }
}
