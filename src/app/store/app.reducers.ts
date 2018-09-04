import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../components/auth/store';
import * as fromUsers from '../components/users/store';
import * as fromApplicants from '../components/applicants/store';
import * as fromGroups from '../components/groups/store';
import * as fromProject from '../components/project/store';
import * as fromCommon from '../components/common/store';

export interface AppState {
  auth: fromAuth.AuthState;
  project: fromProject.ProjectState;
  users: fromUsers.UsersState;
  applicants: fromApplicants.ApplicantsState;
  groups: fromGroups.GroupsState;
  common: fromCommon.CommonState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  project: fromProject.projectReducer,
  users: fromUsers.usersReducer,
  applicants: fromApplicants.applicantsReducer,
  groups: fromGroups.groupsReducer,
  common: fromCommon.commonReducer
};
