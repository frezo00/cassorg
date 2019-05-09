import * as fromActivities from './activities.effects';
import * as fromAdmin from './admin.effects';
import * as fromApplicants from './applicants.effects';
import * as fromAuth from './auth.effects';
import * as fromCommon from './common.effects';
import * as fromGroups from './groups.effects';
import * as fromMembers from './members.effects';
import * as fromNavigation from './navigation.effects';
import * as fromProject from './project.effects';
import * as fromUsers from './users.effects';

export const effects: any[] = [
  fromActivities.ActivitiesEffects,
  fromApplicants.ApplicantsEffects,
  fromAuth.AuthEffects,
  fromCommon.CommonEffects,
  fromGroups.GroupsEffects,
  fromMembers.MembersEffects,
  fromNavigation.NavigationEffects,
  fromProject.ProjectEffects,
  fromUsers.UsersEffects
];
