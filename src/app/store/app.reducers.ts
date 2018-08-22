import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../components/auth/store';
import * as fromUsers from '../components/users/store';
import * as fromProject from '../components/project/store';
import * as fromCommon from '../components/common/store';

export interface AppState {
  auth: fromAuth.AuthState;
  project: fromProject.ProjectState;
  users: fromUsers.UsersState;
  common: fromCommon.CommonState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  project: fromProject.projectReducer,
  users: fromUsers.usersReducer,
  common: fromCommon.commonReducer
};
