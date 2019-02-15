import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { NavigationModule } from './navigation/navigation.module';
import { SharedModule } from '../shared/shared.module';
import { CommonComponentsModule } from './common/common-components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GroupsComponent } from './groups/groups.component';
import { ActivitiesComponent } from './activities/activities.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { ProjectComponent } from './project/project.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { CdkDetailRowDirective } from './users/cdk-detail-row.directive';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AlertBarComponent } from './alert-bar/alert-bar.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { GroupFormComponent } from './groups/group-form/group-form.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { ApplicantListComponent } from './applicants/applicant-list/applicant-list.component';
import { ApplicantUserFormComponent } from './applicants/applicant-user-form/applicant-user-form.component';
import { ApplicantProfileComponent } from './applicants/applicant-profile/applicant-profile.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { MembersComponent } from './members/members.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberProfileComponent } from './members/member-profile/member-profile.component';
import { MemberFormComponent } from './members/member-form/member-form.component';
import { MemberNewComponent } from './members/member-new/member-new.component';
import { GroupNewComponent } from './groups/group-new/group-new.component';
import { MemberInfoComponent } from './members/member-profile/member-info/member-info.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberImageComponent } from './members/member-form/member-image/member-image.component';
import { GroupDetailsComponent } from './groups/group-details/group-details.component';
import { GroupEditComponent } from './groups/group-edit/group-edit.component';
import { MemberGroupsComponent } from './members/member-profile/member-groups/member-groups.component';
import { ModalComponent } from './common/modal/modal.component';
import { ActivityListComponent } from './activities/activity-list/activity-list.component';
import { ActivityNewComponent } from './activities/activity-new/activity-new.component';
import { ActivityFormComponent } from './activities/activity-form/activity-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PageNotFoundComponent,
    GroupsComponent,
    ActivitiesComponent,
    AdminComponent,
    UsersComponent,
    StatisticsComponent,
    UserItemComponent,
    ProjectComponent,
    EmptyStateComponent,
    UserAddComponent,
    CdkDetailRowDirective,
    UserFormComponent,
    UserProfileComponent,
    AlertBarComponent,
    ApplicantsComponent,
    GroupFormComponent,
    GroupListComponent,
    ApplicantListComponent,
    ApplicantUserFormComponent,
    ApplicantProfileComponent,
    UserListComponent,
    MembersComponent,
    MemberListComponent,
    MemberProfileComponent,
    MemberFormComponent,
    MemberNewComponent,
    GroupNewComponent,
    MemberInfoComponent,
    MemberEditComponent,
    MemberImageComponent,
    GroupDetailsComponent,
    GroupEditComponent,
    MemberGroupsComponent,
    ActivityListComponent,
    ActivityNewComponent,
    ActivityFormComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    NavigationModule,
    SharedModule,
    CommonComponentsModule
  ],
  exports: [],
  providers: [],
  entryComponents: [ModalComponent]
})
export class ComponentsModule {}
