import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../components/auth/store';
import * as fromUsers from '../components/users/store';

export interface AppState {
  auth: fromAuth.AuthState;
  users: fromUsers.UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  users: fromUsers.usersReducer
};
