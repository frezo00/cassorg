import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { NavigationModule } from './navigation/navigation.module';
import { SharedModule } from '../shared/shared.module';

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
    EmptyStateComponent
  ],
  imports: [CommonModule, AuthModule, NavigationModule, SharedModule],
  exports: [],
  providers: []
})
export class ComponentsModule {}
