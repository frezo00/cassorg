import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TopNavbarComponent } from './navigation/top-navbar/top-navbar.component';
import { SideMenuComponent } from './navigation/side-menu/side-menu.component';
import { GroupsComponent } from './groups/groups.component';
import { ActivitiesComponent } from './activities/activities.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PageNotFoundComponent,
    TopNavbarComponent,
    SideMenuComponent,
    GroupsComponent,
    ActivitiesComponent
  ],
  imports: [CommonModule, AuthModule, SharedModule],
  exports: [AuthModule],
  providers: []
})
export class ComponentsModule {}
