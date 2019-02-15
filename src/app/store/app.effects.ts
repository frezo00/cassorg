import { AuthEffects } from '../components/auth/store';
import { RouterEffects } from '../router/store';
import { UsersEffects } from '../components/users/store';
import { ProjectEffects } from '../components/project/store';
import { MembersEffects } from '../components/members/store';
import { GroupsEffects } from '../components/groups/store';
import { ApplicantsEffects } from '../components/applicants/store';
import { CommonEffects } from '../components/common/store';
import { ActivitiesEffects } from '../components/activities/store';

export const effects: any[] = [
  AuthEffects,
  RouterEffects,
  UsersEffects,
  ProjectEffects,
  MembersEffects,
  GroupsEffects,
  ApplicantsEffects,
  CommonEffects,
  ActivitiesEffects
];
