import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { ActivitiesModule } from './activities/activities.module';
import { GroupsModule } from './groups/groups.module';
import { MembersModule } from './members/members.module';
import { NavigationModule } from './navigation/navigation.module';
import { SharedModule } from '../shared/shared.module';
import { CommonComponentsModule } from './common/common-components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { ProjectComponent } from './project/project.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { CdkDetailRowDirective } from './users/cdk-detail-row.directive';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { ApplicantListComponent } from './applicants/applicant-list/applicant-list.component';
import { ApplicantUserFormComponent } from './applicants/applicant-user-form/applicant-user-form.component';
import { ApplicantProfileComponent } from './applicants/applicant-profile/applicant-profile.component';
import { UserListComponent } from './users/user-list/user-list.component';

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
    NavigationModule,
    SharedModule,
    CommonComponentsModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class ComponentsModule {}
