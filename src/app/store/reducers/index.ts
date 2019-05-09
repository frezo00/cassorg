import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export * from './activity.reducer';
export * from './admin.reducer';
export * from './applicants.reducer';
export * from './auth.reducer';
export * from './common.reducer';
export * from './groups.reducer';
export * from './members.reducer';
export * from './project.reducer';
export * from './users.reducer';

import * as fromActivities from './activity.reducer';
import * as fromAdmin from './admin.reducer';
import * as fromApplicants from './applicants.reducer';
import * as fromAuth from './auth.reducer';
import * as fromCommon from './common.reducer';
import * as fromGroups from './groups.reducer';
import * as fromMembers from './members.reducer';
import * as fromProject from './project.reducer';
import * as fromUsers from './users.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
  project: fromProject.ProjectState;
  users: fromUsers.UsersState;
  applicants: fromApplicants.ApplicantsState;
  members: fromMembers.MembersState;
  groups: fromGroups.GroupsState;
  common: fromCommon.CommonState;
  activities: fromActivities.ActivitiesState;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  project: fromProject.projectReducer,
  users: fromUsers.usersReducer,
  applicants: fromApplicants.applicantsReducer,
  members: fromMembers.membersReducer,
  groups: fromGroups.groupsReducer,
  common: fromCommon.commonReducer,
  activities: fromActivities.activitiesReducer,
  router: routerReducer
};
