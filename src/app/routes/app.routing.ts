import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesModule } from '../components/activities/activities.module';
import { AdminComponent } from '../components/admin/admin.component';
import { ApplicantListComponent } from '../components/applicants/applicant-list/applicant-list.component';
import { ApplicantProfileComponent } from '../components/applicants/applicant-profile/applicant-profile.component';
import { ApplicantUserFormComponent } from '../components/applicants/applicant-user-form/applicant-user-form.component';
import { ApplicantsComponent } from '../components/applicants/applicants.component';
import { AuthComponent } from '../components/auth/auth.component';
import { PageNotFoundComponent } from '../components/common/page-not-found/page-not-found.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { GroupsModule } from '../components/groups/groups.module';
import { MembersModule } from '../components/members/members.module';
import { ProjectComponent } from '../components/project/project.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';
import { AuthGuard } from '../guards/auth.guard';
import { authRoutes } from './auth.routing';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'members', loadChildren: () => MembersModule },
      { path: 'groups', loadChildren: () => GroupsModule },
      { path: 'activities', loadChildren: () => ActivitiesModule },
      { path: 'statistics', component: StatisticsComponent },
      {
        // TODO: Remove applicants to be submodule of the 'MembersModule'
        path: 'applicants',
        component: ApplicantsComponent,
        children: [
          { path: '', component: ApplicantListComponent },
          { path: 'new-user', component: ApplicantUserFormComponent },
          { path: ':id', component: ApplicantProfileComponent }
        ]
      }
    ]
  },
  { path: 'auth', component: AuthComponent, children: authRoutes },
  { path: 'project', component: ProjectComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
