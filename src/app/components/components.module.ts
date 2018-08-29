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
import { ApplicantsComponent } from './users/applicants/applicants.component';

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
    ApplicantsComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    NavigationModule,
    SharedModule,
    CommonComponentsModule
  ],
  exports: [],
  providers: []
})
export class ComponentsModule {}
