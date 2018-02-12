import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../components/auth/store';

export interface AppState {
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer
};
