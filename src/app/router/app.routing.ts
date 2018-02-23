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

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'statistics', component: StatisticsComponent }
    ]
  },
  { path: 'auth', component: AuthComponent, children: authRoutes },
  { path: 'project', component: ProjectComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
