import * as AuthActions from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false
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
    default: {
      return state;
    }
  }
}
