import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../components/auth/auth.guard';
import { AdminComponent } from '../components/admin/admin.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { UsersComponent } from '../components/users/users.component';
import { GroupsComponent } from '../components/groups/groups.component';
import { ActivitiesComponent } from '../components/activities/activities.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';
import { AuthComponent } from '../components/auth/auth.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

import { authRoutes } from '../components/auth/auth.routing';
import { ProjectComponent } from '../components/project/project.component';
import { UserAddComponent } from '../components/users/user-add/user-add.component';
import { UserProfileComponent } from '../components/users/user-profile/user-profile.component';
import { ApplicantsComponent } from '../components/applicants/applicants.component';
import { GroupListComponent } from '../components/groups/group-list/group-list.component';
import { GroupNewComponent } from '../components/groups/group-new/group-new.component';
import { GroupEditComponent } from '../components/groups/group-edit/group-edit.component';
import { GroupDetailsComponent } from '../components/groups/group-details/group-details.component';
import { ApplicantListComponent } from '../components/applicants/applicant-list/applicant-list.component';
import { ApplicantProfileComponent } from '../components/applicants/applicant-profile/applicant-profile.component';
import { ApplicantUserFormComponent } from '../components/applicants/applicant-user-form/applicant-user-form.component';
import { MembersComponent } from '../components/members/members.component';
import { MemberListComponent } from '../components/members/member-list/member-list.component';
import { MemberProfileComponent } from '../components/members/member-profile/member-profile.component';
import { MemberNewComponent } from '../components/members/member-new/member-new.component';
import { MemberEditComponent } from '../components/members/member-edit/member-edit.component';
import { CheckFormGuard } from '../guards/check-form.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'members',
        component: MembersComponent,
        children: [
          { path: '', component: MemberListComponent },
          {
            path: 'new',
            component: MemberNewComponent,
            canDeactivate: [CheckFormGuard]
          },
          {
            path: 'edit/:id',
            component: MemberEditComponent,
            canDeactivate: [CheckFormGuard]
          },
          { path: ':id', component: MemberProfileComponent }
        ]
      },
      {
        path: 'applicants',
        component: ApplicantsComponent,
        children: [
          { path: '', component: ApplicantListComponent },
          { path: 'new-user', component: ApplicantUserFormComponent },
          { path: ':id', component: ApplicantProfileComponent }
        ]
      },
      {
        path: 'groups',
        component: GroupsComponent,
        children: [
          { path: '', component: GroupListComponent },
          {
            path: 'new',
            component: GroupNewComponent,
            canDeactivate: [CheckFormGuard]
          },
          {
            path: 'edit/:id',
            component: GroupEditComponent,
            canDeactivate: [CheckFormGuard]
          },
          { path: ':id', component: GroupDetailsComponent }
        ]
      },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'statistics', component: StatisticsComponent }
    ]
  },
  { path: 'auth', component: AuthComponent, children: authRoutes },
  { path: 'project', component: ProjectComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
