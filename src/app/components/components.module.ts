import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ActivitiesModule } from './activities/activities.module';
import { AdminComponent } from './admin/admin.component';
import { ApplicantListComponent } from './applicants/applicant-list/applicant-list.component';
import { ApplicantProfileComponent } from './applicants/applicant-profile/applicant-profile.component';
import { ApplicantUserFormComponent } from './applicants/applicant-user-form/applicant-user-form.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { AuthModule } from './auth/auth.module';
import { CommonComponentsModule } from './common/common-components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupsModule } from './groups/groups.module';
import { MembersModule } from './members/members.module';
import { NavigationsModule } from './navigations/navigations.module';
import { ProjectComponent } from './project/project.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CdkDetailRowDirective } from './users/cdk-detail-row.directive';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    UsersComponent,
    StatisticsComponent,
    UserItemComponent,
    ProjectComponent,
    UserAddComponent,
    CdkDetailRowDirective,
    UserFormComponent,
    UserProfileComponent,
    ApplicantsComponent,
    ApplicantListComponent,
    ApplicantUserFormComponent,
    ApplicantProfileComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    ActivitiesModule,
    GroupsModule,
    MembersModule,
    NavigationsModule,
    SharedModule,
    CommonComponentsModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class ComponentsModule {}
